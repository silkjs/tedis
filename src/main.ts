import { InterfaceHash, RedisHash } from "./api/hash";
import { InterfaceKey, RedisKey } from "./api/key";
import { InterfaceList, RedisList } from "./api/list";
import { InterfaceSet, RedisSet } from "./api/set";
import { InterfaceString, RedisString } from "./api/string";
import { InterfaceZset, RedisZset } from "./api/zset";
import { InterfaceBase, RedisBase } from "./core/base";
import { Options } from "./util/global";

interface InterfaceRedis
  extends InterfaceBase,
    InterfaceKey,
    InterfaceString,
    InterfaceHash,
    InterfaceList,
    InterfaceSet,
    InterfaceZset {}

type ClassMixinRedis = new (options: Options) => InterfaceRedis;

function Mixins(froms: any[]): ClassMixinRedis {
  class Mixin extends RedisBase {}
  froms.forEach((from) => {
    Reflect.ownKeys(from.prototype).forEach((name) => {
      (Mixin.prototype as any)[name] = from.prototype[name];
    });
  });
  return Mixin as any;
}

const MixinsRedis = Mixins([
  RedisKey,
  RedisString,
  RedisHash,
  RedisList,
  RedisSet,
  RedisZset,
]);

class Redis extends MixinsRedis {}

export { Redis };
