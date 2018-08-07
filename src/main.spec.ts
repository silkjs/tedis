import { config, sleep } from "../tools";
import { Redis } from "./main";

let client: Redis;

beforeAll(async () => {
  client = new Redis({
    port: config.prot,
    host: config.host,
  });
  await sleep(2);
});

afterAll(() => {
  client.close();
});

describe("redis key", () => {
  test("keys", async () => {
    await client.keys("*");
  });
});

describe("redis string", () => {
  test("set", async () => {
    await client.set("string1", "hello world!");
  });
});

describe("redis hash", () => {
  test("hmset", async () => {
    await client.hmset("hash1", {
      name: "tom",
      age: 23,
    });
  });
});

describe("redis list", () => {
  test("lpush", async () => {
    await client.lpush("list1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
  });
});

describe("redis set", () => {
  test("sadd", async () => {
    await client.sadd("set1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
  });
});

describe("redis zset", () => {
  test("zadd", async () => {
    await client.zadd("zset1", [
      [1, "a"],
      [10, "a"],
      [2, "adg"],
      [3, "aertet"],
      [4, "afg"],
    ]);
  });
});
