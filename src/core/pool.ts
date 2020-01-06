import { Tedis } from "./tedis";

export interface InterfacePool {
  getTedis(): Promise<Tedis>;
  putTedis(conn: Tedis): void;
  release(): void;
}

type Cushion = (conn: Tedis) => void;

export class TedisPool implements InterfacePool {
  private connection_pool: Tedis[];
  private cushion_list: Cushion[];
  private min_conn: number;
  private max_conn: number;
  private act_conn: number;
  private host: string;
  private port: number;
  private password?: string;
  private timeout?: number;
  private tls?: {
    key: Buffer;
    cert: Buffer;
  };
  constructor(
    options: {
      host?: string;
      port?: number;
      password?: string;
      min_conn?: number;
      max_conn?: number;
      timeout?: number;
      tls?: {
        key: Buffer;
        cert: Buffer;
      };
    } = {}
  ) {
    this.connection_pool = [];
    this.cushion_list = [];
    this.min_conn = options.min_conn || 1;
    this.max_conn = options.max_conn || 10;
    this.act_conn = 0;
    this.host = options.host || "127.0.0.1";
    this.port = options.port || 6379;
    this.password = options.password;
    this.timeout = options.timeout;
    this.tls = options.tls;
  }
  public release() {
    this.connection_pool.forEach((conn) => {
      conn.close();
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
        const timer = setTimeout(() => {
          this.cushion_list.shift();
          reject("timeout, the connection pool is full");
        }, 1000 * 20);

        this.cushion_list.push((res: Tedis) => {
          clearTimeout(timer);
          this.cushion_list.shift();
          resolve(res);
        });
      });
    }
  }
  public putTedis(conn: Tedis) {
    const callback = this.cushion_list.shift();
    if ("undefined" !== typeof callback) {
      callback(conn);
    } else {
      this.connection_pool.push(conn);
    }
  }
  private newConnection() {
    return new Promise<Tedis>((resolve, reject) => {
      this.act_conn++;
      const conn = new Tedis({
        host: this.host,
        port: this.port,
        password: this.password,
        timeout: this.timeout,
        tls: this.tls,
      });
      conn.on("connect", () => {
        conn.on("error", (err) => {
          console.log(err);
        });
        conn.on("close", (had_error: boolean) => {
          this.closeConnection(conn);
        });
        conn.on("timeout", () => {
          this.miniConnection(conn);
        });
        resolve(conn);
      });
      conn.on("error", (err) => {
        this.act_conn--;
        reject(err);
      });
    });
  }
  private closeConnection(conn: Tedis) {
    const index = this.connection_pool.findIndex((item) => {
      return item.id === conn.id;
    });
    if (-1 !== index) {
      this.connection_pool.splice(index, 1);
    }
    this.act_conn--;
  }
  private miniConnection(conn: Tedis) {
    if (this.min_conn < this.act_conn) {
      conn.close();
    }
  }
}
