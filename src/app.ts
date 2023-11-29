import { Protocol } from "./core/protocol";
import { Tedis } from "./main";

const client = new Tedis({
  port: 6379,
  host: "127.0.0.1",
  password: "redis",
});

setTimeout(async () => {
  const protocol = new Protocol();

  protocol.write(Buffer.from(`$9\r\nhello\r\nworld\r\n`));
  protocol.parse();
  console.log(protocol.data);

  let res: any;
  res = await client.command("INFO", "STATS");
  console.log(res);
  /**
   * base
   */
  res = await client.command("FLUSHDB");
  console.log(res);
  // "OK"
  res = await client.command("SET", "key1", "Hello");
  console.log(res);
  // "OK"
  res = await client.command("SET", "key2", "World");
  console.log(res);
  // "OK"

  /**
   * key
   */
  res = await client.keys("*");
  console.log(res);
  // ["key2","key1"];
  res = await client.del("key1");
  console.log(res);
  // 1

  /**
   * string
   */
  res = await client.set("mystring", "hello");
  console.log(res);
  // "OK"
  res = await client.get("mystring");
  console.log(res);
  // "hello"

  /**
   * hash
   */
  res = await client.hmset("myhash", {
    name: "tedis",
    age: 18,
  });
  console.log(res);
  // "OK"
  res = await client.hgetall("myhash");
  console.log(res);
  // {
  //   "name": "tedis",
  //   "age": "18"
  // }

  /**
   * list
   */
  res = await client.lpush("mylist", "hello", "a", "b", "c", "d", 1, 2, 3, 4);
  console.log(res);
  // 9
  res = await client.llen("mylist");
  console.log(res);
  // 9

  /**
   * set
   */
  res = await client.sadd("myset", "hello");
  console.log(res);
  // 1
  res = await client.sadd("myset", "tedis");
  console.log(res);
  // 1
  res = await client.scard("myset");
  console.log(res);
  // 2

  /**
   * zset
   */
  res = await client.zadd("myzset", {
    one: 1,
    two: 2,
    three: 3,
  });
  console.log(res);
  // 3
  res = await client.zcard("myzset");
  console.log(res);
  // 3

  // close
  client.close();
}, 3000);
