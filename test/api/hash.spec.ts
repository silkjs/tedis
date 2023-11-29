import { Tedis, TedisPool } from "../../src/main";
import { config } from "../../tools/index";

const Pool = new TedisPool(config);
let Hash: Tedis;

beforeAll(async () => {
  Hash = await Pool.getTedis();
});

beforeEach(async () => {
  await Hash.command("SELECT", 2);
  await Hash.command("FLUSHDB");
});

afterAll(async () => {
  await Hash.command("FLUSHDB");
  Hash.close();
});

describe("Redis Hash Test: HDEL", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hdel("myhash", "field")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hdel("myhash", "field1")).toBe(1);
    expect(await Hash.hdel("myhash", "field2")).toBe(0);
  });
});

describe("Redis Hash Test: HEXISTS", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hexists("myhash", "field")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hexists("myhash", "field1")).toBe(1);
    expect(await Hash.hexists("myhash", "field2")).toBe(0);
  });
});

describe("Redis Hash Test: HGET", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hget("myhash", "field")).toBeNull();
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect(await Hash.hget("myhash", "field1")).toBe("foo");
    expect(await Hash.hget("myhash", "field2")).toBe("2");
  });
});

describe("Redis Hash Test: HGETALL", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hgetall("myhash")).toEqual({});
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect(await Hash.hgetall("myhash")).toEqual({
      field1: "foo",
      field2: "2",
    });
  });
});

describe("Redis Hash Test: HINCRBY", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hincrby("myhash", "field1", 1)).toEqual(1);
  });
  it(`hash value is not an integer`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    await expect(
      (async () => {
        try {
          return Promise.reject(await Hash.hincrby("myhash", "field1", 1));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
  it(`hash value is an integer`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", 2)).toBe(1);
    expect(await Hash.hincrby("myhash", "field1", 1)).toEqual(3);
  });
});

describe("Redis Hash Test: HINCRBYFLOAT", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hincrbyfloat("myhash", "field1", 1)).toEqual("1");
  });
  it(`hash value is not an integer`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    await expect(
      (async () => {
        try {
          return Promise.reject(
            await Hash.hincrbyfloat("myhash", "field1", 0.1)
          );
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
  it(`hash value is an integer`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", 10.5)).toBe(1);
    expect(await Hash.hincrbyfloat("myhash", "field1", 0.1)).toEqual("10.6");
  });
});

describe("Redis Hash Test: HKEYS", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hkeys("myhash")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect((await Hash.hkeys("myhash")).sort()).toEqual(
      ["field1", "field2"].sort()
    );
  });
});

describe("Redis Hash Test: HLEN", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hlen("myhash")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect(await Hash.hlen("myhash")).toBe(2);
  });
});

describe("Redis Hash Test: HMGET", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hmget("myhash", "field1")).toEqual([null]);
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect(await Hash.hmget("myhash", "field1", "field2", "field3")).toEqual([
      "foo",
      "2",
      null,
    ]);
  });
});

describe("Redis Hash Test: HMSET", () => {
  it(`key not exists`, async () => {
    expect(
      await Hash.hmset("myhash", {
        field1: "Hello",
        field2: "World",
        field3: 2018,
      })
    ).toBe("OK");
    expect(await Hash.hgetall("myhash")).toEqual({
      field1: "Hello",
      field2: "World",
      field3: "2018",
    });
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    const mock = {
      field1: "Hello",
      field2: "World",
      field3: 2018,
    };
    expect(
      await Hash.hmset("myhash", {
        field1: "Hello",
        field2: "World",
        field3: 2018,
      })
    ).toBe("OK");
    expect(await Hash.hgetall("myhash")).toEqual({
      field1: "Hello",
      field2: "World",
      field3: "2018",
    });
  });
});

describe("Redis Hash Test: HSET", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hset("myhash", "field1", "Hello")).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hset("myhash", "field1", "Hello")).toBe(0);
  });
});

describe("Redis Hash Test: HSETNX", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hsetnx("myhash", "field1", "Hello")).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hsetnx("myhash", "field1", "Hello")).toBe(0);
  });
});

describe("Redis Hash Test: HSTRLEN", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hstrlen("myhash", "field1")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Hash.command("HSET", "myhash", "field1", "foo")).toBe(1);
    expect(await Hash.hstrlen("myhash", "field1")).toBe(3);
  });
});

describe("Redis Hash Test: HVALS", () => {
  it(`key not exists`, async () => {
    expect(await Hash.hvals("myhash")).toEqual([]);
  });
  it(`key exists`, async () => {
    expect(
      await Hash.command("HSET", "myhash", "field1", "foo", "field2", 2)
    ).toBe(2);
    expect(await Hash.hvals("myhash")).toEqual(["foo", "2"]);
  });
});
