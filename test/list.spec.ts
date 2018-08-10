import { RedisList } from "../src/data-types/list";
import { config, sleep } from "../tools";
let List: RedisList;

beforeAll(async () => {
  List = new RedisList(config);
  await sleep(2);
});

beforeEach(async () => {
  await List.command("SELECT", 3);
  await List.command("FLUSHDB");
});

afterAll(() => {
  List.close();
});

describe("Redis List Test: BLPOP", () => {
  it(`key exists`, async () => {
    expect(await List.command("RPUSH", "list1", "a")).toBe(1);
    expect(await List.blpop(1, "list1")).toEqual(["list1", "a"]);
  });
});
