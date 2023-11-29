import { InterfaceHash } from "../api/hash";
import { InterfaceKey } from "../api/key";
import { InterfaceList } from "../api/list";
import { InterfaceSet } from "../api/set";
import { InterfaceString } from "../api/string";
import { InterfaceZset } from "../api/zset";
import { InterfaceBase } from "./base";
interface InterfaceRedis extends InterfaceBase, InterfaceKey, InterfaceString, InterfaceHash, InterfaceList, InterfaceSet, InterfaceZset {
}
declare const Tedis_base: new (options?: {
    host?: string;
    port?: number;
    password?: string;
    timeout?: number;
}) => InterfaceRedis;
export declare class Tedis extends Tedis_base {
}
export {};
