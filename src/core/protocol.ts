import { Base } from "./base";

export class Protocol {
  private _buffer: string;
  constructor() {
    this._buffer = "";
  }
  public write(data: Buffer) {
    this._buffer += data.toString();
  }
  public parse() {
    const parsed = ProtocolParser.parse(this._buffer);
    this._buffer = "";
    return ProtocolParser.collect(parsed);
  }
  public encode(...parameters: Array<string | number>): string {
    const length = parameters.length;
    let parameter: any;

    let request = `*${length}\r\n`;
    for (let i = 0; i < length; i++) {
      parameter = parameters[i];
      if (typeof parameter === "string") {
        request += `$${Buffer.byteLength(parameter)}\r\n${parameter}\r\n`;
      } else if (typeof parameter === "number") {
        parameter = parameter.toString();
        request += `$${Buffer.byteLength(parameter)}\r\n${parameter}\r\n`;
      } else {
        throw new Error("encode ags err");
      }
    }
    return request;
  }
}

export class RedisProtocolError extends Error {

  public static fromMessage(message: string) {
    const space = message.indexOf(" ");
    return new RedisProtocolError(message.slice(0, space), message.slice(space + 1));
  }
  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}

class ProtocolParser {
  public static parse(raw: string): any[] {
    const masterRegex = [
      "(?<simple>(?<=(?:\\r\\n|^)\\+).+?(?=\\r\\n))",
      "(?<error>(?<=(?:\\r\\n|^)\\-).+?(?=\\r\\n))",
      "(?<int>(?<=(?:\\r\\n|^)\\:)-?\\d+(?=\\r\\n))",
      "(?<bulk>(?<=(?:\\r\\n|^)\\$(?<bulk_n>\\d+)\\r\\n).*?(?=\\r\\n))",
      "(?<null_string>(?<=(?:\\r\\n|^)(\\$|\\*)-1\\r\\n))",
      "(?<array>(?<=(?:\\r\\n|^)\\*(?<array_n>\\d+)\\r\\n))",
    ].join("|");
    return Array.from(raw.matchAll(new RegExp(masterRegex, "g")));
  }

  /**
   * Collect message arrays and bulk strings and convert messages to their correct types
   * @param parsed - array of parsed messages
   *
   * @return
   */
  public static collect(parsed: any[]): any[] {
    const output = new Array();
    do {
      ProtocolParser.aggregateMessages(parsed, output);
    } while (parsed.length > 0);

    return output;
  }

  /**
   * Iterate over parsed response array collecting messages in output
   * @param parsed - array of parsed messages
   * @param output
   */
  private static aggregateMessages(parsed: any[], output: any[]) {
    const current = parsed.shift();
    if (current !== undefined) {
      if ("array_n" in current.groups && current.groups.array_n !== undefined) {
        const array_n = parseInt(current.groups.array_n, 10);
        const arrayResp = new Array();
        for (let inx = 0; inx < array_n; inx++) {
          ProtocolParser.aggregateMessages(parsed, arrayResp);
        }

        if (arrayResp.length === array_n) {
          output.push(arrayResp);
        }
      } else if ("bulk" in current.groups && current.groups.bulk !== undefined) {
        const strLength = parseInt(current.groups.bulk_n, 10);
        const bulkString = Buffer.from(current.groups.bulk).slice(0, strLength);
        if (bulkString.length === strLength) {
          output.push(bulkString.toString());
        }
      } else if ("null_string" in current.groups && current.groups.null_string !== undefined) {
        output.push(null);
      } else if ("error" in current.groups && current.groups.error !== undefined) {
        output.push(RedisProtocolError.fromMessage(current[0]));
      } else if ("int" in current.groups && current.groups.int !== undefined) {
        output.push(parseInt(current[0], 10));
      } else {
        output.push(current[0]);
      }
    }
  }
}
