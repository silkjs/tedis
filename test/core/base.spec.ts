import { Tedis } from "../../src/main";
import { config } from "../../tools/index";

describe("core base", () => {
  it(`empty`, async () => {
    const Base: Tedis = new Tedis();
    Base.close();
  });
  it(`on event_not_found`, async () => {
    const Base: Tedis = new Tedis(config);
    await expect(
      new Promise((resolve, reject) => {
        try {
          Base.on("event_not_found", () => {
            reject("error");
          });
        } catch (error) {
          throw error;
        }
      })
    ).rejects.toThrow(Error);
    Base.close();
  });
  it(`on timeout error`, async () => {
    const Base: Tedis = new Tedis({
      port: 6377,
      timeout: 1,
    });
    await expect(
      new Promise((resolve, reject) => {
        Base.on("close", () => {
          setTimeout(() => {
            reject("test");
          }, 2000);
        });
      })
    ).rejects.toBe("test");
  });
});
