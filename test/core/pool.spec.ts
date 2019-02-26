import { TedisPool } from "../../src/main";
import { sleep } from "../../tools";

describe("core base", () => {
  it(`on error`, async () => {
    try {
      const Pool = new TedisPool({
        password: "tedis_love_you",
        port: 6377,
        timeout: 1000,
      });
      await Pool.getTedis();
    } catch (error) {
      console.log(error);
    }
  });
  it(`on error`, async () => {
    try {
      const Pool = new TedisPool({
        password: "tedis_love_you_",
        timeout: 1000,
      });
      await Pool.getTedis();
    } catch (error) {
      console.log(error);
    }
  });
  it(`miniConnection closeConnection`, async () => {
    const Pool = new TedisPool({
      password: "tedis_love_you",
      timeout: 1000,
    });
    const t1 = await Pool.getTedis();
    const t2 = await Pool.getTedis();
    const t3 = await Pool.getTedis();
    const t4 = await Pool.getTedis();
    const t5 = await Pool.getTedis();
    Pool.putTedis(t5);
    const t6 = await Pool.getTedis();
    Pool.putTedis(t6);
    await sleep(2);
    Pool.release();
  });
});
