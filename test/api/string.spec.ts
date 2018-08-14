import { Tedis } from "../../src/main";
import { config, sleep } from "../../tools/index";

const String: Tedis = new Tedis(config);

beforeAll(async () => {
  // await sleep(2);
});

beforeEach(async () => {
  await String.command("SELECT", 1);
  await String.command("FLUSHDB");
});

afterAll(async () => {
  await String.command("FLUSHDB");
  String.close();
});

describe("Redis String Test: APPEND", () => {
  it(`key not exists`, async () => {
    expect(await String.append("mykey", "Hello")).toBe(5);
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await String.append("mykey", " world")).toBe(11);
  });
});

describe("Redis String Test: DECR", () => {
  it(`key not exists`, async () => {
    expect(await String.decr("mykey")).toBe(-1);
  });
  it(`string can be represented as integer.`, async () => {
    expect(await String.command("SET", "mykey", "10")).toBe("OK");
    expect(await String.decr("mykey")).toBe(9);
  });
  it(`string can not be represented as integer.`, async () => {
    expect(
      await String.command("SET", "mykey", "234293482390480948029348230948")
    ).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.decr("mykey"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: DECRBY", () => {
  it(`key not exists`, async () => {
    expect(await String.decrby("mykey", 3)).toBe(-3);
  });
  it(`string can be represented as integer.`, async () => {
    expect(await String.command("SET", "mykey", "10")).toBe("OK");
    expect(await String.decrby("mykey", 3)).toBe(7);
  });
  it(`string can not be represented as integer.`, async () => {
    expect(
      await String.command("SET", "mykey", "234293482390480948029348230948")
    ).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.decrby("mykey", 3));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: GET", () => {
  it(`key not exists`, async () => {
    expect(await String.get("mykey")).toBeNull();
  });
  it(`the value stored at key is a string`, async () => {
    expect(await String.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await String.get("mykey")).toBe("Hello");
  });
  it(`the value stored at key is not a string`, async () => {
    expect(await String.command("HSET", "mykey", "name", "tom")).toBe(1);
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.get("mykey"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: GETBIT", () => {
  it(`key not exists`, async () => {
    expect(await String.getbit("mykey", 0)).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await String.command("SETBIT", "mykey", 7, 1)).toBe(0);
    expect(await String.getbit("mykey", 0)).toBe(0);
    expect(await String.getbit("mykey", 7)).toBe(1);
    expect(await String.getbit("mykey", 100)).toBe(0);
  });
});

describe("Redis String Test: GETBIT", () => {
  it(`key not exists`, async () => {
    expect(await String.getrange("mykey", [0, 3])).toBe("");
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "mykey", "This is a string")).toBe("OK");
    expect(await String.getrange("mykey", [0, 3])).toBe("This");
    expect(await String.getrange("mykey", [-3, -1])).toBe("ing");
    expect(await String.getrange("mykey")).toBe("This is a string");
    expect(await String.getrange("mykey", [10, 100])).toBe("string");
  });
});

describe("Redis String Test: GETSET", () => {
  it(`key not exists`, async () => {
    expect(await String.getset("mykey", "World")).toBeNull();
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "mykey", "Hello")).toBe("OK");
    expect(await String.getset("mykey", "World")).toBe("Hello");
    expect(await String.get("mykey")).toBe("World");
  });
});

describe("Redis String Test: INCR", () => {
  it(`key not exists`, async () => {
    expect(await String.incr("mykey")).toBe(1);
  });
  it(`string can be represented as integer.`, async () => {
    expect(await String.command("SET", "mykey", "10")).toBe("OK");
    expect(await String.incr("mykey")).toBe(11);
  });
  it(`string can not be represented as integer.`, async () => {
    expect(
      await String.command("SET", "mykey", "234293482390480948029348230948")
    ).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.incr("mykey"));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: INCRBY", () => {
  it(`key not exists`, async () => {
    expect(await String.incrby("mykey", 3)).toBe(3);
  });
  it(`string can be represented as integer.`, async () => {
    expect(await String.command("SET", "mykey", "10")).toBe("OK");
    expect(await String.incrby("mykey", 3)).toBe(13);
  });
  it(`string can not be represented as integer.`, async () => {
    expect(
      await String.command("SET", "mykey", "234293482390480948029348230948")
    ).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.incrby("mykey", 3));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: INCRBYFLOAT", () => {
  it(`key not exists`, async () => {
    expect(await String.incrbyfloat("mykey", 0.1)).toBe("0.1");
  });
  it(`string can be represented as number.`, async () => {
    expect(await String.command("SET", "mykey", "10.50")).toBe("OK");
    expect(await String.incrbyfloat("mykey", 0.1)).toBe("10.6");
    expect(await String.incrbyfloat("mykey", -5.5)).toBe("5.1");
  });
  it(`string can not be represented as number.`, async () => {
    expect(await String.command("SET", "mykey", "abc")).toBe("OK");
    await expect(
      (async () => {
        try {
          return Promise.reject(await String.incrbyfloat("mykey", 3));
        } catch (error) {
          throw new Error();
        }
      })()
    ).rejects.toThrow(Error);
  });
});

describe("Redis String Test: MGET", () => {
  it(`key not exists`, async () => {
    expect(await String.mget("mykey")).toEqual([null]);
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "key1", "Hello")).toBe("OK");
    expect(await String.command("SET", "key2", "World")).toBe("OK");
    expect(await String.mget("key1", "key2", "nonexisting")).toEqual([
      "Hello",
      "World",
      null,
    ]);
  });
});

describe("Redis String Test: MSET", () => {
  it(`key not exists`, async () => {
    expect(await String.mset({ key1: "Hello", key2: "World" })).toBe("OK");
    expect(await String.get("key1")).toBe("Hello");
    expect(await String.get("key2")).toBe("World");
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "key1", "abc")).toBe("OK");
    expect(await String.mset({ key1: "Hello", key2: "World" })).toBe("OK");
    expect(await String.get("key1")).toBe("Hello");
    expect(await String.get("key2")).toBe("World");
  });
});

describe("Redis String Test: MSETNX", () => {
  it(`key not exists`, async () => {
    expect(await String.msetnx({ key1: "Hello", key2: "World" })).toBe(1);
    expect(await String.get("key1")).toBe("Hello");
    expect(await String.get("key2")).toBe("World");
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "key1", "abc")).toBe("OK");
    expect(await String.msetnx({ key1: "Hello", key2: "World" })).toBe(0);
    expect(await String.get("key1")).toBe("abc");
    expect(await String.get("key2")).toBeNull();
  });
});

describe("Redis String Test: PSETEX", () => {
  it(`key not exists`, async () => {
    expect(await String.psetex("mykey", 1000, "Hello")).toBe("OK");
    expect(await String.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key exists`, async () => {
    expect(await String.command("SET", "mykey", "abc")).toBe("OK");
    expect(await String.command("TTL", "mykey")).toBe(-1);
    expect(await String.psetex("mykey", 1000, "Hello")).toBe("OK");
    expect(await String.command("TTL", "mykey")).not.toBe(-1);
  });
});

describe("Redis String Test: SET", () => {
  it(`key not exists`, async () => {
    expect(await String.set("mykey", "Hello")).toBe("OK");
  });
  it(`key exists`, async () => {
    expect(await String.psetex("mykey", 1000, "abc")).toBe("OK");
    expect(await String.command("PTTL", "mykey")).not.toBe(-1);
    expect(await String.set("mykey", "Hello")).toBe("OK");
    expect(await String.command("PTTL", "mykey")).toBe(-1);
  });
});

describe("Redis String Test: SETBIT", () => {
  it(`key not exists`, async () => {
    expect(await String.setbit("mykey", 7, 1)).toBe(0);
    expect(await String.setbit("mykey", 7, 0)).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await String.set("mykey", "abc")).toBe("OK");
    expect(await String.setbit("mykey", 7, 0)).toBe(1);
    expect(await String.setbit("mykey", 7, 1)).toBe(0);
  });
});

describe("Redis String Test: SETEX", () => {
  it(`key not exists`, async () => {
    expect(await String.setex("mykey", 1, "Hello")).toBe("OK");
    expect(await String.command("TTL", "mykey")).not.toBe(-1);
  });
  it(`key exists`, async () => {
    expect(await String.set("mykey", "abc")).toBe("OK");
    expect(await String.command("TTL", "mykey")).toBe(-1);
    expect(await String.setex("mykey", 1, "Hello")).toBe("OK");
    expect(await String.command("TTL", "mykey")).not.toBe(-1);
  });
});

describe("Redis String Test: SETNX", () => {
  it(`key not exists`, async () => {
    expect(await String.setnx("mykey", "Hello")).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await String.set("mykey", "abc")).toBe("OK");
    expect(await String.setnx("mykey", "Hello")).toBe(0);
  });
});

describe("Redis String Test: SETRANGE", () => {
  it(`key not exists`, async () => {
    expect(await String.setrange("mykey", 5, "Hello")).toBe(10);
    expect(await String.get("mykey")).toBe(
      "\u0000\u0000\u0000\u0000\u0000Hello"
    );
  });
  it(`key exists`, async () => {
    expect(await String.set("mykey", "Hello World")).toBe("OK");
    expect(await String.setrange("mykey", 6, "Redis")).toBe(11);
    expect(await String.get("mykey")).toBe("Hello Redis");
  });
});

describe("Redis String Test: STRLEN", () => {
  it(`key not exists`, async () => {
    expect(await String.strlen("mykey")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await String.set("mykey", "Hello World")).toBe("OK");
    expect(await String.strlen("mykey")).toBe(11);
  });
});
