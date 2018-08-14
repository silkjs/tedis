import { createConnection } from "net";
import { Connection } from "./connection";

export interface InterfacePool {
  command(...parameters: Array<string | number>): Promise<any>;
  release(): void;
}

export class Pool implements InterfacePool {
  private connection_pool: Connection[];
  private min_conn: number;
  private max_conn: number;
  private act_conn: number;
  private host: string;
  private port: number;
  private passworld: string | null;
  constructor(options: {
    min_conn?: number;
    max_conn?: number;
    host?: string;
    port?: number;
    passworld?: string;
  }) {
    this.connection_pool = [];
    this.min_conn = options.min_conn || 1;
    this.max_conn = options.max_conn || 10;
    this.act_conn = 0;
    this.host = options.host || "127.0.0.1";
    this.port = options.port || 6379;
    this.passworld = options.passworld || null;
    this.init();
  }
  public async command(...parameters: Array<string | number>) {
    const conn = await this.getConnection();
    const timer = setTimeout(() => {
      this.closeConnection(conn);
      return Promise.reject("timeout");
    }, 1000 * 20);

    const res = await conn.exec(...parameters);
    clearTimeout(timer);
    this.putConnection(conn);
    return res;
  }
  public release() {
    this.connection_pool.forEach((conn) => {
      this.closeConnection(conn);
    });
  }
  private async getConnection() {
    const conn = this.connection_pool.shift();
    if ("undefined" !== typeof conn) {
      return conn;
    } else if (this.act_conn < this.max_conn) {
      return await this.newConnection();
    } else {
      throw new Error("meiy");
    }
  }
  private putConnection(conn: Connection) {
    this.connection_pool.push(conn);
  }
  private newConnection() {
    return new Promise<Connection>((resolve, reject) => {
      if (this.connection_pool.length >= this.max_conn) {
        reject("The connection pool is full");
      }
      const conn = new Connection(
        createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            conn.error = (err) => {
              console.log(err);
            };
            this.act_conn++;
            resolve(conn);
          }
        ),
        (err): void => {
          reject(err);
        },
        this.passworld
      );
    });
  }
  private closeConnection(conn: Connection) {
    conn.end();
    this.act_conn--;
  }
  private async init() {
    this.putConnection(await this.newConnection());
  }
}
