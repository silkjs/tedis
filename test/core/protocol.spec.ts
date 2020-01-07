import { DESTRUCTION } from "dns";
import { Protocol, RedisProtocolError } from "../../src/core/protocol";

let protocol: Protocol;
let data: any;

interface Encode {
  title: string;
  input: Array<string | number>;
  output: string;
}

beforeEach(async () => {
  protocol = new Protocol();
});

describe("parse", () => {
  // Tests based on specification https://redis.io/topics/protocol
  describe("RESP Simple Strings", () => {
    /**
     * When Redis replies with a Simple String, a client library should return
     * to the caller a string composed of the first character after the '+' up
     * to the end of the string, excluding the final CRLF bytes.
     */
    it(`+OK`, () => {
      protocol.write(Buffer.from(`+OK\r\n`));
      data = protocol.parse();
      expect(data).toEqual(["OK"]);
    });
    it(`+Another Simple String`, () => {
      protocol.write(Buffer.from(`+Another Simple String\r\n`));
      data = protocol.parse();
      expect(data).toEqual(["Another Simple String"]);
    });
  });

  describe("RESP Errors", () => {
    /**
     * ... errors are treated by clients as exceptions, and the string that
     * composes the Error type is the error message itself.
     *
     * The first word after the "-", up to the first space or newline,
     * represents the kind of error returned.
     */
    it(`-Error message`, () => {
      protocol.write(Buffer.from(`-Error message\r\n`));
      data = protocol.parse();
      expect(data).toEqual([new RedisProtocolError("Error", "message")]);
    });
    it(`-ERR unknown command 'foobar'`, () => {
      protocol.write(Buffer.from(`-ERR unknown command 'foobar'\r\n`));
      data = protocol.parse();
      expect(data).toEqual([new RedisProtocolError("ERR", "unknown command 'foobar'")]);
    });
    it(`-WRONGTYPE Operation against a key holding the wrong kind of value`, () => {
      protocol.write(Buffer.from(`-WRONGTYPE Operation against a key holding the wrong kind of value\r\n`));
      data = protocol.parse();
      expect(data).toEqual([new RedisProtocolError("WRONGTYPE", "Operation against a key holding the wrong kind of value")]);
    });
  });

  describe("RESP Integers", () => {
    /**
     * This type is just a CRLF terminated string representing an integer,
     * prefixed by a ":" byte. For example ":0\r\n", or ":1000\r\n" are integer
     * replies.
     *
     * ... the returned integer is guaranteed to be in the range of a signed 64
     * bit integer.
     */
    it(`:0`, () => {
      protocol.write(Buffer.from(`:0\r\n`));
      data = protocol.parse();
      expect(data).toEqual([0]);
    });
    it(`:1000`, () => {
      protocol.write(Buffer.from(`:1000\r\n`));
      data = protocol.parse();
      expect(data).toEqual([1000]);
    });
    it(`:-1`, () => {
      protocol.write(Buffer.from(`:-1\r\n`));
      data = protocol.parse();
      expect(data).toEqual([-1]);
    });
    it(`:-2147483648`, () => {
      protocol.write(Buffer.from(`:-2147483648\r\n`));
      data = protocol.parse();
      expect(data).toEqual([-2147483648]);
    });
    it(`:2147483647`, () => {
      protocol.write(Buffer.from(`:2147483647\r\n`));
      data = protocol.parse();
      expect(data).toEqual([2147483647]);
    });
  });

  describe("RESP Bulk Strings", () => {
    /**
     * Bulk Strings are encoded in the following way:
     *  - A "$" byte followed by the number of bytes composing the string
     *    (a prefixed length), terminated by CRLF.
     *  - The actual string data.
     *  - A final CRLF.
     *
     * RESP Bulk Strings can also be used in order to signal non-existence of a
     * value using a special format that is used to represent a Null value. In
     * this special format the length is -1, and there is no data ... This is
     * called a **Null Bulk String**. The client library API should not return
     * an empty string, but a nil object, when the server replies with a Null
     * Bulk String. For example a Ruby library should return 'nil' while a C
     * library should return NULL (or set a special flag in the reply object),
     * and so forth.
     */
    it(`$6 foobar`, () => {
      protocol.write(Buffer.from(`$6\r\nfoobar\r\n`));
      data = protocol.parse();
      expect(data).toEqual(["foobar"]);
    });
    it(`$0`, () => {
      protocol.write(Buffer.from(`$0\r\n\r\n`));
      data = protocol.parse();
      expect(data).toEqual([""]);
    });
    it(`$-1`, () => {
      protocol.write(Buffer.from(`$-1\r\n`));
      data = protocol.parse();
      expect(data).toEqual([null]);
    });
    it(`$ array`, () => {
      protocol.write(Buffer.from(`$9\r\nhello world!\r\n`));
      data = protocol.parse();
      expect(data).toEqual(["hello wor"]);
    });
    it(`$ incomplete`, () => {
      protocol.write(Buffer.from(`$3\r\nhe`));
      data = protocol.parse();
      expect(data).toEqual([]);
    });
  });

  describe("RESP Arrays", () => {
    /**
     * RESP Arrays are sent using the following format:
     *  - A '*' character as the first byte, followed by the number of elements in the array as a decimal number,
     *    followed by CRLF.
     *  - An additional RESP type for every element of the Array.
     *
     * ... A client library API should return a null object and not an empty Array when Redis replies with a Null
     *     Array. This is necessary to distinguish between an empty list and a different condition (for instance the
     *     timeout condition of the BLPOP command).
     */
    it(`*0 [] Empty Array`, () => {
      protocol.write(
        Buffer.from(`*0\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([[]]);
    });
    it(`*2 [foo bar]`, () => {
      protocol.write(
        Buffer.from(`*2\r\n$3\r\nfoo\r\n$3\r\nbar\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([["foo", "bar"]]);
    });
    it(`*3 [1 2 3]`, () => {
      protocol.write(
        Buffer.from(`*3\r\n:1\r\n:2\r\n:3\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([[1, 2, 3]]);
    });
    it(`*5 [1 2 3 4 foobar]`, () => {
      protocol.write(
        Buffer.from(`*5\r\n:1\r\n:2\r\n:3\r\n:4\r\n$6\r\nfoobar\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([[1, 2, 3, 4, "foobar"]]);
    });
    it(`*-1 null`, () => {
      protocol.write(
        Buffer.from(`*-1\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([null]);
    });
    it(`*3 foo null bar`, () => {
      protocol.write(
        Buffer.from(`*3\r\n$3\r\nfoo\r\n$-1\r\n$3\r\nbar\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([["foo", null, "bar"]]);
    });
    it(`* array`, () => {
      protocol.write(
        Buffer.from(`*3\r\n$1\r\n1\r\n$5\r\nhello\r\n$5\r\ntedis\r\n`)
      );
      data = protocol.parse();
      expect(data).toEqual([["1", "hello", "tedis"]]);
    });
    it(`* incomplete`, () => {
      protocol.write(Buffer.from(`*3\r\n$1\r\nhello`));
      data = protocol.parse();
      expect(data).toEqual([]);
    });
  });
  // it(`! type error`, () => {
  //   protocol.write(Buffer.from(`!3\r\nhello\r\n`));
  //   data = protocol.parse();
  //   expect(data).toEqual({
  //     state: false,
  //     res: {
  //       error: false,
  //       data: [
  //         new RedisProtocolError("UNRECOGNIZED RESP", "Failed to parse the line: '!3'."),
  //         new RedisProtocolError("UNRECOGNIZED RESP", "Failed to parse the line: 'hello'."),
  //       ],
  //     },
  //   });
  // });
});

describe("encode", () => {
  const mock: Encode[] = [
    {
      title: "set",
      input: ["SET", "string1", "124235"],
      output: `*3\r\n$3\r\nSET\r\n$7\r\nstring1\r\n$6\r\n124235\r\n`,
    },
    {
      title: "get",
      input: ["GET", "string1"],
      output: `*2\r\n$3\r\nGET\r\n$7\r\nstring1\r\n`,
    },
    {
      title: "del",
      input: ["DEL", "string1"],
      output: `*2\r\n$3\r\nDEL\r\n$7\r\nstring1\r\n`,
    },
  ];
  mock.forEach((item) => {
    it(item.title, () => {
      expect(protocol.encode(...item.input)).toBe(item.output);
    });
  });
  it(`error parameter`, () => {
    expect(() => {
      try {
        protocol.encode([1, 2, 3] as any);
      } catch (error) {
        throw new Error(error);
      }
    }).toThrow(Error);
  });
});
