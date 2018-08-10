import { RedisSet } from "../src/data-types/set";
import { config, sleep } from "../tools";

let Set: RedisSet;

beforeAll(async () => {
  Set = new RedisSet(config);
  await sleep(2);
});

beforeEach(async () => {
  await Set.command("SELECT", 4);
  await Set.command("FLUSHDB");
});

afterAll(() => {
  Set.close();
});

describe("Redis List Test: SADD", () => {
  it(`key not exists`, async () => {
    expect(await Set.sadd("myset", "Hello")).toBe(1);
  });
  it(`key exists`, async () => {
    expect(await Set.command("SADD", "myset", "a", "b", "c")).toBe(3);
    expect(await Set.sadd("myset", "c", "d")).toBe(1);
  });
});
