import { Protocol } from "../../src/core/protocol";

let protocol: Protocol;

interface Encode {
  title: string;
  input: Array<string | number>;
  output: string;
}

beforeEach(async () => {
  protocol = new Protocol();
});

describe("parse", () => {
  it(`+OK`, () => {
    protocol.write(Buffer.from(`+OK\r\n`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: true,
      res: {
        error: false,
        data: "OK",
      },
    });
  });
  it(`-Error type`, () => {
    protocol.write(Buffer.from(`-Error type\r\n`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: true,
      res: {
        error: true,
        data: "Error type",
      },
    });
  });
  it(`:6`, () => {
    protocol.write(Buffer.from(`:6\r\n`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: true,
      res: {
        error: false,
        data: 6,
      },
    });
  });
  it(`* array`, () => {
    protocol.write(
      Buffer.from(`*3\r\n$1\r\n1\r\n$5\r\nhello\r\n$5\r\ntedis\r\n`)
    );
    protocol.parse();
    expect(protocol.data).toEqual({
      state: true,
      res: {
        error: false,
        data: ["1", "hello", "tedis"],
      },
    });
  });
  it(`* incomplete`, () => {
    protocol.write(Buffer.from(`*3\r\n$1\r\nhello`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: false,
      res: {
        error: false,
        data: [],
      },
    });
  });
  it(`$ incomplete`, () => {
    protocol.write(Buffer.from(`$3\r\nhello`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: false,
      res: {
        error: false,
        data: null,
      },
    });
  });
  it(`! type error`, () => {
    protocol.write(Buffer.from(`!3\r\nhello\r\n`));
    protocol.parse();
    expect(protocol.data).toEqual({
      state: false,
      res: {
        error: false,
        data: null,
      },
    });
  });
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
