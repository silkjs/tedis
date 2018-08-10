export interface Options {
  host: string;
  port: number;
  debug: boolean;
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
