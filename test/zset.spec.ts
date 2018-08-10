import { RedisZset } from "../src/data-types/zset";
import { config, sleep } from "../tools";

let Zset: RedisZset;

beforeAll(async () => {
  Zset = new RedisZset(config);
  await sleep(2);
});

beforeEach(async () => {
  await Zset.command("SELECT", 5);
  await Zset.command("FLUSHDB");
});

afterAll(() => {
  Zset.close();
});

describe("Redis List Test: SADD", () => {
  it(`key not exists`, async () => {
    expect(
      await Zset.zadd("myzset", {
        one: 1,
        uno: 1,
        two: 2,
        three: 3,
      })
    ).toBe(4);
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "myzset", 1, "one", 1, "uno")).toBe(2);
    expect(
      await Zset.zadd("myzset", {
        one: 1,
        uno: 1,
        two: 2,
        three: 3,
      })
    ).toBe(2);
  });
});
