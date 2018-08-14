import { Tedis } from "../../src/main";
import { config, sleep } from "../../tools/index";

const Key: Tedis = new Tedis(config);

beforeAll(async () => {
  await sleep(2);
});

beforeEach(async () => {
  await Key.command("SELECT", 0);
  await Key.command("FLUSHDB");
});

afterAll(async () => {
  await Key.command("FLUSHDB");
  Key.close();
});

describe("Redis Key Test: DEL", () => {
  it(`key1,key2 exists. del key1,key2,key3`, async () => {
    expect(await Key.command("SET", "key1", "Hello")).toBe("OK");
    expect(await Key.command("SET", "key2", "World")).toBe("OK");
    expect(await Key.del("key1", "key2", "key3")).toBe(2);
  });
});

describe("Redis Key Test: EXISTS", () => {
  it(`key exists`, async () => {
    expect(await Key.command("SET", "key1", "Hello")).toBe("OK");
    expect(await Key.exists("key1")).toBe(1);
    expect(await Key.command("SET", "key2", "World")).toBe("OK");
    expect(await Key.exists("key1", "key2", "nosuchkey")).toBe(2);
  });
  it(`key does not exist`, async () => {
    expect(await Key.exists("nosuchkey")).toBe(0);
  });
});

describe("Redis Key Test: EXPIRE", () => {
  it(`mykey expire 1`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.command("TTL", "mykey")).toBe(-1);
    expect(await Key.expire("mykey", 1)).toBe(1);
    expect(await Key.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key does not exist`, async () => {
    expect(await Key.expire("mykey", 1)).toBe(0);
  });
});

describe("Redis Key Test: EXPIREAT", () => {
  it(`mykey expireat (Date.now() / 1000).toFixed(0) + 1`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.command("TTL", "mykey")).toBe(-1);
    expect(
      await Key.expireat("mykey", +(Date.now() / 1000).toFixed(0) + 1)
    ).toBe(1);
    expect(await Key.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key does not exist`, async () => {
    expect(await Key.expireat("mykey", 1)).toBe(0);
  });
});

describe("Redis Key Test: KEYS", () => {
  it(`keys`, async () => {
    expect(await Key.command("SET", "firstname", "Jack")).toBe("OK");
    expect(await Key.command("SET", "lastname", "Stuntman")).toBe("OK");
    expect(await Key.command("SET", "age", 35)).toBe("OK");
    expect((await Key.keys("*name*")).sort()).toEqual(
      ["firstname", "lastname"].sort()
    );
    expect((await Key.keys("a??")).sort()).toEqual(["age"].sort());
    expect((await Key.keys("*")).sort()).toEqual(
      ["firstname", "lastname", "age"].sort()
    );
  });
});

describe("Redis Key Test: MOVE", () => {
  it(`move mymovekey from 7 to 0`, async () => {
    expect(await Key.command("SELECT", 7)).toBe("OK");
    expect(await Key.command("SET", "mymovekey", "secret base - Zone")).toBe(
      "OK"
    );
    expect(await Key.move("mymovekey", 0)).toBe(1);
  });
  it(`key was not moved`, async () => {
    expect(await Key.command("SELECT", 7)).toBe("OK");
    expect(await Key.move("mymovekey", 0)).toBe(0);
  });
});

describe("Redis Key Test: PERSIST", () => {
  it(`persist mykey`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.expire("mykey", 10)).toBe(1);
    expect(await Key.ttl("mykey")).not.toBe(-1);
    expect(await Key.persist("mykey")).toBe(1);
    expect(await Key.ttl("mykey")).toBe(-1);
  });
  it(`key does not exist`, async () => {
    expect(await Key.persist("mykey")).toBe(0);
  });
  it(`key does not have an associated timeout`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.persist("mykey")).toBe(0);
  });
});

describe("Redis Key Test: PEXPIRE", () => {
  it(`pexpire mykey 1000`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.command("TTL", "mykey")).toBe(-1);
    expect(await Key.pexpire("mykey", 1000)).toBe(1);
    expect(await Key.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key does not exist`, async () => {
    expect(await Key.pexpire("mykey", 1000)).toBe(0);
  });
});

describe("Redis Key Test: PEXPIREAT", () => {
  it(`pexpire pexpireat Date.now() + 1000`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.command("TTL", "mykey")).toBe(-1);
    expect(await Key.pexpireat("mykey", Date.now() + 1000)).toBe(1);
    expect(await Key.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key does not exist`, async () => {
    expect(await Key.pexpireat("mykey", Date.now() + 1000)).toBe(0);
  });
});

describe("Redis Key Test: PTTL", () => {
  it(`key exists`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.pttl("mykey")).toBe(-1);
    expect(await Key.expire("mykey", 1)).toBe(1);
    expect(await Key.pttl("mykey")).not.toBe(-1);
  });
  it(`key not exists`, async () => {
    expect(await Key.pttl("mykey")).toBe(-2);
  });
});

describe("Redis Key Test: RANDOMKEY", () => {
  it(`key exists`, async () => {
    const obj: {
      [propName: string]: string;
    } = {
      key1: "Hello",
      key2: "World",
    };
    const keys = Reflect.ownKeys(obj) as string[];
    keys.forEach(async (key) => {
      expect(await Key.command("SET", key, obj[key])).toBe("OK");
    });
    const res = await Key.randomkey();
    if (typeof res === "string") {
      expect(keys.includes(res)).toBeTruthy();
    } else {
      expect(false).toBeTruthy();
    }
  });
  it(`key not exists`, async () => {
    expect(await Key.randomkey()).toBeNull();
  });
});

describe("Redis Key Test: RENAME", () => {
  it(`key exists`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.rename("mykey", "key")).toBe("OK");
  });
  it(`key not exists`, async () => {
    await expect(
      (async () => {
        try {
          return Promise.reject(await Key.rename("mykey", "key"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis Key Test: RENAMENX", () => {
  it(`key exists, newKey not exists`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.renamenx("mykey", "key")).toBe(1);
  });
  it(`key exists, newKey exists`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.command("SET", "key", "Hello")).toBe("OK");
    expect(await Key.renamenx("mykey", "key")).toBe(0);
  });
  it(`key not exists`, async () => {
    await expect(
      (async () => {
        try {
          return Promise.reject(await Key.renamenx("mykey", "myotherkey"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis Key Test: TTL", () => {
  it(`key exists`, async () => {
    expect(await Key.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await Key.ttl("mykey")).toBe(-1);
    expect(await Key.expire("mykey", 1)).toBe(1);
    expect(await Key.ttl("mykey")).not.toBe(-1);
  });
  it(`key not exists`, async () => {
    expect(await Key.ttl("mykey")).toBe(-2);
  });
});

describe("Redis Key Test: TYPE", () => {
  it(`type string`, async () => {
    expect(await Key.command("SET", "mystring", "Hello")).toBe("OK");
    expect(await Key.type("mystring")).toBe("string");
  });
  it(`type hash`, async () => {
    expect(await Key.command("HSET", "myhash", "name", "tom")).toBe(1);
    expect(await Key.type("myhash")).toBe("hash");
  });
  it(`type list`, async () => {
    expect(await Key.command("LPUSH", "mylist", "tom")).toBe(1);
    expect(await Key.type("mylist")).toBe("list");
  });
  it(`type set`, async () => {
    expect(await Key.command("SADD", "myset", "Hello")).toBe(1);
    expect(await Key.type("myset")).toBe("set");
  });
  it(`type zset`, async () => {
    expect(await Key.command("ZADD", "myzset", 1, "tom")).toBe(1);
    expect(await Key.type("myzset")).toBe("zset");
  });
  it(`key not exists`, async () => {
    expect(await Key.type("mykey")).toBe("none");
  });
});
