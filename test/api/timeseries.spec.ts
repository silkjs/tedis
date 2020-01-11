import { Tedis, TedisPool } from "../../src/main";
import { config } from "../../tools/index";

config.port = 6371;
const Pool = new TedisPool(config);
let Timeseries: Tedis;

beforeAll(async () => {
  Timeseries = await Pool.getTedis();
});

beforeEach(async () => {
  await Timeseries.command("SELECT", 6);
  await Timeseries.command("FLUSHDB");
});

afterAll(async () => {
  await Timeseries.command("FLUSHDB");
  Timeseries.close();
});

describe("Redis Timeseries Test: TS.CREATE", () => {
  it(`create key with all options`, async () => {
    expect(await Timeseries.tscreate("temperature:2:32", {retention: 60000, labels: {sensor_id: 2, area_id: 32}})).toBe("OK");
  });
});
