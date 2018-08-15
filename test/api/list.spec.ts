import { Tedis, TedisPool } from "../../src/main";
import { config } from "../../tools/index";

const Pool = new TedisPool(config);
let List: Tedis;

beforeAll(async () => {
  List = await Pool.getTedis();
});

beforeEach(async () => {
  await List.command("SELECT", 3);
  await List.command("FLUSHDB");
});

afterAll(async () => {
  await List.command("FLUSHDB");
  List.close();
});

describe("Redis List Test: BLPOP", () => {
  it(`key exists`, async () => {
    expect(await List.command("RPUSH", "mylist", "a")).toBe(1);
    expect(await List.blpop(1, "mylist")).toEqual(["mylist", "a"]);
  });
});

describe("Redis List Test: BRPOP", () => {
  it(`key exists`, async () => {
    expect(await List.command("RPUSH", "mylist", "a")).toBe(1);
    expect(await List.brpop(1, "mylist")).toEqual(["mylist", "a"]);
  });
});

describe("Redis List Test: BRPOPLPUSH", () => {
  it(`key exists`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.command("RPUSH", "mylist", "three")).toBe(3);
    expect(await List.brpoplpush("mylist", "myotherlist", 1)).toBe("three");
  });
});

describe("Redis List Test: LINDEX", () => {
  it(`key not exists`, async () => {
    expect(await List.lindex("mylist", 0)).toBeNull();
  });
  it(`key exists`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", 1)).toBe(2);
    expect(await List.command("RPUSH", "mylist", "three")).toBe(3);
    expect(await List.lindex("mylist", 1)).toBe("1");
  });
});

describe("Redis List Test: LINSERT", () => {
  it(`key not exists`, async () => {
    expect(await List.linsert("mylist", "BEFORE", "World", "There")).toBe(0);
  });
  it(`can not find pivot`, async () => {
    expect(await List.command("RPUSH", "mylist", "Hello")).toBe(1);
    expect(await List.linsert("mylist", "BEFORE", "World", "There")).toBe(-1);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "Hello")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "World")).toBe(2);
    expect(await List.linsert("mylist", "BEFORE", "World", "There")).toBe(3);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(
            await List.linsert("mylist", "BEFORE", "World", "Hello")
          );
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LLEN", () => {
  it(`key not exists`, async () => {
    expect(await List.llen("mylist")).toBe(0);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "Hello")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "World")).toBe(2);
    expect(await List.llen("mylist")).toBe(2);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.llen("mylist"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LPOP", () => {
  it(`key not exists`, async () => {
    expect(await List.lpop("mylist")).toBeNull();
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "Hello")).toBe(1);
    expect(await List.command("RPUSH", "mylist", 100)).toBe(2);
    expect(await List.lpop("mylist")).toBe("Hello");
    expect(await List.lpop("mylist")).toBe("100");
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lpop("mylist"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LPUSH", () => {
  it(`key not exists`, async () => {
    expect(await List.lpush("mylist", 0)).toBe(1);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.lpush("mylist", 1)).toBe(3);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lpush("mylist", 2));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LPUSHX", () => {
  it(`key not exists`, async () => {
    expect(await List.lpushx("mylist", 0)).toBe(0);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.lpushx("mylist", "two")).toBe(3);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lpushx("mylist", 2));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LRANGE", () => {
  it(`key not exists`, async () => {
    expect(await List.lrange("mylist", 0, -1)).toEqual([]);
  });
  it(`type is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.lrange("mylist", 0, -1)).toEqual(["one", "two"]);
    expect(await List.lrange("mylist", 2, 100)).toEqual([]);
    expect(await List.lrange("mylist", 1, 100)).toEqual(["two"]);
  });
  it(`type not is list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lrange("mylist", 0, -1));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LREM", () => {
  it(`key not exists`, async () => {
    expect(await List.lrem("mylist", 2, "hello")).toBe(0);
  });
  it(`type is list`, async () => {
    expect(
      await List.command(
        "RPUSH",
        "mylist",
        "one",
        "two",
        "1",
        "one",
        "two",
        "2",
        "one",
        "two",
        "3"
      )
    ).toBe(9);
    expect(await List.lrem("mylist", 2, "hello")).toBe(0);
    expect(await List.lrem("mylist", 2, "one")).toBe(2);
    expect(await List.lrem("mylist", -2, "two")).toBe(2);
  });
  it(`type not is list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lrem("mylist", 0, "1"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LSET", () => {
  it(`key not exists`, async () => {
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lset("mylist", 0, "hello"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
  it(`type is list`, async () => {
    expect(
      await List.command(
        "RPUSH",
        "mylist",
        "one",
        "two",
        "1",
        "one",
        "two",
        "2",
        "one",
        "two",
        "3"
      )
    ).toBe(9);
    expect(await List.lset("mylist", 0, "hello")).toBe("OK");
    expect(await List.lset("mylist", 1, "world")).toBe("OK");
  });
  it(`type not is list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.lset("mylist", 0, "world"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: LTRIM", () => {
  it(`key not exists`, async () => {
    expect(await List.ltrim("mylist", 0, 1)).toBe("OK");
    expect(await List.command("TYPE", "mylist")).toBe("none");
  });
  it(`key is list`, async () => {
    expect(
      await List.command(
        "RPUSH",
        "mylist",
        "one",
        "two",
        "1",
        "one",
        "two",
        "2",
        "one",
        "two",
        "3"
      )
    ).toBe(9);
    expect(await List.ltrim("mylist", 1, -1)).toBe("OK");
    expect(await List.command("LRANGE", "mylist", 0, -1)).toEqual([
      "two",
      "1",
      "one",
      "two",
      "2",
      "one",
      "two",
      "3",
    ]);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.ltrim("mylist", 0, -1));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: RPOP", () => {
  it(`key not exists`, async () => {
    expect(await List.rpop("mylist")).toBeNull();
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "Hello")).toBe(1);
    expect(await List.command("RPUSH", "mylist", 100)).toBe(2);
    expect(await List.rpop("mylist")).toBe("100");
    expect(await List.rpop("mylist")).toBe("Hello");
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.rpop("mylist"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: RPOPLPUSH", () => {
  it(`key not exists`, async () => {
    expect(await List.rpoplpush("mylist", "myotherlist")).toBeNull();
  });
  it(`key is list`, async () => {
    expect(
      await List.command(
        "RPUSH",
        "mylist",
        "one",
        "two",
        1,
        "one",
        "two",
        2,
        "one",
        "two",
        3
      )
    ).toBe(9);
    expect(await List.rpoplpush("mylist", "myotherlist")).toBe("3");
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.rpoplpush("mylist", "myotherlist"));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: RPUSH", () => {
  it(`key not exists`, async () => {
    expect(await List.rpush("mylist", 0)).toBe(1);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.rpush("mylist", 1)).toBe(3);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.rpush("mylist", 2));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis List Test: RPUSHX", () => {
  it(`key not exists`, async () => {
    expect(await List.rpushx("mylist", 0)).toBe(0);
  });
  it(`key is list`, async () => {
    expect(await List.command("RPUSH", "mylist", "one")).toBe(1);
    expect(await List.command("RPUSH", "mylist", "two")).toBe(2);
    expect(await List.rpushx("mylist", "two")).toBe(3);
  });
  it(`key is not list`, async () => {
    expect(await List.command("SET", "mylist", "Hello")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await List.rpushx("mylist", 2));
        } catch (error) {
          throw new Error(error);
        }
      })()
    ).rejects.toThrow(Error);
  });
});
