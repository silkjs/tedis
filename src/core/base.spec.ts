import { Base } from "./base";
import { config } from "../util/index";

describe("core base", () => {
  it(`empty`, async () => {
    const base: Base = new Base();
    base.close();
  });
  it(`on event_not_found`, async () => {
    const base: Base = new Base(config);
    await expect(
      new Promise((resolve, reject) => {
        try {
          base.on("event_not_found" as any, () => {
            reject("error");
          });
        } catch (error) {
          throw error;
        }
      }),
    ).rejects.toThrow(Error);
    base.close();
  });
  it(`on default -> error and timeout`, async () => {
    const base: Base = new Base({
      port: 6377,
      timeout: 1,
    });
    await expect(
      new Promise((resolve, reject) => {
        base.on("close", () => {
          reject("error");
        });
      }),
    ).rejects.toBe("error");
  });
  it(`on error with auth`, async () => {
    const base: Base = new Base({
      password: "6377",
    });
    await expect(
      new Promise((resolve, reject) => {
        base.on("error", err => {
          reject("error");
        });
      }),
    ).rejects.toBe("error");
    base.close();
  });
});
