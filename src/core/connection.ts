import { Socket } from "net";
import { Protocol } from "./protocol";

type callback = (err: boolean, res: any) => void;

export class Connection {
  public error: (err: Error) => void;
  public timeout: () => void;
  private socket: Socket;
  private protocol: Protocol;
  private callbacks: callback[];
  constructor(
    socket: Socket,
    error: (err: Error) => void,
    password: string | null
  ) {
    this.socket = socket;
    this.error = error;
    this.timeout = () => {
      console.log("timeout");
    };
    this.protocol = new Protocol();
    this.callbacks = [];
    this.init();

    if ("string" === typeof password) {
      this.auth(password);
    }
  }
  public exec(...parameters: Array<string | number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.callbacks.push((err, res) => {
        err ? reject(res) : resolve(res);
      });
      this.socket.write(this.protocol.encode(...parameters));
    });
  }
  public end() {
    this.socket.end();
  }
  private auth(password: string) {
    return this.exec("AUTH", password);
  }
  private init() {
    this.socket.on("error", (err) => {
      this.error(err);
    });
    this.socket.on("data", (data) => {
      this.protocol.write(data);
      while (true) {
        this.protocol.parse();
        if (!this.protocol.data.state) {
          break;
        }
        (this.callbacks.shift() as callback)(
          this.protocol.data.res.error,
          this.protocol.data.res.data
        );
      }
    });
    this.socket.on("timeout", () => {
      this.timeout();
    });
  }
}
