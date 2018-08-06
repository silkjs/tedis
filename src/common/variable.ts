export interface Options {
  host: string;
  port: number;
}

export interface ProtocolParse {
  state: boolean;
  res: {
    error: boolean;
    data: any;
  };
}

export type Parameters = Array<string | number>;
