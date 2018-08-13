import { Options } from "src/common/global";

export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export const config: Options = {
  port: 6379,
  host: "127.0.0.1",
};
