// api
import { InterfaceHash, RedisHash } from "../api/hash";
import { InterfaceKey, RedisKey } from "../api/key";
import { InterfaceList, RedisList } from "../api/list";
import { InterfaceSet, RedisSet } from "../api/set";
import { InterfaceString, RedisString } from "../api/string";
import { InterfaceZset, RedisZset } from "../api/zset";
// util
import { Mixins } from "../util/tools";
// core
import { Base, InterfaceBase } from "./base";

interface InterfaceRedis
  extends InterfaceBase,
    InterfaceKey,
    InterfaceString,
    InterfaceHash,
    InterfaceList,
    InterfaceSet,
    InterfaceZset {}

export class Tedis extends Mixins<
  new (options?: {
    host?: string;
    port?: number;
    password?: string;
    timeout?: number;
    tls?: {
      key: Buffer;
      cert: Buffer;
    };
  }) => InterfaceRedis
>(Base, [RedisKey, RedisString, RedisHash, RedisList, RedisSet, RedisZset]) {}
