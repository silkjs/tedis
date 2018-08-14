import { createConnection, Socket } from "net";
// core
import { Protocol } from "./protocol";

type callback = (err: boolean, res: any) => void;

export interface InterfaceBase {
  ready: () => void;
  error: (error: Error) => void;
  timeout: () => void;
  command(...parameters: Array<string | number>): Promise<any>;
  close(): void;
}

export class Base implements InterfaceBase {
  private socket: Socket;
  private protocol: Protocol;
  private callbacks: callback[];
  constructor(
    options: { host?: string; port?: number; password?: string } = {}
  ) {
    this.socket = createConnection({
      host: options.host || "127.0.0.1",
      port: options.port || 6379,
    });
    this.protocol = new Protocol();
    this.callbacks = [];
    this.init();

    if ("string" === typeof options.password) {
      this.auth(options.password);
    }
  }
  public timeout: () => void = () => {
    console.log("timeout");
  }
  public error: (err: Error) => void = (err) => {
    console.log(err);
  }
  public ready: () => void = () => {
    // console.log("ready");
  }
  public command(...parameters: Array<string | number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.callbacks.push((err, res) => {
        err ? reject(res) : resolve(res);
      });
      this.socket.write(this.protocol.encode(...parameters));
    });
  }
  public close() {
    this.socket.end();
  }
  private auth(password: string) {
    return this.command("AUTH", password);
  }
  private init() {
    this.socket.once("connect", () => {
      this.ready();
    });
    this.socket.on("error", (err) => {
      this.error(err);
    });
    this.socket.on("timeout", () => {
      this.timeout();
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
  }
}
