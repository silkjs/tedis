import { createConnection, Socket } from "net";
import { v4 as uuidv4 } from "uuid";
// core
import { Protocol } from "./protocol";

type callback = (err: boolean, res: any) => void;

export interface InterfaceBase {
  id: string;
  command(...parameters: Array<string | number>): Promise<any>;
  close(): void;
  on(event: "connect" | "timeout", listener: () => void): void;
  on(event: "error", listener: (err: Error) => void): void;
  on(event: "close", listener: (had_error: boolean) => void): void;
  on(event: string, listener: (...args: any[]) => void): void;
}

export class Base implements InterfaceBase {
  public id: string;
  private socket: Socket;
  private protocol: Protocol;
  private callbacks: callback[];
  private handle_connect: () => void;
  private handle_timeout: () => void;
  private handle_error: (err: Error) => void;
  private handle_close: (had_error: boolean) => void;
  constructor(
    options: { host?: string; port?: number; password?: string } = {}
  ) {
    this.id = uuidv4();
    this.socket = createConnection({
      host: options.host || "127.0.0.1",
      port: options.port || 6379,
    });
    this.protocol = new Protocol();
    this.callbacks = [];
    this.handle_connect = () => {
      console.log("connect");
    };
    this.handle_timeout = () => {
      console.log("timeout");
    };
    this.handle_error = (err: Error) => {
      console.log(err);
    };
    this.handle_close = (had_error: boolean) => {
      console.log("close with error: ", had_error);
    };
    this.init();

    if ("string" === typeof options.password) {
      this.auth(options.password);
    }
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
  public on(event: "connect" | "timeout", listener: () => void): void;
  public on(event: "close", listener: (had_error: boolean) => void): void;
  public on(event: "error", listener: (err: Error) => void): void;
  public on(event: string, listener: (...args: any[]) => void): void {
    switch (event) {
      case "connect":
        this.handle_connect = listener;
        break;
      case "timeout":
        this.handle_timeout = listener;
        break;
      case "error":
        this.handle_error = listener;
        break;
      case "close":
        this.handle_close = listener;
        break;
      default:
        throw new Error("event not found");
    }
  }
  private auth(password: string) {
    return this.command("AUTH", password);
  }
  private init() {
    this.socket.on("connect", () => {
      this.handle_connect();
    });
    this.socket.on("timeout", () => {
      this.handle_timeout();
    });
    this.socket.on("error", (err) => {
      this.handle_error(err);
    });
    this.socket.on("close", (had_error: boolean) => {
      this.handle_close(had_error);
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
