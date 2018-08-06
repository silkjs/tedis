const { Redis } = require("tedis");

const client = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

setTimeout(async () => {
  // key
  console.log("keys", await client.keys("*"));
  console.log("exists", await client.exists("a"));
  // string
  console.log("set", await client.set("string1", "abcdefg"));
  console.log("get", await client.get("string1"));
  // hash
  console.log(
    "hmset",
    await client.hmset("hash1", {
      name: "tom",
      age: 23,
    }),
  );
  console.log("hgetall", await client.hgetall("hash1"));
  // list
  console.log(
    "lpush",
    await client.lpush("list1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]),
  );
  console.log("llen", await client.llen("list1"));
  // set
  console.log(
    "sadd",
    await client.sadd("set1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]),
  );
  console.log("scard", await client.scard("set1"));
  // zset
  console.log(
    "zadd",
    await client.zadd("zset1", [
      [1, "a"],
      [10, "a"],
      [2, "adg"],
      [3, "aertet"],
      [4, "afg"],
    ]),
  );
  console.log("zcard", await client.zcard("zset1"));
  // base
  client.close();
}, 3000);
