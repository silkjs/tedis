import { TedisPool } from "./pool";
import { sleep } from "../util/index";

describe("core base", () => {
  it(`on error`, async () => {
    try {
      const pool = new TedisPool({
        password: "tedis_love_you",
        port: 6377,
        timeout: 1000,
      });
      await pool.getTedis();
    } catch (error) {
      console.log(error);
    }
  });
  it(`on error`, async () => {
    try {
      const pool = new TedisPool({
        password: "tedis_love_you_",
        timeout: 1000,
      });
      await pool.getTedis();
    } catch (error) {
      console.log(error);
    }
  });
  it(`miniConnection closeConnection`, async () => {
    const pool = new TedisPool({
      password: "tedis_love_you",
      timeout: 1000,
    });
    const t1 = await pool.getTedis();
    const t2 = await pool.getTedis();
    const t3 = await pool.getTedis();
    const t4 = await pool.getTedis();
    const t5 = await pool.getTedis();
    pool.putTedis(t5);
    const t6 = await pool.getTedis();
    pool.putTedis(t6);
    await sleep(2);
    pool.release();
  });
});
