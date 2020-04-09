import { Base } from "./base";

const respStart = "(?<=\\r\\n|^)";
const respEnd = "(?=\\r\\n)";

interface InterfaceParser {
  matches: RegExpMatchArray[];
  blobs: Map<string, string>;
}

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
  public static parse(raw: string): InterfaceParser {
    let masterRegex = [
      "\\+(?<simple>.+?)",
      "\\-(?<error>.+?)",
      "\\:(?<int>-?\\d+)",
      "(?<blobString>\\$blobRef_\\d+)", // Note: this matches our replaced Blob-Ref
      "\\*(?<array_n>\\d+)(?<array>)",
      "(\\$|\\*)(?<null_string>-1)",
    ].join("|");

    // Preprocess blobs since they can include <CR><LF>
    const blobs = ProtocolParser.extractBlobs(raw, "$");

    masterRegex = `${respStart}(?:${masterRegex})${respEnd}`;
    const matches = Array.from(blobs.buffer.matchAll(new RegExp(masterRegex, "g")));
    return {
      matches,
      blobs: blobs.output,
    };
  }
  public static collect(parsed: InterfaceParser): any[] {
    const output = new Array();
    do {
      ProtocolParser.aggregateMessages(parsed, output);
    } while (parsed.matches.length > 0);

    return output;
  }
  private static extractBlobs(
    raw: string,
    blobByte: string,
    blobs: Map<string, string>= new Map()
  ): {output: Map<string, string>, buffer: string} {
    let buffer = raw;
    let refInx = 0;
    // This expression matches all `\r\n$N\r\n` where `N` is digit(s) to find all blob specifications
    const blobSizeRegex = `${respStart}\\${blobByte}(?<byteCount>\\d+)${respEnd}`;
    const blobMatches = Array.from(buffer.matchAll(new RegExp(blobSizeRegex, "g")));
    for (const blob of blobMatches) {
      if (blob.groups !== undefined) {
        // this expression looks for something like `$N\r\n1..N\r\n` (where N = byteCount characters to match)
        const fullBlobRegex = `${respStart}\\${blobByte}(?<byteCount>${blob.groups.byteCount})\\r\\n` +
                              `(?<blob>.{${blob.groups.byteCount}})${respEnd}`;
        const blobMatch = buffer.match(new RegExp(fullBlobRegex, "s"));
        if (blobMatch !== null && blobMatch.groups !== undefined) {
          const key = `${blobByte}blobRef_${refInx}`;
          refInx++;
          blobs.set(key, blobMatch.groups.blob);
          buffer = buffer.replace(new RegExp(fullBlobRegex, "s"), key);
        }
      }
    }
    return {
      output: blobs,
      buffer,
    };
  }
  private static aggregateMessages(parsed: InterfaceParser, output: any[]) {
    const current = parsed.matches.shift();
    if (current !== undefined && current.groups !== undefined) {
      if ("array_n" in current.groups && current.groups.array_n !== undefined) {
        const array_n = parseInt(current.groups.array_n, 10);
        const arrayResp = new Array();
        for (let inx = 0; inx < array_n; inx++) {
          ProtocolParser.aggregateMessages(parsed, arrayResp);
        }

        if (arrayResp.length === array_n) {
          output.push(arrayResp);
        }
      } else if ("blobString" in current.groups && current.groups.blobString !== undefined) {
        output.push(parsed.blobs.get(current.groups.blobString));
      } else if ("null_string" in current.groups && current.groups.null_string !== undefined) {
        output.push(null);
      } else if ("error" in current.groups && current.groups.error !== undefined) {
        output.push(RedisProtocolError.fromMessage(current[0]));
      } else if ("int" in current.groups && current.groups.int !== undefined) {
        output.push(parseInt(current.groups.int, 10));
      } else if ("simple" in current.groups && current.groups.simple !== undefined) {
        output.push(current.groups.simple);
      }
    }
  }
}
