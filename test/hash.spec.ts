import { RedisHash } from "../src/data-types/hash";
import { config, sleep } from "../tools";

let Hash: RedisHash;

beforeAll(async () => {
  Hash = new RedisHash(config);
  await sleep(2);
});

beforeEach(async () => {
  await Hash.command("SELECT", 2);
  await Hash.command("FLUSHDB");
});

afterAll(() => {
  Hash.close();
});

describe("Redis Hash Test: HDEL", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hdel("myhash", " field")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hdel("myhash", "field1")).toBe(1);
    expect(await Hash.hdel("myhash", "field2")).toBe(0);
  });
});
