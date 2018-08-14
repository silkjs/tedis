import { Tedis } from "../../src/main";
import { config, sleep } from "../../tools/index";

const Set: Tedis = new Tedis(config);

beforeAll(async () => {
  // await sleep(2);
});

beforeEach(async () => {
  await Set.command("SELECT", 4);
  await Set.command("FLUSHDB");
});

afterAll(async () => {
  await Set.command("FLUSHDB");
  Set.close();
});

describe("Redis List Test: SADD", () => {
  it(`key not exists`, async () => {
    expect(await Set.sadd("myset", "Hello")).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c")).toBe(3);
    expect(await Set.sadd("myset", "c", "d")).toBe(1);
    expect(await Set.sadd("myset", 1)).toBe(1);
    expect(await Set.sadd("myset", 1)).toBe(0);
  });
});

describe("Redis List Test: SCARD", () => {
  it(`key not exists`, async () => {
    expect(await Set.scard("myset")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c")).toBe(3);
    expect(await Set.scard("myset")).toBe(3);
  });
});

describe("Redis List Test: SDIFF", () => {
  it(`key not exists`, async () => {
    expect(await Set.sdiff("key1", "key2")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect((await Set.sdiff("key1", "key2")).sort()).toEqual(["b", "a"].sort());
  });
});

describe("Redis List Test: SDIFFSTORE", () => {
  it(`key not exists`, async () => {
    expect(await Set.sdiffstore("key", "key1", "key2")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect(await Set.sdiffstore("key", "key1", "key2")).toBe(2);
  });
});

describe("Redis List Test: SINTER", () => {
  it(`key not exists`, async () => {
    expect(await Set.sinter("key1", "key2")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect(await Set.sinter("key1", "key2")).toEqual(["c"]);
  });
});

describe("Redis List Test: SINTERSTORE", () => {
  it(`key not exists`, async () => {
    expect(await Set.sinterstore("key", "key1", "key2")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect(await Set.sinterstore("key", "key1", "key2")).toBe(1);
  });
});

describe("Redis List Test: SISMEMBER", () => {
  it(`key not exists`, async () => {
    expect(await Set.sismember("myset", "hello")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c")).toBe(3);
    expect(await Set.sismember("myset", "a")).toBe(1);
  });
});

describe("Redis List Test: SMEMBERS", () => {
  it(`key not exists`, async () => {
    expect(await Set.smembers("myset")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect((await Set.smembers("myset")).sort()).toEqual(["2018", "c", "b", "a"].sort());
  });
});

describe("Redis List Test: SMOVE", () => {
  it(`key not exists`, async () => {
    expect(await Set.smove("myset", "myotherset", "hello")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect(await Set.smove("myset", "myotherset", "a")).toBe(1);
  });
  it(`source error`, async () => {
    expect(await Set.command("SET", "myset", "a")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await Set.smove("myset", "myotherset", "a"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
  it(`destination error`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect(await Set.command("SET", "myotherset", "a")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await Set.smove("myset", "myotherset", "a"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: SPOP", () => {
  it(`key not exists`, async () => {
    expect(await Set.spop("myset")).toBeNull();
    expect(await Set.spop("myset", 2)).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect(["a", "b", "c", "2018"]).toContain(await Set.spop("myset"));
    expect(["a", "b", "c", "2018"]).toEqual(
      expect.arrayContaining(await Set.spop("myset", 2))
    );
  });
});

describe("Redis List Test: SRANDMEMBER", () => {
  it(`key not exists`, async () => {
    expect(await Set.srandmember("myset")).toBeNull();
    expect(await Set.srandmember("myset", 2)).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect(["a", "b", "c", "2018"]).toContain(await Set.spop("myset"));
    expect(["a", "b", "c", "2018"]).toEqual(
      expect.arrayContaining(await Set.spop("myset", 2))
    );
  });
});

describe("Redis List Test: SREM", () => {
  it(`key not exists`, async () => {
    expect(await Set.srem("myset", "hello")).toBe(0);
    expect(await Set.srem("myset", "hello", "world")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c", 2018)).toBe(4);
    expect(await Set.srem("myset", "a", "b", 2018)).toBe(3);
    expect(await Set.srem("myset", "c")).toBe(1);
  });
  it(`type error`, async () => {
    expect(await Set.command("SET", "myset", "a")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await Set.srem("myset", "hello"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: SUNION", () => {
  it(`key not exists`, async () => {
    expect(await Set.sunion("key1", "key2")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect((await Set.sunion("key1", "key2")).sort()).toEqual(["a", "b", "c", "d", "e"].sort());
  });
});

describe("Redis List Test: SUNIONSTORE", () => {
  it(`key not exists`, async () => {
    expect(await Set.sunionstore("key", "key1", "key2")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "key1", "a", "b", "c")).toBe(3);
    expect(await Set.command("SADD", "key2", "c", "d", "e")).toBe(3);
    expect(await Set.sunionstore("key", "key1", "key2")).toBe(5);
  });
});
