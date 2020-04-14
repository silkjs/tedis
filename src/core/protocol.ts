export class Protocol {
  public data: {
    state: boolean;
    res: {
      error: boolean;
      data: any;
    };
  };
  private _result: string[];
  private _end: string;
  constructor() {
    this._result = new Array();
    this._end = "";
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
      (this._result.length === 1 && this._end.length !== 0)
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
          const size = parseInt(current.slice(1), 10);
          this._result.shift();
          if (-1 === size) {
            this.data.res = {
              error: false,
              data: null,
            };
          } else {
            const res = this._result.shift() as string;
            let ls = Buffer.byteLength(res);
            if (ls === size) {
              this.data.res = {
                error: false,
                data: res,
              };
            } else {
              this.data.res = {
                error: false,
                data: [res],
              };
              do {
                const str = this._result.shift() as string;
                this.data.res.data.push(str);
                ls += Buffer.byteLength(str);
              } while (this._result.length > 0);
            }
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
              } else if (typeof this._result[i + 1] === "undefined") {
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
