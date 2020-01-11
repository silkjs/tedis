import { Base } from "../core/base";
import { Array2Object } from "../util/tools";

enum MethodTimeseries {
  tscreate = "TS.CREATE",
  tsalter = "TS.ALTER",
  tsadd = "TS.ADD",
  tsmadd = "TS.MADD",
  tsinfo = "TS.INFO",
}

export interface InterfaceTimeseries {
  tscreate(
    key: string,
    options?: {
      retention?: number,
      uncompressed?: boolean,
      labels?: { [propName: string]: string | number; }
    }): Promise<number>;
  tsalter(
    key: string,
    options?: {
      retention?: number,
      labels?: { [propName: string]: string | number; }
    }): Promise<number>;
  tsadd(
    key: string,
    timestamp: number | "*" | undefined,
    value: number | string,
    options?: {
      retention?: number,
      uncompressed?: boolean,
      labels?: {[propName: string]: string | number; }
    }): Promise<number>;
  tsmadd(
    data: Array<{
      key: string,
      timestamp?: number | "*" | undefined,
      value: number | string
    }>): Promise<number[]>;
  tsinfo(key: string): Promise<any>;
}

export class RedisTimeseries extends Base implements InterfaceTimeseries {
  public tscreate(
    key: string,
    options?: {
      retention?: number,
      uncompressed?: boolean,
      labels?: {[propName: string]: string | number; }
    }) {
    if (options !== undefined) {
      const collected = collectOptions(options);
      return this.command(MethodTimeseries.tscreate, key, ...collected);
    } else {
      return this.command(MethodTimeseries.tscreate, key);
    }
  }
  public tsalter(
    key: string,
    options?: {
      retention?: number,
      labels?: {[propName: string]: string | number; }
    }) {
    if (options !== undefined) {
      const collected = collectOptions(options);
      return this.command(MethodTimeseries.tsalter, key, ...collected);
    } else {
      return this.command(MethodTimeseries.tsalter, key);
    }
  }
  public tsadd(
    key: string,
    timestamp: number | "*" | undefined,
    value: number | string,
    options?: {
      retention?: number,
      uncompressed?: boolean,
      labels?: {[propName: string]: string | number; }
    }) {
    if (timestamp === undefined) {
      timestamp = "*";
    }
    if (options !== undefined) {
      const collected = collectOptions(options);
      return this.command(MethodTimeseries.tsadd, key, timestamp, value, ...collected);
    } else {
      return this.command(MethodTimeseries.tsadd, key, timestamp, value);
    }
  }
  public tsmadd(
    data: Array<{
      key: string,
      timestamp?: number | "*" | undefined,
      value: number | string
    }>) {
    const collected = new Array();
    data.forEach((item) => {
      collected.push(item.key);
      if (item.timestamp === undefined) {
        collected.push("*");
      } else {
        collected.push(item.timestamp);
      }
      collected.push(item.value);
    });
    return this.command(MethodTimeseries.tsmadd, ...collected);
  }
  public async tsinfo(key: string) {
    return this.command(MethodTimeseries.tsinfo, key).then((array) => {
      const response = Array2Object(array);
      if (response.labels !== undefined) {
        // first flatten labels
        // [[key, value], [key, value]] to [key value key value]
        let temp: any[] = new Array();
        response.labels.forEach((label: any[]) => {
          temp = temp.concat(label);
        });
        response.labels = Array2Object(temp);
      }
      return response;
    });
  }
}

function collectOptions(
  options: {
    retention?: number,
    uncompressed?: boolean,
    labels?: {[propName: string]: string | number; }
  }) {
  const collected = new Array();
  if (options.retention !== undefined) {
    collected.push("RETENTION", options.retention);
  }

  if (options.uncompressed !== undefined && options.uncompressed) {
    collected.push("UNCOMPRESSED");
  }

  if (options.labels !== undefined) {
    const labels = options.labels;
    collected.push("LABELS");
    (Reflect.ownKeys(options.labels) as string[]).forEach((field) => {
      collected.push(field, labels[field]);
    });
  }

  return collected;
}
