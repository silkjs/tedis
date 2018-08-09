import { Protocol } from "../src/common/protocol";

const protocol = new Protocol();

interface Encode {
  title: string;
  input: Array<string | number>;
  output: string;
}

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
    test(item.title, () => {
      expect(protocol.encode(...item.input)).toBe(item.output);
    });
  });
});
