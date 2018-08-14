import { v4 as uuidv4 } from "uuid";
import { Tedis } from "./tedis";

export interface InterfacePool {
  release(): void;
  getTedis(): void;
  putTedis(conn: Tedis): void;
}

export class TedisPool implements InterfacePool {
  private connection_pool: Tedis[];
  private cushion_list: {
    index: string[];
    callback: {
      [propName: string]: (name: string, res: Tedis) => void;
    };
  };
  private min_conn: number;
  private max_conn: number;
  private act_conn: number;
  private host: string;
  private port: number;
  private password?: string;
  constructor(
    options: {
      min_conn?: number;
      max_conn?: number;
      host?: string;
      port?: number;
      password?: string;
    } = {}
  ) {
    this.connection_pool = [];
    this.cushion_list = {
      index: [],
      callback: {},
    };
    this.min_conn = options.min_conn || 1;
    this.max_conn = options.max_conn || 10;
    this.act_conn = 0;
    this.host = options.host || "127.0.0.1";
    this.port = options.port || 6379;
    this.password = options.password;
    this.init();
  }
  public release() {
    this.connection_pool.forEach((conn) => {
      this.closeConnection(conn);
    });
  }
  public async getTedis() {
    const conn = this.connection_pool.shift();
    if ("undefined" !== typeof conn) {
      return conn;
    } else if (this.act_conn < this.max_conn) {
      return await this.newConnection();
    } else {
      return new Promise<Tedis>((resolve, reject) => {
        const key = uuidv4();
        const timer = setTimeout(() => {
          const index = this.cushion_list.index.findIndex((value) => {
            return value === key;
          });
          this.cushion_list.index.splice(index, 1);
          Reflect.deleteProperty(this.cushion_list.callback, key);
          reject("timeout, the connection pool is full");
        }, 1000 * 20);

        if (Reflect.has(this.cushion_list.callback, key)) {
          clearTimeout(timer);
          reject("timeout, the connection pool is full");
        }

        this.cushion_list.index.push(key);
        this.cushion_list.callback[key] = (name: string, res: Tedis) => {
          clearTimeout(timer);
          console.log("通过缓冲");
          Reflect.deleteProperty(this.cushion_list.callback, name);
          resolve(res);
        };
      });
    }
  }
  public putTedis(conn: Tedis) {
    if (this.cushion_list.index.length > 0) {
      const name = this.cushion_list.index.shift() as string;
      this.cushion_list.callback[name](name, conn);
    } else {
      this.connection_pool.push(conn);
    }
  }
  private newConnection() {
    return new Promise<Tedis>((resolve, reject) => {
      if (this.connection_pool.length >= this.max_conn) {
        reject("The connection pool is full");
      }
      const conn = new Tedis({
        host: this.host,
        port: this.port,
        password: this.password,
      });
      conn.ready = () => {
        conn.error = (err) => {
          console.log(err);
        };
        this.act_conn++;
        resolve(conn);
      };
      conn.error = (err) => {
        reject(err);
      };
    });
  }
  private closeConnection(conn: Tedis) {
    conn.close();
    this.act_conn--;
  }
  private async init() {
    this.putTedis(await this.newConnection());
  }
}
