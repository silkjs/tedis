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
    const info = await Timeseries.tsinfo("temperature:2:32");
    expect(info.retentionTime).toBe(60000);
    expect(info.labels.sensor_id).toBe("2");
  });
  it(`create key with no options`, async () => {
    expect(await Timeseries.tscreate("temperature:3")).toBe("OK");
    const info = await Timeseries.tsinfo("temperature:3");
    expect(info.retentionTime).toBe(0);
    expect(info.labels.sensor_id).toBe(undefined);
  });
  it(`create key with only retention option`, async () => {
    expect(await Timeseries.tscreate("temperature:4", {retention: 1000})).toBe("OK");
    const info = await Timeseries.tsinfo("temperature:4");
    expect(info.retentionTime).toBe(1000);
    expect(info.labels.sensor_id).toBe(undefined);
  });
  it(`create key with only label option`, async () => {
    expect(await Timeseries.tscreate("temperature:5", {labels: {sensor_id: 5}})).toBe("OK");
    const info = await Timeseries.tsinfo("temperature:5");
    expect(info.retentionTime).toBe(0);
    expect(info.labels.sensor_id).toBe("5");
  });
});
