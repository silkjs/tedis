import { Base } from "../core/base";
import { Array2Object } from "../util/tools";

enum MethodTimeseries {
  tscreate = "TS.CREATE",
}

export interface InterfaceTimeseries {
  tscreate(
    key: string,
    options: {
      retention?: number,
      labels?: { [propName: string]: string | number; }
    }): Promise<number>;
}

export class RedisTimeseries extends Base implements InterfaceTimeseries {
  public tscreate(key: string, options: {retention?: number, labels?: {[propName: string]: string | number; }}) {
    if (options !== undefined) {
      const collected = collectOptions(options);
      return this.command(MethodTimeseries.tscreate, key, ...collected);
    } else {
      return this.command(MethodTimeseries.tscreate, key);
    }
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
