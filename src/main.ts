import { InterfaceBase, RedisBase } from "./common/base";
import { Options } from "./common/global";
import { InterfaceHash, RedisHash } from "./data-types/hash";
import { InterfaceKey, RedisKey } from "./data-types/key";
import { InterfaceList, RedisList } from "./data-types/list";
import { InterfaceSet, RedisSet } from "./data-types/set";
import { InterfaceString, RedisString } from "./data-types/string";
import { InterfaceZset, RedisZset } from "./data-types/zset";

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
