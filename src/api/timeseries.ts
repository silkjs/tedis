import { Base } from "../core/base";
import { Array2Object } from "../util/tools";

enum MethodTimeseries {
  tscreate = "TS.CREATE",
  tsinfo = "TS.INFO",
}

export interface InterfaceTimeseries {
  tscreate(
    key: string,
    options?: {
      retention?: number,
      labels?: { [propName: string]: string | number; }
    }): Promise<number>;
  tsinfo(key: string): Promise<any>;
}

export class RedisTimeseries extends Base implements InterfaceTimeseries {
  public tscreate(key: string, options?: {retention?: number, labels?: {[propName: string]: string | number; }}) {
    if (options !== undefined) {
      const collected = collectOptions(options);
      return this.command(MethodTimeseries.tscreate, key, ...collected);
    } else {
      return this.command(MethodTimeseries.tscreate, key);
    }
  }
  public tsinfo(key: string) {
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

function collectOptions(options: {retention?: number, labels?: {[propName: string]: string | number; }}) {
  const collected = new Array();
  if (options.retention !== undefined) {
    collected.push("RETENTION", options.retention);
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
