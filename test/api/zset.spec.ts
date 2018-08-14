import { Tedis } from "../../src/main";
import { config, sleep } from "../../tools/index";

const Zset: Tedis = new Tedis(config);

beforeAll(async () => {
  // await sleep(2);
});

beforeEach(async () => {
  await Zset.command("SELECT", 5);
  await Zset.command("FLUSHDB");
});

afterAll(async () => {
  await Zset.command("FLUSHDB");
  Zset.close();
});

describe("Redis List Test: SADD", () => {
  it(`ZADD myzset`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(await Zset.zadd("myzset", { one: 5 })).toBe(0);
    expect(await Zset.zadd("myzset", { two: 10 })).toBe(1);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("5");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });

  it(`ZADD myzset "XX"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(await Zset.zadd("myzset", { one: 5 }, { nxxx: "XX" })).toBe(0);
    expect(await Zset.zadd("myzset", { two: 10 }, { nxxx: "XX" })).toBe(0);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("5");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBeNull();
  });
  it(`ZADD myzset "NX"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(await Zset.zadd("myzset", { one: 5 }, { nxxx: "NX" })).toBe(0);
    expect(await Zset.zadd("myzset", { two: 10 }, { nxxx: "NX" })).toBe(1);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });

  it(`ZADD myzset "CH"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(await Zset.zadd("myzset", { one: 5 }, { ch: "CH" })).toBe(1);
    expect(await Zset.zadd("myzset", { two: 10 }, { ch: "CH" })).toBe(1);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("5");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });
  it(`ZADD myzset "XX" "CH"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd("myzset", { one: 5 }, { nxxx: "XX", ch: "CH" })
    ).toBe(1);
    expect(
      await Zset.zadd("myzset", { two: 10 }, { nxxx: "XX", ch: "CH" })
    ).toBe(0);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("5");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBeNull();
  });
  it(`ZADD myzset "NX" "CH"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd("myzset", { one: 5 }, { nxxx: "NX", ch: "CH" })
    ).toBe(0);
    expect(
      await Zset.zadd("myzset", { two: 10 }, { nxxx: "NX", ch: "CH" })
    ).toBe(1);
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });

  it(`ZADD myzset "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(await Zset.zadd("myzset", { one: 5 }, { incr: "INCR" })).toBe("15");
    expect(await Zset.zadd("myzset", { two: 10 }, { incr: "INCR" })).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("15");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });
  it(`ZADD myzset "CH" "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd("myzset", { one: 5 }, { ch: "CH", incr: "INCR" })
    ).toBe("15");
    expect(
      await Zset.zadd("myzset", { two: 10 }, { ch: "CH", incr: "INCR" })
    ).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("15");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });
  it(`ZADD myzset "XX" "CH" "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd(
        "myzset",
        { one: 5 },
        { nxxx: "XX", ch: "CH", incr: "INCR" }
      )
    ).toBe("15");
    expect(
      await Zset.zadd(
        "myzset",
        { two: 10 },
        { nxxx: "XX", ch: "CH", incr: "INCR" }
      )
    ).toBeNull();
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("15");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBeNull();
  });
  it(`ZADD myzset "NX" "CH" "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd(
        "myzset",
        { one: 5 },
        { nxxx: "NX", ch: "CH", incr: "INCR" }
      )
    ).toBeNull();
    expect(
      await Zset.zadd(
        "myzset",
        { two: 10 },
        { nxxx: "NX", ch: "CH", incr: "INCR" }
      )
    ).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });
  it(`ZADD myzset "XX" "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd("myzset", { one: 5 }, { nxxx: "XX", incr: "INCR" })
    ).toBe("15");
    expect(
      await Zset.zadd("myzset", { two: 10 }, { nxxx: "XX", incr: "INCR" })
    ).toBeNull();
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("15");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBeNull();
  });
  it(`ZADD myzset "NX" "INCR"`, async () => {
    expect(await Zset.zadd("myzset", { one: 10 })).toBe(1);
    expect(
      await Zset.zadd("myzset", { one: 5 }, { nxxx: "NX", incr: "INCR" })
    ).toBeNull();
    expect(
      await Zset.zadd("myzset", { two: 10 }, { nxxx: "NX", incr: "INCR" })
    ).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "one")).toBe("10");
    expect(await Zset.command("ZSCORE", "myzset", "two")).toBe("10");
  });
});

describe("Redis List Test: ZCARD", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zcard("myzset")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "myzset", 10, "one")).toBe(1);
    expect(await Zset.zcard("myzset")).toBe(1);
  });
});

describe("Redis List Test: ZCOUNT", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zcount("myzset", "-inf", "+inf")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "myzset", 10, "one")).toBe(1);
    expect(await Zset.zcount("myzset", "-inf", "+inf")).toBe(1);
  });
});

describe("Redis List Test: ZINCRBY", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zincrby("myzset", 10, "one")).toBe("10");
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "myzset", 10, "one")).toBe(1);
    expect(await Zset.zincrby("myzset", 10, "one")).toBe("20");
  });
});

describe("Redis List Test: ZINTERSTORE", () => {
  it(`key not exists`, async () => {
    expect(
      await Zset.zinterstore("out", {
        zset1: 2,
        zset2: 3,
      })
    ).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "zset1", 1, "one", 2, "two")).toBe(2);
    expect(
      await Zset.command("ZADD", "zset2", 1, "one", 2, "two", 3, "three")
    ).toBe(3);
    expect(
      await Zset.zinterstore("out", {
        zset1: 2,
        zset2: 3,
      })
    ).toBe(2);
  });
});

describe("Redis List Test: ZLEXCOUNT", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zlexcount("myzset", "-", "+")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command(
        "ZADD",
        "myzset",
        0,
        "a",
        0,
        "b",
        0,
        "c",
        0,
        "d",
        0,
        "e",
        0,
        "f",
        0,
        "g"
      )
    ).toBe(7);
    expect(await Zset.zlexcount("myzset", "-", "+")).toBe(7);
    expect(await Zset.zlexcount("myzset", "[b", "[f")).toBe(5);
  });
});

describe("Redis List Test: ZRANGE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrange("myzset", 0, -1)).toEqual([]);
    expect(await Zset.zrange("myzset", 0, -1, "WITHSCORES")).toEqual({});
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 10, "one", 10, "two", 10, "three")
    ).toBe(3);
    expect(["one", "two", "three"]).toEqual(
      expect.arrayContaining(await Zset.zrange("myzset", 0, -1))
    );
    expect({
      one: "10",
      two: "10",
      three: "10",
    }).toEqual(
      expect.objectContaining(await Zset.zrange("myzset", 0, -1, "WITHSCORES"))
    );
  });
});

describe("Redis List Test: ZRANGEBYLEX", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrangebylex("myzset", "-", "+")).toEqual([]);
  });
  it(`key exists`, async () => {
    const mock = [0, "a", 0, "b", 0, "c", 0, "d", 0, "e", 0, "f", 0, "g"];
    expect(await Zset.command("ZADD", "myzset", ...mock)).toBe(7);
    expect(await Zset.zrangebylex("myzset", "-", "[c")).toEqual([
      "a",
      "b",
      "c",
    ]);
    expect(await Zset.zrangebylex("myzset", "-", "(c")).toEqual(["a", "b"]);
    expect(await Zset.zrangebylex("myzset", "[aaa", "(g")).toEqual([
      "b",
      "c",
      "d",
      "e",
      "f",
    ]);
    expect(
      await Zset.zrangebylex("myzset", "[aaa", "(g", {
        offset: 1,
        count: 2,
      })
    ).toEqual(["c", "d"]);
  });
});

describe("Redis List Test: ZRANGEBYSCORE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrangebyscore("myzset", "-inf", "+inf")).toEqual([]);
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual([]);
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        withscores: "WITHSCORES",
      })
    ).toEqual({});
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        withscores: "WITHSCORES",
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual({});
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 1, "one", 2, "two", 3, "three")
    ).toBe(3);
    expect(await Zset.zrangebyscore("myzset", "-inf", "+inf")).toEqual([
      "one",
      "two",
      "three",
    ]);
    expect(await Zset.zrangebyscore("myzset", "1", "2")).toEqual([
      "one",
      "two",
    ]);
    expect(await Zset.zrangebyscore("myzset", "(1", "2")).toEqual(["two"]);
    expect(await Zset.zrangebyscore("myzset", "(1", "(2")).toEqual([]);
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual(["two"]);
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        withscores: "WITHSCORES",
      })
    ).toEqual({
      one: "1",
      two: "2",
      three: "3",
    });
    expect(
      await Zset.zrangebyscore("myzset", "-inf", "+inf", {
        withscores: "WITHSCORES",
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual({
      two: "2",
    });
  });
});

describe("Redis List Test: ZRANK", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrank("myzset", "two")).toBeNull();
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zrank("myzset", "two")).toBe(1);
  });
});

describe("Redis List Test: ZREM", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrem("myzset", "two")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zrem("myzset", "two", "ten")).toBe(1);
  });
});

describe("Redis List Test: ZREMRANGEBYLEX", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zremrangebylex("myzset", "-", "+")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zremrangebylex("myzset", "-", "(two")).toBe(1);
  });
});

describe("Redis List Test: ZREMRANGEBYRANK", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zremrangebyrank("myzset", 0, -1)).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zremrangebyrank("myzset", 0, 1)).toBe(2);
  });
});

describe("Redis List Test: ZREMRANGEBYSCORE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zremrangebyscore("myzset", "-inf", "+inf")).toBe(0);
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zremrangebyscore("myzset", "-inf", "+inf")).toBe(3);
  });
});

describe("Redis List Test: ZREVRANGE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrevrange("myzset", 0, -1)).toEqual([]);
    expect(await Zset.zrevrange("myzset", 0, -1, "WITHSCORES")).toEqual({});
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zrevrange("myzset", 0, 1)).toEqual(["three", "two"]);
    expect(await Zset.zrevrange("myzset", 0, 1, "WITHSCORES")).toEqual({
      three: "6",
      two: "5",
    });
  });
});

describe("Redis List Test: ZREVRANGEBYSCORE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrevrangebyscore("myzset", "+inf", "-inf")).toEqual([]);
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual([]);
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        withscores: "WITHSCORES",
      })
    ).toEqual({});
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        withscores: "WITHSCORES",
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual({});
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 1, "one", 2, "two", 3, "three")
    ).toBe(3);
    expect(await Zset.zrevrangebyscore("myzset", "+inf", "-inf")).toEqual([
      "three",
      "two",
      "one",
    ]);
    expect(await Zset.zrevrangebyscore("myzset", "2", "1")).toEqual([
      "two",
      "one",
    ]);
    expect(await Zset.zrevrangebyscore("myzset", "(2", "1")).toEqual(["one"]);
    expect(await Zset.zrevrangebyscore("myzset", "(2", "(1")).toEqual([]);
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual(["two"]);
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        withscores: "WITHSCORES",
      })
    ).toEqual({
      three: "3",
      two: "2",
      one: "1",
    });
    expect(
      await Zset.zrevrangebyscore("myzset", "+inf", "-inf", {
        withscores: "WITHSCORES",
        limit: {
          offset: 1,
          count: 1,
        },
      })
    ).toEqual({
      two: "2",
    });
  });
});

describe("Redis List Test: ZREVRANK", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zrevrank("myzset", "two")).toBeNull();
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zrevrank("myzset", "one")).toBe(2);
  });
});

describe("Redis List Test: ZSCORE", () => {
  it(`key not exists`, async () => {
    expect(await Zset.zscore("myzset", "two")).toBeNull();
  });
  it(`key exists`, async () => {
    expect(
      await Zset.command("ZADD", "myzset", 4, "one", 5, "two", 6, "three")
    ).toBe(3);
    expect(await Zset.zscore("myzset", "one")).toBe("4");
  });
});

describe("Redis List Test: ZUNIONSTORE", () => {
  it(`key not exists`, async () => {
    expect(
      await Zset.zunionstore("out", {
        zset1: 2,
        zset2: 3,
      })
    ).toBe(0);
  });
  it(`key exists`, async () => {
    expect(await Zset.command("ZADD", "zset1", 1, "one", 2, "two")).toBe(2);
    expect(
      await Zset.command("ZADD", "zset2", 1, "one", 2, "two", 3, "three")
    ).toBe(3);
    expect(
      await Zset.zunionstore("out", {
        zset1: 2,
        zset2: 3,
      })
    ).toBe(3);
  });
});
