import { TedisPool } from "../../src/main";
import { config, sleep } from "../../tools";

describe("core base", () => {
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
