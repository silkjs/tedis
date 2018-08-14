export interface Options {
  host: string;
  port: number;
  debug?: boolean;
}

export interface Poptions {
  debug: boolean;
}

export interface ProtocolParse {
  state: boolean;
  res: {
    error: boolean;
    data: any;
  };
}

export type Parameters = Array<string | number>;

export function Array2Object(array: any[]): { [propName: string]: string } {
  const obj: { [propName: string]: string } = {};
  for (let i = 0, len = array.length; i < len; i++) {
    obj[array[i]] = array[++i];
  }
  return obj;
}
