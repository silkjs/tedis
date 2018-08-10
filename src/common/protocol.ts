import { Parameters, Poptions, ProtocolParse } from "./variable";

export class Protocol {
  public data: ProtocolParse;
  private _result: string[];
  private _end: string;
  private _options: Poptions;
  constructor(options: Poptions= {debug: false}) {
    this._result = new Array();
    this._end = "";
    this._options = options;
    this.data = {
      state: true,
      res: {
        error: false,
        data: null,
      },
    };
  }
  public write(data: Buffer) {
    const array: string[] = (this._end + data.toString()).split("\r\n");
    this._end = array.pop() as string;
    this._result = this._result.concat(array);
    if (this._options.debug) {
      console.log(this._result);
    }
  }
  public parse() {
    this.data = {
      state: true,
      res: {
        error: false,
        data: null,
      },
    };
    if (
      this._result.length < 1 ||
      (this._result.length < 2 && this._end.length !== 0)
    ) {
      this.data.state = false;
    } else {
      const current = this._result[0];
      switch (current.charAt(0)) {
        case "+":
          this.data.res = {
            error: false,
            data: current.slice(1),
          };
          this._result.shift();
          break;
        case "-":
          this.data.res = {
            error: true,
            data: current.slice(1),
          };
          this._result.shift();
          break;
        case ":":
          this.data.res = {
            error: false,
            data: +current.slice(1),
          };
          this._result.shift();
          break;
        case "$":
          if (-1 === parseInt(current.slice(1), 10)) {
            this.data.res = {
              error: false,
              data: null,
            };
            this._result.shift();
          } else if (
            this._result.length < 1 ||
            (1 === this._result.length && 0 === this._end.length)
          ) {
            this.data.state = false;
          } else {
            this._result.shift();
            this.data.res = {
              error: false,
              data: this._result.shift(),
            };
          }
          break;
        case "*":
          const len = parseInt(current.slice(1), 10);
          if (0 === len) {
            this.data.res = {
              error: false,
              data: [],
            };
            this._result.shift();
          } else {
            this.data.res.data = [];
            let i: number;
            for (
              i = 1;
              i < this._result.length && this.data.res.data.length < len;
              i++
            ) {
              if ("$-1" === this._result[i].slice(0, 3)) {
                this.data.res.data.push(null);
              } else if (":" === this._result[i].charAt(0)) {
                this.data.res.data.push(parseInt(this._result[i].slice(1), 10));
              } else if (typeof this._result[i + 1] === undefined) {
                this.data.state = false;
                break;
              } else {
                this.data.res.data.push(this._result[++i]);
              }
            }
            if (this.data.res.data.length === len) {
              this._result.splice(0, i);
            } else {
              this.data.state = false;
            }
          }
          break;
        default:
          this.data.state = false;
      }
    }
    if (this._options.debug) {
      console.log(this.data);
    }
  }
  public encode(...parameters: Parameters): string {
    const length = parameters.length;
    let parameter: any;
    let request = `*${length}\r\n`;
    for (let i = 0; i < length; i++) {
      parameter = parameters[i];
      if (typeof parameter === "string") {
        request += `$${parameter.length}\r\n${parameter}\r\n`;
      } else if (typeof parameter === "number") {
        parameter = parameter.toString();
        request += `$${parameter.length}\r\n${parameter}\r\n`;
      } else {
        throw new Error("encode ags err");
      }
    }
    if (this._options.debug) {
      console.log(request);
    }
    return request;
  }
}
