import { Base, BaseParams } from "./base";
import { Array2Object } from "src/util/tools";

export class Tedis extends Base {
  constructor(options?: BaseParams) {
    super(options);
  }
  /*******************************************************************************************************
   * KEY *************************************************************************************************
   *******************************************************************************************************/
  /**
   * Removes the specified keys. A key is ignored if it does not exist.
   *
   * @param key The first key.
   * @param keys The other key.
   * @returns The number of keys that were removed.
   */
  public del(key: string, ...keys: string[]) {
    return this.command<number>("DEL", key, ...keys);
  }
  /**
   * Returns if key exists.
   *
   * Since Redis 3.0.3 it is possible to specify multiple keys instead of a single one. In such a case,
   * it returns the total number of keys existing. Note that returning 1 or 0 for a single key is just
   * a special case of the variadic usage, so the command is completely backward compatible.
   *
   * The user should be aware that if the same existing key is mentioned in the arguments multiple times,
   * it will be counted multiple times. So if somekey exists, EXISTS somekey somekey will return 2.
   *
   * @param key The first key.
   * @param keys The other key.
   * @returns 1 if the key exists. 0 if the key does not exist.
   */
  public exists(key: string, ...keys: string[]) {
    return this.command<number>("EXISTS", key, ...keys);
  }
  /**
   * Set a timeout on key. After the timeout has expired, the key will automatically be deleted. A key
   * with an associated timeout is often said to be volatile in Redis terminology.
   *
   * @param key The key.
   * @param seconds Expiration time in seconds.
   * @returns 1 if the timeout was set. 0 if key does not exist.
   */
  public expire(key: string, seconds: number) {
    return this.command<number>("EXPIRE", key, seconds);
  }
  /**
   * `EXPIREAT` has the same effect and semantic as `EXPIRE`, but instead of specifying the number of
   * seconds representing the TTL (time to live), it takes an absolute Unix timestamp (seconds since
   * January 1, 1970). A timestamp in the past will delete the key immediately.
   *
   * Please for the specific semantics of the command refer to the documentation of `EXPIRE`.
   *
   * @param key The key.
   * @param timestamp Expiration time in timestamp.
   * @returns 1 if the timeout was set. 0 if key does not exist.
   */
  public expireat(key: string, timestamp: number) {
    return this.command<number>("EXPIREAT", key, timestamp);
  }
  /**
   * Returns all keys matching pattern.
   *
   * @param pattern Pattern string.
   * @returns List of keys matching pattern.
   */
  public keys(pattern: string) {
    return this.command<string[]>("KEYS", pattern);
  }
  /**
   * Move key from the currently selected database (see `SELECT`) to the specified destination database.
   * When key already exists in the destination database, or it does not exist in the source database,
   * it does nothing. It is possible to use `MOVE` as a locking primitive because of this.
   *
   * @param key The key.
   * @param db The specified database number.
   * @returns 1 if key was moved. 0 if key was not moved.
   */
  public move(key: string, db: number) {
    return this.command<number>("MOVE", key, db);
  }
  /**
   * Remove the existing timeout on key, turning the key from volatile (a key with an expire set) to
   * persistent (a key that will never expire as no timeout is associated).
   *
   * @param key The key.
   * @returns 1 if the timeout was removed. 0 if key does not exist or does not have an associated timeout.
   */
  public persist(key: string) {
    return this.command<number>("PERSIST", key);
  }
  /**
   * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds
   * instead of seconds.
   *
   * @param key The key.
   * @param milliseconds Expiration time in milliseconds.
   * @returns 1 if the timeout was set. 0 if key does not exist.
   */
  public pexpire(key: string, milliseconds: number) {
    return this.command<number>("PEXPIRE", key, milliseconds);
  }
  /**
   * `PEXPIREAT` has the same effect and semantic as `EXPIREAT`, but the Unix time at which the key will
   * expire is specified in milliseconds instead of seconds.
   *
   * @param key The key.
   * @param millisecondsTimestamp Expiration time in millisecondsTimestamp.
   * @returns 1 if the timeout was set. 0 if key does not exist.
   */
  public pexpireat(key: string, millisecondsTimestamp: number) {
    return this.command<number>("PEXPIREAT", key, millisecondsTimestamp);
  }
  /**
   * Like `TTL` this command returns the remaining time to live of a key that has an expire set, with the
   * sole difference that `TTL` returns the amount of remaining time in seconds while `PTTL` returns it in
   * milliseconds.
   *
   * @param key The key.
   * @returns `TTL` in milliseconds, or a negative value in order to signal an error (see the description
   * above). The command returns -2 if the key does not exist. The command returns -1 if the key exists
   * but has no associated expire.
   */
  public pttl(key: string) {
    return this.command<number>("PTTL", key);
  }
  /**
   * Return a random key from the currently selected database.
   *
   * @returns The random key, or nil when the database is empty.
   */
  public randomkey() {
    return this.command<string | null>("RANDOMKEY");
  }
  /**
   * Renames key to newkey. It returns an error when key does not exist. If newkey already exists it is
   * overwritten, when this happens `RENAME` executes an implicit DEL operation, so if the deleted key
   * contains a very big value it may cause high latency even if `RENAME` itself is usually a constant-time
   * operation.
   *
   * Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.
   *
   * @param key The key.
   * @param newKey The newKey.
   * @returns "OK".
   */
  public rename(key: string, newKey: string) {
    return this.command<string>("RENAME", key, newKey);
  }
  /**
   * Renames key to newkey if newkey does not yet exist. It returns an error when key does not exist.
   *
   * Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.
   *
   * @param key The key.
   * @param newKey The newKey.
   * @returns 1 if key was renamed to newkey. 0 if newkey already exists.
   */
  public renamenx(key: string, newKey: string) {
    return this.command<0 | 1>("RENAMENX", key, newKey);
  }
  /**
   * Returns the remaining time to live of a key that has a timeout. This introspection capability allows
   * a Redis client to check how many seconds a given key will continue to be part of the dataset.
   *
   * In Redis 2.6 or older the command returns -1 if the key does not exist or if the key exist but has
   * no associated expire.
   *
   * Starting with Redis 2.8 the return value in case of error changed:
   * - The command returns -2 if the key does not exist.
   * - The command returns -1 if the key exists but has no associated expire.
   *
   * See also the `PTTL` command that returns the same information with milliseconds resolution (Only
   * available in Redis 2.6 or greater).
   *
   * @param key The key.
   * @returns TTL in seconds, or a negative value in order to signal an error (see the description above).
   */
  public ttl(key: string) {
    return this.command<number>("TTL", key);
  }
  /**
   * Returns the string representation of the type of the value stored at key. The different types that
   * can be returned are: string, list, set, zset and hash.
   *
   * @param key The key.
   * @returns Type of key(string, hash, list, set, zset), or none when key does not exist.
   */
  public type(key: string) {
    return this.command<string>("TYPE", key);
  }
  /*******************************************************************************************************
   * STRING **********************************************************************************************
   *******************************************************************************************************/
  /**
   * If key already exists and is a string, this command appends the value at the end of the string. If
   * key does not exist it is created and set as an empty string, so `APPEND` will be similar to SET in
   * this special case.
   *
   * @param key The key.
   * @param value The value.
   * @returns The length of the string after the append operation.
   */
  public append(key: string, value: string) {
    return this.command<number>("APPEND", key, value);
  }
  /**
   * Decrements the number stored at key by one. If the key does not exist, it is set to 0 before performing
   * the operation. An error is returned if the key contains a value of the wrong type or contains a string
   * that can not be represented as integer. This operation is limited to 64 bit signed integers.
   *
   * @param key The key.
   * @returns The value of key after the decrement.
   */
  public decr(key: string) {
    return this.command<number>("DECR", key);
  }
  /**
   * Decrements the number stored at key by decrement. If the key does not exist, it is set to 0 before
   * performing the operation. An error is returned if the key contains a value of the wrong type or
   * contains a string that can not be represented as integer. This operation is limited to 64 bit
   * signed integers.
   *
   * @param key The key.
   * @param increment The increment.
   * @returns The value of key after the decrement.
   */
  public decrby(key: string, increment: number) {
    return this.command<number>("DECRBY", key, increment);
  }
  /**
   * Get the value of key. If the key does not exist the special value nil is returned. An error is returned
   * if the value stored at key is not a string, because `GET` only handles string values.
   *
   * @param key The key.
   * @returns The value of key, or nil when key does not exist.
   */
  public get(key: string) {
    return this.command<string | number | null>("GET", key);
  }
  /**
   * Returns the bit value at offset in the string value stored at key.
   *
   * When offset is beyond the string length, the string is assumed to be a contiguous space with 0 bits.
   * When key does not exist it is assumed to be an empty string, so offset is always out of range and
   * the value is also assumed to be a contiguous space with 0 bits.
   *
   * @param key The key.
   * @param offset The offset.
   * @returns The bit value stored at offset.
   */
  public getbit(key: string, offset: number) {
    return this.command<0 | 1>("GETBIT", key, offset);
  }
  /**
   * Returns the substring of the string value stored at key, determined by the offsets start and end
   * (both are inclusive). Negative offsets can be used in order to provide an offset starting from
   * the end of the string. So -1 means the last character, -2 the penultimate and so forth.
   *
   * The function handles out of range requests by limiting the resulting range to the actual length
   * of the string.
   *
   * @param key The key.
   * @param range The range. Start is the start position, and end is the end position
   * @returns Substring.
   */
  public getrange(key: string, [start, end]: [number, number] = [0, -1]) {
    return this.command<string>("GETRANGE", key, start, end);
  }
  /**
   * Atomically sets key to value and returns the old value stored at key. Returns an error when key
   * exists but does not hold a string value.
   *
   * @param key The key.
   * @param value The value.
   * @returns The old value stored at key, or nil when key did not exist.
   */
  public getset(key: string, value: string) {
    return this.command<string | null>("GETSET", key, value);
  }
  /**
   * Increments the number stored at key by one. If the key does not exist, it is set to 0 before
   * performing the operation. An error is returned if the key contains a value of the wrong type
   * or contains a string that can not be represented as integer. This operation is limited to 64
   * bit signed integers.
   *
   *
   * Note: this is a string operation because Redis does not have a dedicated integer type. The
   * string stored at the key is interpreted as a base-10 64 bit signed integer to execute the
   * operation.
   *
   * Redis stores integers in their integer representation, so for string values that actually
   * hold an integer, there is no overhead for storing the string representation of the integer.
   *
   * @param key The key.
   * @returns the value of key after the increment.
   */
  public incr(key: string) {
    return this.command<number>("INCR", key);
  }
  /**
   * Increments the number stored at key by increment. If the key does not exist, it is set to 0 before
   * performing the operation. An error is returned if the key contains a value of the wrong type or
   * contains a string that can not be represented as integer. This operation is limited to 64 bit signed
   * integers.
   *
   * @param key The key.
   * @param increment The increment.
   * @returns The value of key after the increment.
   */
  public incrby(key: string, increment: number) {
    return this.command<number>("INCRBY", key, increment);
  }
  /**
   * Increment the string representing a floating point number stored at key by the specified increment.
   * By using a negative increment value, the result is that the value stored at the key is decremented
   * (by the obvious properties of addition). If the key does not exist, it is set to 0 before performing
   * the operation. An error is returned if one of the following conditions occur:
   * - The key contains a value of the wrong type (not a string).
   * - The current key content or the specified increment are not parsable as a double precision floating
   * point number.
   *
   * If the command is successful the new incremented value is stored as the new value of the key (replacing
   * the old one), and returned to the caller as a string.
   *
   * @param key The key.
   * @param increment The increment.
   * @returns The value of key after the increment.
   */
  public incrbyfloat(key: string, increment: number) {
    return this.command<string>("INCRBYFLOAT", key, increment);
  }
  /**
   * Returns the values of all specified keys. For every key that does not hold a string value or does not
   * exist, the special value nil is returned. Because of this, the operation never fails.
   *
   * @param key The key.
   * @param keys The other key.
   * @returns List of values at the specified keys.
   */
  public mget(key: string, ...keys: string[]) {
    return this.command<Array<string | number | null>>("MGET", key, ...keys);
  }
  /**
   * Sets the given keys to their respective values. `MSET` replaces existing values with new values, just
   * as regular `SET`. See `MSETNX` if you don't want to overwrite existing values.
   *
   * `MSET` is atomic, so all given keys are set at once. It is not possible for clients to see that some
   * of the keys were updated while others are unchanged.
   *
   * @param objKV The objects that need to be saved
   * @returns Always OK since `MSET` can't fail.
   */
  public mset(objKV: { [propName: string]: string }) {
    const arrayKV: string[] = [];
    (Reflect.ownKeys(objKV) as string[]).forEach(key => {
      arrayKV.push(key, objKV[key]);
    });
    return this.command<string>("MSET", ...arrayKV);
  }
  /**
   * Sets the given keys to their respective values. `MSETNX` will not perform any operation at all even
   * if just a single key already exists.
   *
   * Because of this semantic `MSETNX` can be used in order to set different keys representing different
   * fields of an unique logic object in a way that ensures that either all the fields or none at all are
   * set.
   *
   * `MSETNX` is atomic, so all given keys are set at once. It is not possible for clients to see that
   * some of the keys were updated while others are unchanged.
   *
   * @param objKv The objects that need to be saved
   * @returns 1 if the all the keys were set. 0 if no key was set (at least one key already existed).
   */
  public msetnx(objKv: { [propName: string]: string }) {
    const arrayKV: string[] = [];
    (Reflect.ownKeys(objKv) as string[]).forEach(key => {
      arrayKV.push(key, objKv[key]);
    });
    return this.command<number>("MSETNX", ...arrayKV);
  }
  /**
   * `PSETEX` works exactly like `SETEX` with the sole difference that the expire time is specified in
   * milliseconds instead of seconds.
   *
   * @param key The key.
   * @param milliseconds Expiration time in milliseconds.
   * @param value The value.
   * @returns "OK".
   */
  public psetex(key: string, milliseconds: number, value: string) {
    return this.command<string>("PSETEX", key, milliseconds, value);
  }
  /**
   * Set key to hold the string value. If key already holds a value, it is overwritten, regardless of
   * its type. Any previous time to live associated with the key is discarded on successful SET operation.
   *
   * Options Starting with Redis 2.6.12 SET supports a set of options that modify its behavior:
   * - EX seconds -- Set the specified expire time, in seconds.
   * - PX milliseconds -- Set the specified expire time, in milliseconds.
   * - NX -- Only set the key if it does not already exist.
   * - XX -- Only set the key if it already exist.
   *
   * @param key The key.
   * @param value The value.
   * @returns OK if `SET` was executed correctly. Null reply: a Null Bulk Reply is returned if the `SET`
   * operation was not performed because the user specified the NX or XX option but the condition was
   * not met.
   */
  public set(key: string, value: string) {
    return this.command<string>("SET", key, value);
  }
  /**
   * Sets or clears the bit at offset in the string value stored at key.
   *
   * The bit is either set or cleared depending on value, which can be either 0 or 1. When key does not
   * exist, a new string value is created. The string is grown to make sure it can hold a bit at offset.
   * The offset argument is required to be greater than or equal to 0, and smaller than 2^32 (this limits
   * bitmaps to 512MB). When the string at key is grown, added bits are set to 0.
   *
   * @param key The key.
   * @param offset The offset
   * @param value The value.
   * @returns The original bit value stored at offset.
   */
  public setbit(key: string, offset: number, value: 0 | 1) {
    return this.command<0 | 1>("SETBIT", key, offset, value);
  }
  /**
   * Set key to hold the string value and set key to timeout after a given number of seconds.
   *
   * @param key The key.
   * @param seconds Expiration time in seconds.
   * @param value The value.
   * @returns "OK".
   */
  public setex(key: string, seconds: number, value: string) {
    return this.command<string>("SETEX", key, seconds, value);
  }
  /**
   * Set key to hold string value if key does not exist. In that case, it is equal to `SET`. When key already
   * holds a value, no operation is performed. `SETNX` is short for "SET if Not eXists".
   *
   * @param key The key.
   * @param keys The other key.
   * @returns 1 if the key was set, 0 if the key was not set.
   */
  public setnx(key: string, ...keys: string[]) {
    return this.command<0 | 1>("SETNX", key, ...keys);
  }
  /**
   * Overwrites part of the string stored at key, starting at the specified offset, for the entire length of
   * value. If the offset is larger than the current length of the string at key, the string is padded with
   * zero-bytes to make offset fit. Non-existing keys are considered as empty strings, so this command will
   * make sure it holds a string large enough to be able to set value at offset.
   *
   * @param key The key.
   * @param offset The offset.
   * @param value The value.
   * @returns The length of the string after it was modified by the command.
   */
  public setrange(key: string, offset: number, value: string) {
    return this.command<number>("SETRANGE", key, offset, value);
  }
  /**
   * Returns the length of the string value stored at key. An error is returned when key holds a non-string value.
   *
   * @param key The key.
   * @returns The length of the string at key, or 0 when key does not exist.
   */
  public strlen(key: string) {
    return this.command<number>("STRLEN", key);
  }
  /*******************************************************************************************************
   * HASH ************************************************************************************************
   *******************************************************************************************************/
  /**
   * Removes the specified fields from the hash stored at key. Specified fields that do not exist within
   * this hash are ignored. If key does not exist, it is treated as an empty hash and this command returns 0.
   *
   * @param key The key.
   * @param field The field.
   * @param fields The other field.
   * @returns The number of fields that were removed from the hash, not including specified but non existing
   * fields.
   */
  public hdel(key: string, field: string, ...fields: string[]) {
    return this.command<number>("HDEL", key, field, ...fields);
  }
  /**
   * Returns if field is an existing field in the hash stored at key.
   * @param key The key.
   * @param field The field.
   * @returns 1 if the hash contains field. 0 if the hash does not contain field, or key does not exist.
   */
  public hexists(key: string, field: string) {
    return this.command<number>("HEXISTS", key, field);
  }
  /**
   * Returns the value associated with field in the hash stored at key.
   *
   * @param key The key.
   * @param field The field.
   * @returns The value associated with field, or nil when field is not present in the hash or key does not exist.
   */
  public hget(key: string, field: string) {
    return this.command<string | null>("HGET", key, field);
  }
  /**
   * Returns all fields and values of the hash stored at key. In the returned value, every field name is followed
   * by its value, so the length of the reply is twice the size of the hash.
   *
   * @param key The key.
   * @returns List of fields and their values stored in the hash, or an empty list when key does not exist.
   */
  public async hgetall(key: string) {
    return Array2Object(await this.command<string[]>("HGETALL", key));
  }
  /**
   * Increments the number stored at field in the hash stored at key by increment. If key does not exist, a new
   * key holding a hash is created. If field does not exist the value is set to 0 before the operation is performed.
   *
   * The range of values supported by `HINCRBY` is limited to 64 bit signed integers.
   *
   * @param key The key.
   * @param field The field.
   * @param increment The increment.
   * @returns The value at field after the increment.
   */
  public hincrby(key: string, field: string, increment: number) {
    return this.command<number>("HINCRBY", key, field, increment);
  }
  /**
   * Increment the specified field of a hash stored at key, and representing a floating point number, by the
   * specified increment. If the increment value is negative, the result is to have the hash field value
   * decremented instead of incremented. If the field does not exist, it is set to 0 before performing the
   * operation. An error is returned if one of the following conditions occur:
   * - The field contains a value of the wrong type (not a string).
   * - The current field content or the specified increment are not parsable as a double precision floating point number.
   *
   * @param key The key.
   * @param field The field.
   * @param increment The increment.
   * @returns The value at field after the increment.
   */
  public hincrbyfloat(key: string, field: string, increment: number) {
    return this.command<string>("HINCRBYFLOAT", key, field, increment);
  }
  /**
   * Returns all field names in the hash stored at key.
   *
   * @param key The key.
   * @returns List of fields in the hash, or an empty list when key does not exist.
   */
  public hkeys(key: string) {
    return this.command<string[]>("HKEYS", key);
  }
  /**
   * Returns the number of fields contained in the hash stored at key.
   * @param key The key.
   * @returns Number of fields in the hash, or 0 when key does not exist.
   */
  public hlen(key: string) {
    return this.command<number>("HLEN", key);
  }
  /**
   * Returns the values associated with the specified fields in the hash stored at key.
   *
   * For every field that does not exist in the hash, a nil value is returned. Because non-existing keys are
   * treated as empty hashes, running HMGET against a non-existing key will return a list of nil values.
   *
   * @param key The key.
   * @param field The field.
   * @param fields The other field.
   * @returns List of values associated with the given fields, in the same order as they are requested.
   */
  public hmget(key: string, field: string, ...fields: string[]) {
    return this.command<Array<string | null>>("HMGET", key, field, ...fields);
  }
  /**
   * Sets the specified fields to their respective values in the hash stored at key. This command overwrites
   * any specified fields already existing in the hash. If key does not exist, a new key holding a hash is
   * created.
   *
   * @param key The key.
   * @param data The data.
   * @returns "OK".
   */
  public hmset(
    key: string,
    data: {
      [propName: string]: string | number;
    },
  ) {
    const arrayFV: any[] = [];
    (Reflect.ownKeys(data) as string[]).forEach(field => {
      arrayFV.push(field, data[field]);
    });
    return this.command("HMSET", key, ...arrayFV);
  }
  /**
   * Sets field in the hash stored at key to value. If key does not exist, a new key holding a hash is created.
   * If field already exists in the hash, it is overwritten.
   *
   * @param key The key.
   * @param field The field.
   * @param value The value.
   * @returns 1 if field is a new field in the hash and value was set. 0 if field already exists in the hash
   * and the value was updated.
   */
  public hset(key: string, field: string, value: string) {
    return this.command<0 | 1>("HSET", key, field, value);
  }
  /**
   * Sets field in the hash stored at key to value, only if field does not yet exist. If key does not exist,
   * a new key holding a hash is created. If field already exists, this operation has no effect.
   *
   * @param key The key.
   * @param field The field.
   * @param value The value.
   * @returns 1 if field is a new field in the hash and value was set. 0 if field already exists in the hash
   * and no operation was performed.
   */
  public hsetnx(key: string, field: string, value: string) {
    return this.command<0 | 1>("HSETNX", key, field, value);
  }
  /**
   * Returns the string length of the value associated with field in the hash stored at key. If the key or the
   * field do not exist, 0 is returned.
   *
   * @param key The key.
   * @param field The field.
   * @returns The string length of the value associated with field, or zero when field is not present in the
   * hash or key does not exist at all.
   */
  public hstrlen(key: string, field: string) {
    return this.command<number>("HSTRLEN", key, field);
  }
  /**
   * Returns all values in the hash stored at key.
   * @param key The key.
   * @returns List of values in the hash, or an empty list when key does not exist.
   */
  public hvals(key: string) {
    return this.command<string[]>("HVALS", key);
  }
  /*******************************************************************************************************
   * LIST ************************************************************************************************
   *******************************************************************************************************/
  /**
   * BLPOP is a blocking list pop primitive. It is the blocking version of LPOP because it blocks the
   * connection when there are no elements to pop from any of the given lists. An element is popped from
   * the head of the first list that is non-empty, with the given keys being checked in the order that
   * they are given.
   *
   * @param timeout The timeout.
   * @param keys The keys.
   * @returns
   * - A nil multi-bulk when no element could be popped and the timeout expired.
   * - A two-element multi-bulk with the first element being the name of the key where an element was
   * popped and the second element being the value of the popped element.
   */
  public blpop(timeout: number, ...keys: string[]) {
    return this.command<Array<string | null>>("BLPOP", ...keys, timeout);
  }
  /**
   * BRPOP is a blocking list pop primitive. It is the blocking version of RPOP because it blocks the
   * connection when there are no elements to pop from any of the given lists. An element is popped
   * from the tail of the first list that is non-empty, with the given keys being checked in the order
   * that they are given.
   *
   * @param timeout The timeout.
   * @param keys The keys.
   * @returns
   * - A nil multi-bulk when no element could be popped and the timeout expired.
   * - A two-element multi-bulk with the first element being the name of the key where an element was
   * popped and the second element being the value of the popped element.
   */
  public brpop(timeout: number, ...keys: string[]) {
    return this.command<Array<string | null>>("BRPOP", ...keys, timeout);
  }
  /**
   * BRPOPLPUSH is the blocking variant of RPOPLPUSH. When source contains elements, this command behaves
   * exactly like RPOPLPUSH. When used inside a MULTI/EXEC block, this command behaves exactly like
   * RPOPLPUSH. When source is empty, Redis will block the connection until another client pushes to it
   * or until timeout is reached. A timeout of zero can be used to block indefinitely.
   *
   * @param source The source.
   * @param destination The destination.
   * @param timeout The timeout.
   * @returns The element being popped from source and pushed to destination. If timeout is reached, a
   * Null reply is returned.
   */
  public brpoplpush(source: string, destination: string, timeout: number) {
    return this.command("BRPOPLPUSH", source, destination, timeout);
  }
  /**
   * Returns the element at index index in the list stored at key. The index is zero-based, so 0 means
   * the first element, 1 the second element and so on. Negative indices can be used to designate elements
   * starting at the tail of the list. Here, -1 means the last element, -2 means the penultimate and so
   * forth.
   *
   * When the value at key is not a list, an error is returned.
   *
   * @param key The key.
   * @param index The index.
   * @returns The requested element, or nil when index is out of range.
   */
  public lindex(key: string, index: number) {
    return this.command("LINDEX", key, index);
  }
  /**
   * Inserts value in the list stored at key either before or after the reference value pivot.
   *
   * When key does not exist, it is considered an empty list and no operation is performed.
   *
   * An error is returned when key exists but does not hold a list value.
   *
   * @param key The key.
   * @param type The type.
   * @param pivot The pivot.
   * @param value The value.
   * @returns the length of the list after the insert operation, or -1 when the value pivot was not found.
   */
  public linsert(key: string, type: "BEFORE" | "AFTER", pivot: string, value: string) {
    return this.command<number>("LINSERT", key, type, pivot, value);
  }
  /**
   * Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty
   * list and 0 is returned. An error is returned when the value stored at key is not a list.
   *
   * @param key The key.
   * @returns The length of the list at key.
   */
  public llen(key: string) {
    return this.command<number>("LLEN", key);
  }
  /**
   * Removes and returns the first element of the list stored at key.
   *
   * @param key The key.
   * @returns The value of the first element, or nil when key does not exist.
   */
  public lpop(key: string) {
    return this.command<string | null>("LPOP", key);
  }
  /**
   * Insert all the specified values at the head of the list stored at key. If key does not exist, it is
   * created as empty list before performing the push operations. When key holds a value that is not a list,
   * an error is returned.
   *
   * It is possible to push multiple elements using a single command call just specifying multiple arguments
   * at the end of the command. Elements are inserted one after the other to the head of the list, from the
   * leftmost element to the rightmost element. So for instance the command LPUSH mylist a b c will result
   * into a list containing c as first element, b as second element and a as third element.
   *
   * @param key The key.
   * @param value The value.
   * @param values The other value.
   * @returns The length of the list after the push operations.
   */
  public lpush(key: string, value: string | number, ...values: Array<string | number>) {
    return this.command<number>("LPUSH", key, value, ...values);
  }
  /**
   * Inserts value at the head of the list stored at key, only if key already exists and holds a list. In
   * contrary to LPUSH, no operation will be performed when key does not yet exist.
   *
   * @param key The key.
   * @param value The value.
   * @returns The length of the list after the push operation.
   */
  public lpushx(key: string, value: string | number) {
    return this.command<number>("LPUSHX", key, value);
  }
  /**
   * Returns the specified elements of the list stored at key. The offsets start and stop are zero-based
   * indexes, with 0 being the first element of the list (the head of the list), 1 being the next element
   * and so on.
   *
   * These offsets can also be negative numbers indicating offsets starting at the end of the list. For
   * example, -1 is the last element of the list, -2 the penultimate, and so on.
   *
   * ### Consistency with range functions in various programming languages
   * Note that if you have a list of numbers from 0 to 100, LRANGE list 0 10 will return 11 elements,
   * that is, the rightmost item is included. This may or may not be consistent with behavior of
   * range-related functions in your programming language of choice (think Ruby's Range.new, Array#slice
   * or Python's range() function).
   *
   * ### Out-of-range indexes
   * Out of range indexes will not produce an error. If start is larger than the end of the list, an empty
   * list is returned. If stop is larger than the actual end of the list, Redis will treat it like the
   * last element of the list.
   *
   * @param key The key.
   * @param start The start.
   * @param stop The stop.
   * @returns List of elements in the specified range.
   */
  public lrange(key: string, start: number, stop: number) {
    return this.command<string[]>("LRANGE", key, start, stop);
  }
  /**
   * Removes the first count occurrences of elements equal to value from the list stored at key. The count
   * argument influences the operation in the following ways:
   * - count > 0: Remove elements equal to value moving from head to tail.
   * - count < 0: Remove elements equal to value moving from tail to head.
   * - count = 0: Remove all elements equal to value.
   *
   * For example, LREM list -2 "hello" will remove the last two occurrences of "hello" in the list stored
   * at list.
   *
   * Note that non-existing keys are treated like empty lists, so when key does not exist, the command will
   * always return 0.
   *
   * @param key The key.
   * @param count The count.
   * @param value The value.
   * @returns The number of removed elements.
   */
  public lrem(key: string, count: number, value: string) {
    return this.command<number>("LREM", key, count, value);
  }
  /**
   * Sets the list element at index to value. For more information on the index argument, see LINDEX.
   *
   * An error is returned for out of range indexes.
   *
   * @param key The key.
   * @param count The count.
   * @param value The value.
   * @returns "OK".
   */
  public lset(key: string, index: number, value: string) {
    return this.command("LSET", key, index, value);
  }
  /**
   * Trim an existing list so that it will contain only the specified range of elements specified. Both
   * start and stop are zero-based indexes, where 0 is the first element of the list (the head), 1 the
   * next element and so on.
   *
   * For example: LTRIM foobar 0 2 will modify the list stored at foobar so that only the first three
   * elements of the list will remain.
   *
   * start and end can also be negative numbers indicating offsets from the end of the list, where -1
   * is the last element of the list, -2 the penultimate element and so on.
   *
   * Out of range indexes will not produce an error: if start is larger than the end of the list, or
   * start > end, the result will be an empty list (which causes key to be removed). If end is larger
   * than the end of the list, Redis will treat it like the last element of the list.
   *
   * A common use of LTRIM is together with LPUSH / RPUSH. For example:
   * ```bash
   * LPUSH mylist someelement
   * LTRIM mylist 0 99
   * ```
   *
   * This pair of commands will push a new element on the list, while making sure that the list will
   * not grow larger than 100 elements. This is very useful when using Redis to store logs for example.
   * It is important to note that when used in this way LTRIM is an O(1) operation because in the
   * average case just one element is removed from the tail of the list.
   *
   * @param key The key.
   * @param start The start.
   * @param stop The stop.
   * @returns "OK".
   */
  public ltrim(key: string, start: number, stop: number) {
    return this.command("LTRIM", key, start, stop);
  }
  /**
   * Removes and returns the last element of the list stored at key.
   * @param key The key.
   * @returns The value of the last element, or nil when key does not exist.
   */
  public rpop(key: string) {
    return this.command<string | null>("RPOP", key);
  }
  /**
   * Atomically returns and removes the last element (tail) of the list stored at source, and pushes
   * the element at the first element (head) of the list stored at destination.
   *
   * For example: consider source holding the list a,b,c, and destination holding the list x,y,z.
   * Executing RPOPLPUSH results in source holding a,b and destination holding c,x,y,z.
   *
   * If source does not exist, the value nil is returned and no operation is performed. If source and
   * destination are the same, the operation is equivalent to removing the last element from the list
   * and pushing it as first element of the list, so it can be considered as a list rotation command.
   *
   * @param source The source.
   * @param destination The destination.
   * @returns The element being popped and pushed.
   */
  public rpoplpush(source: string, destination: string) {
    return this.command<string | null>("RPOPLPUSH", source, destination);
  }
  /**
   * Insert all the specified values at the tail of the list stored at key. If key does not exist,
   * it is created as empty list before performing the push operation. When key holds a value that
   * is not a list, an error is returned.
   *
   * It is possible to push multiple elements using a single command call just specifying multiple
   * arguments at the end of the command. Elements are inserted one after the other to the tail of
   * the list, from the leftmost element to the rightmost element. So for instance the command RPUSH
   * mylist a b c will result into a list containing a as first element, b as second element and c
   * as third element.
   *
   * @param key The key.
   * @param value The value.
   * @param values The other value.
   * @returns The length of the list after the push operation.
   */
  public rpush(key: string, value: string | number, ...values: Array<string | number>) {
    return this.command<number>("RPUSH", key, value, ...values);
  }
  /**
   * Inserts value at the tail of the list stored at key, only if key already exists and holds a list.
   * In contrary to RPUSH, no operation will be performed when key does not yet exist.
   *
   * @param key The key.
   * @param value The value.
   * @returns The length of the list after the push operation.
   */
  public rpushx(key: string, value: string | number) {
    return this.command<number>("RPUSHX", key, value);
  }
  /*******************************************************************************************************
   * SET *************************************************************************************************
   *******************************************************************************************************/
  /**
   * Add the specified members to the set stored at key. Specified members that are already a member of
   * this set are ignored. If key does not exist, a new set is created before adding the specified members.
   *
   * An error is returned when the value stored at key is not a set.
   *
   * @param key The key.
   * @param member The member.
   * @param members The other member.
   * @returns The number of elements that were added to the set, not including all the elements already
   * present into the set.
   */
  public sadd(key: string, member: string | number, ...members: Array<string | number>) {
    return this.command<number>("SADD", key, member, ...members);
  }
  /**
   * Returns the set cardinality (number of elements) of the set stored at key.
   *
   * @param key The key.
   * @returns The cardinality (number of elements) of the set, or 0 if key does not exist.
   */
  public scard(key: string) {
    return this.command<number>("SCARD", key);
  }
  /**
   * Returns the members of the set resulting from the difference between the first set and all the
   * successive sets. Keys that do not exist are considered to be empty sets.
   *
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The keys.
   * @returns List with members of the resulting set.
   */
  public sdiff(key: string, anotherkey: string, ...keys: string[]) {
    return this.command<string[]>("SDIFF", key, anotherkey, ...keys);
  }
  /**
   * This command is equal to SDIFF, but instead of returning the resulting set, it is stored in destination.
   *
   * If destination already exists, it is overwritten.
   *
   * @param destination The destination.
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The keys.
   * @returns The number of elements in the resulting set.
   */
  public sdiffstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number> {
    return this.command("SDIFFSTORE", destination, key, anotherkey, ...keys);
  }
  /**
   * Returns the members of the set resulting from the intersection of all the given sets.
   *
   * Keys that do not exist are considered to be empty sets. With one of the keys being an empty set,
   * the resulting set is also empty (since set intersection with an empty set always results in an
   * empty set).
   *
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The keys.
   * @returns List with members of the resulting set.
   */
  public sinter(key: string, anotherkey: string, ...keys: string[]) {
    return this.command<string[]>("SINTER", key, anotherkey, ...keys);
  }
  /**
   * This command is equal to SINTER, but instead of returning the resulting set, it is stored in destination.
   *
   * If destination already exists, it is overwritten.
   *
   * @param destination The destination.
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The keys.
   * @returns The number of elements in the resulting set.
   */
  public sinterstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number> {
    return this.command("SINTERSTORE", destination, key, anotherkey, ...keys);
  }
  /**
   * Returns if member is a member of the set stored at key.
   *
   * @param key The key.
   * @param member The member.
   * @returns 1 if the element is a member of the set. 0 if the element is not a member of the set, or if key
   * does not exist.
   */
  public sismember(key: string, member: string | number) {
    return this.command<number>("SISMEMBER", key, member);
  }
  /**
   * Returns all the members of the set value stored at key.
   *
   * This has the same effect as running SINTER with one argument key.
   *
   * @param key The key.
   * @returns All elements of the set.
   */
  public smembers(key: string) {
    return this.command<string[]>("SMEMBERS", key);
  }
  /**
   * Move member from the set at source to the set at destination. This operation is atomic. In every given
   * moment the element will appear to be a member of source or destination for other clients.
   *
   * If the source set does not exist or does not contain the specified element, no operation is performed
   * and 0 is returned. Otherwise, the element is removed from the source set and added to the destination
   * set. When the specified element already exists in the destination set, it is only removed from the
   * source set.
   *
   * An error is returned if source or destination does not hold a set value.
   *
   * @param source The source.
   * @param destination The destination.
   * @param member The member.
   * @returns 1 if the element is moved. 0 if the element is not a member of source and no operation was
   * performed.
   */
  public smove(source: string, destination: string, member: string) {
    return this.command<number>("SMOVE", source, destination, member);
  }
  /**
   * Removes and returns one or more random elements from the set value store at key.
   * @param key The key.
   * @param count The count.
   * @returns The removed element, or nil when key does not exist.
   */
  public spop(key: string, count: number): Promise<string[]>;
  /**
   * Removes and returns one or more random elements from the set value store at key.
   * @param key The key.
   * @param count The count.
   * @returns The removed element, or nil when key does not exist.
   */
  public spop(key: string): Promise<string | null>;
  public spop(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command("SPOP", key, count);
    } else {
      return this.command("SPOP", key);
    }
  }
  /**
   * When called with just the key argument, return a random element from the set value stored at key.
   * @param key The key.
   * @param count The count.
   */
  public srandmember(key: string, count: number): Promise<string[]>;
  /**
   * When called with just the key argument, return a random element from the set value stored at key.
   * @param key The key.
   */
  public srandmember(key: string): Promise<string | null>;
  public srandmember(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command("SRANDMEMBER", key, count);
    } else {
      return this.command("SRANDMEMBER", key);
    }
  }
  /**
   * Remove the specified members from the set stored at key. Specified members that are not a member
   * of this set are ignored. If key does not exist, it is treated as an empty set and this command
   * returns 0.
   *
   * An error is returned when the value stored at key is not a set.
   *
   * @param key The key.
   * @param member The member.
   * @param members The other member.
   * @returns The number of members that were removed from the set, not including non existing members.
   */
  public srem(key: string, member: string | number, ...members: Array<string | number>) {
    return this.command<number>("SREM", key, member, ...members);
  }
  /**
   * Returns the members of the set resulting from the union of all the given sets. Keys that do not
   * exist are considered to be empty sets.
   *
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The other key.
   * @returns List with members of the resulting set.
   */
  public sunion(key: string, anotherkey: string, ...keys: string[]) {
    return this.command<string[]>("SUNION", key, anotherkey, ...keys);
  }
  /**
   * This command is equal to SUNION, but instead of returning the resulting set, it is stored in destination.
   *
   * If destination already exists, it is overwritten.
   *
   * @param destination The destination.
   * @param key The key.
   * @param anotherkey The anotherkey.
   * @param keys The keys.
   * @returns The number of elements in the resulting set.
   */
  public sunionstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ) {
    return this.command<number>("SUNIONSTORE", destination, key, anotherkey, ...keys);
  }
  /*******************************************************************************************************
   * ZSET ************************************************************************************************
   *******************************************************************************************************/
  /**
   * Adds all the specified members with the specified scores to the sorted set stored at key. It is
   * possible to specify multiple score / member pairs. If a specified member is already a member of the
   * sorted set, the score is updated and the element reinserted at the right position to ensure the
   * correct ordering.
   *
   * If key does not exist, a new sorted set with the specified members as sole members is created,
   * like if the sorted set was empty. If the key exists but does not hold a sorted set, an error
   * is returned.
   *
   * @param key The key.
   * @param objMS The objMS.
   * @param options The options.
   * @returns
   * - The number of elements added to the sorted sets, not including elements already existing for which
   * the score was updated. If the INCR option is specified, the return value will be Bulk string reply
   * - the new score of member (a double precision floating point number), represented as string.
   */
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
    },
  ): Promise<number>;
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    },
  ): Promise<string | null>;
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    } = {},
  ) {
    const array = new Array<any>();
    const { nxxx, ch, incr } = options;
    Reflect.ownKeys(objMS).forEach(member => {
      array.push(objMS[member as string], member);
    });
    if ("undefined" !== typeof nxxx) {
      if ("undefined" !== typeof ch) {
        if ("undefined" !== typeof incr) {
          return this.command("ZADD", key, nxxx, ch, incr, ...array);
        } else {
          return this.command("ZADD", key, nxxx, ch, ...array);
        }
      } else if ("undefined" !== typeof incr) {
        return this.command("ZADD", key, nxxx, incr, ...array);
      } else {
        return this.command("ZADD", key, nxxx, ...array);
      }
    } else if ("undefined" !== typeof ch) {
      if ("undefined" !== typeof incr) {
        return this.command("ZADD", key, ch, incr, ...array);
      } else {
        return this.command("ZADD", key, ch, ...array);
      }
    } else if ("undefined" !== typeof incr) {
      return this.command("ZADD", key, incr, ...array);
    } else {
      return this.command("ZADD", key, ...array);
    }
  }
  /**
   * Returns the sorted set cardinality (number of elements) of the sorted set stored at key.
   *
   * @param key The key.
   * @returns The cardinality (number of elements) of the sorted set, or 0 if key does not exist.
   */
  public zcard(key: string) {
    return this.command<number>("ZCARD", key);
  }
  /**
   * Returns the number of elements in the sorted set at key with a score between min and max.
   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @returns The number of elements in the specified score range.
   */
  public zcount(key: string, min: string, max: string) {
    return this.command<number>("ZCOUNT", key, min, max);
  }
  /**
   * Increments the score of member in the sorted set stored at key by increment. If member does not
   * exist in the sorted set, it is added with increment as its score (as if its previous score was
   * 0.0). If key does not exist, a new sorted set with the specified member as its sole member is
   * created.
   *
   * An error is returned when key exists but does not hold a sorted set.
   *
   * The score value should be the string representation of a numeric value, and accepts double
   * precision floating point numbers. It is possible to provide a negative value to decrement
   * the score.
   *
   * @param key The key.
   * @param increment The increment.
   * @param member The member.
   * @returns The new score of member (a double precision floating point number), represented as string.
   */
  public zincrby(key: string, increment: number, member: string) {
    return this.command<string>("ZINCRBY", key, increment, member);
  }
  /**
   * Computes the intersection of numkeys sorted sets given by the specified keys, and stores the result
   * in destination. It is mandatory to provide the number of input keys (numkeys) before passing the
   * input keys and the other (optional) arguments.
   *
   * By default, the resulting score of an element is the sum of its scores in the sorted sets where it
   * exists. Because intersection requires an element to be a member of every given sorted set, this
   * results in the score of every element in the resulting sorted set to be equal to the number of
   * input sorted sets.
   *
   * If destination already exists, it is overwritten.
   *
   * @param destination The destination.
   * @param objectKW The objectKW.
   * @param aggregate The aggregate.
   * @returns The number of elements in the resulting sorted set at destination.
   */
  public zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX" = "SUM",
  ) {
    const keys: any[] = [];
    const weights: any[] = [];
    Reflect.ownKeys(objectKW).forEach(key => {
      keys.push(key);
      weights.push(objectKW[key as string]);
    });
    return this.command<number>(
      "ZINTERSTORE",
      destination,
      keys.length,
      ...keys,
      "WEIGHTS",
      ...weights,
      "AGGREGATE",
      aggregate,
    );
  }
  /**
   * this command returns the number of elements in the sorted set at key with a value between min and max.
#

   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @returns The number of elements in the specified score range.
   */
  public zlexcount(key: string, min: string, max: string) {
    return this.command<number>("ZLEXCOUNT", key, min, max);
  }
  public zrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
  ): Promise<{ [propName: string]: string }>;
  public async zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES",
  ) {
    if ("WITHSCORES" === withscores) {
      return Array2Object(
        await this.command<string[]>("ZRANGE", key, start, stop, "WITHSCORES"),
      );
    }
    return this.command("ZRANGE", key, start, stop);
  }
  /**
   * When all the elements in a sorted set are inserted with the same score, in order to force
   * lexicographical ordering, this command returns all the elements in the sorted set at key
   * with a value between min and max.
   *
   * If the elements in the sorted set have different scores, the returned elements are unspecified.
   *
   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @param options The options.
   * @returns List of elements in the specified score range.
   */
  public zrangebylex(
    key: string,
    min: string,
    max: string,
    options?: {
      offset: number;
      count: number;
    },
  ) {
    if ("object" === typeof options) {
      return this.command<string[]>(
        "ZRANGEBYLEX",
        key,
        min,
        max,
        "LIMIT",
        options.offset,
        options.count,
      );
    }
    return this.command<string[]>("ZRANGEBYLEX", key, min, max);
  }
  /**
   * Returns all the elements in the sorted set at key with a score between min and max (including elements
   * with score equal to min or max). The elements are considered to be ordered from low to high scores.
   *
   * The elements having the same score are returned in lexicographical order (this follows from a property
   * of the sorted set implementation in Redis and does not involve further computation).
   *
   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @param options The options.
   * @returns List of elements in the specified score range (optionally with their scores).
   */
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
    },
  ): Promise<string[]>;
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores: "WITHSCORES";
    },
  ): Promise<{ [propName: string]: string }>;
  public async zrangebyscore(
    key: string,
    min: string,
    max: string,
    options: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    } = {},
  ) {
    if ("object" === typeof options.limit) {
      const { offset, count } = options.limit;
      if ("WITHSCORES" === options.withscores) {
        return Array2Object(
          await this.command<string[]>(
            "ZRANGEBYSCORE",
            key,
            min,
            max,
            "WITHSCORES",
            "LIMIT",
            offset,
            count,
          ),
        );
      } else {
        return this.command("ZRANGEBYSCORE", key, min, max, "LIMIT", offset, count);
      }
    } else if ("WITHSCORES" === options.withscores) {
      return Array2Object(
        await this.command<string[]>("ZRANGEBYSCORE", key, min, max, "WITHSCORES"),
      );
    } else {
      return this.command("ZRANGEBYSCORE", key, min, max);
    }
  }
  /**
   * Returns the rank of member in the sorted set stored at key, with the scores ordered from low
   * to high. The rank (or index) is 0-based, which means that the member with the lowest score
   * has rank 0.
   *
   * @param key The key.
   * @param member The member.
   * @returns
   * - If member exists in the sorted set, Integer reply: the rank of member.
   * - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
   */
  public zrank(key: string, member: string) {
    return this.command<number | null>("ZRANK", key, member);
  }
  /**
   * Removes the specified members from the sorted set stored at key. Non existing members are ignored.
   *
   * An error is returned when key exists and does not hold a sorted set.
   *
   * @param key The key.
   * @param member The member.
   * @param members The other member.
   * @returns The number of members removed from the sorted set, not including non existing members.
   */
  public zrem(key: string, member: string, ...members: string[]) {
    return this.command<number>("ZREM", key, member, ...members);
  }
  /**
   * This command removes all elements in the sorted set stored at key between the lexicographical
   * range specified by min and max.
   *
   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @returns The number of elements removed.
   */
  public zremrangebylex(key: string, min: string, max: string) {
    return this.command<number>("ZREMRANGEBYLEX", key, min, max);
  }
  /**
   * Removes all elements in the sorted set stored at key with rank between start and stop. Both start
   * and stop are 0 -based indexes with 0 being the element with the lowest score. These indexes can be
   * negative numbers, where they indicate offsets starting at the element with the highest score. For
   * example: -1 is the element with the highest score, -2 the element with the second highest score
   * and so forth.
   *
   * @param key The key.
   * @param start The start.
   * @param stop The stop.
   * @returns The number of elements removed.
   */
  public zremrangebyrank(key: string, start: number, stop: number) {
    return this.command("ZREMRANGEBYRANK", key, start, stop);
  }
  /**
   * Removes all elements in the sorted set stored at key with a score between min and max (inclusive).
   *
   * Since version 2.1.6, min and max can be exclusive
   *
   * @param key The key.
   * @param min The min.
   * @param max The max.
   * @returns The number of elements removed.
   */
  public zremrangebyscore(key: string, min: string, max: string) {
    return this.command("ZREMRANGEBYSCORE", key, min, max);
  }
  /**
   * Returns the specified range of elements in the sorted set stored at key. The elements are considered
   * to be ordered from the highest to the lowest score. Descending lexicographical order is used for
   * elements with equal score.
   *
   * @param key The key.
   * @param start The start.
   * @param stop The stop.
   * @returns List of elements in the specified range (optionally with their scores).
   */
  public zrevrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES",
  ): Promise<{ [propName: string]: string }>;
  public async zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES",
  ) {
    if ("WITHSCORES" === withscores) {
      return Array2Object(
        await this.command<string[]>("ZREVRANGE", key, start, stop, "WITHSCORES"),
      );
    } else {
      return this.command("ZREVRANGE", key, start, stop);
    }
  }
  /**
   * Returns all the elements in the sorted set at key with a score between max and min (including elements
   * with score equal to max or min). In contrary to the default ordering of sorted sets, for this command
   * the elements are considered to be ordered from high to low scores.
   *
   * The elements having the same score are returned in reverse lexicographical order.
   *
   * @param key The key.
   * @param max The max.
   * @param min The min.
   * @param options The options.
   * @returns list of elements in the specified score range (optionally with their scores).
   */
  public zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
    },
  ): Promise<string[]>;
  public zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores: "WITHSCORES";
    },
  ): Promise<{ [propName: string]: string }>;
  public async zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    } = {},
  ) {
    if ("object" === typeof options.limit) {
      const { offset, count } = options.limit;
      if ("WITHSCORES" === options.withscores) {
        return Array2Object(
          await this.command<string[]>(
            "ZREVRANGEBYSCORE",
            key,
            max,
            min,
            "WITHSCORES",
            "LIMIT",
            offset,
            count,
          ),
        );
      } else {
        return this.command("ZREVRANGEBYSCORE", key, max, min, "LIMIT", offset, count);
      }
    } else if ("WITHSCORES" === options.withscores) {
      return Array2Object(
        await this.command<string[]>("ZREVRANGEBYSCORE", key, max, min, "WITHSCORES"),
      );
    } else {
      return this.command("ZREVRANGEBYSCORE", key, max, min);
    }
  }
  /**
   * Returns the rank of member in the sorted set stored at key, with the scores ordered from high to low.
   * The rank (or index) is 0-based, which means that the member with the highest score has rank 0.
   * @param key The key.
   * @param member The member.
   * @returns
   * - If member exists in the sorted set, Integer reply: the rank of member.
   * - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
   */
  public zrevrank(key: string, member: string) {
    return this.command<number | null>("ZREVRANK", key, member);
  }
  /**
   * Returns the score of member in the sorted set at key.
   *
   * If member does not exist in the sorted set, or key does not exist, nil is returned.
   *
   * @param key The key.
   * @param member The member.
   * @returns The score of member (a double precision floating point number), represented as string.
   */
  public zscore(key: string, member: string) {
    return this.command<string | null>("ZSCORE", key, member);
  }
  /**
   * Computes the union of numkeys sorted sets given by the specified keys, and stores the result in
   * destination. It is mandatory to provide the number of input keys (numkeys) before passing the
   * input keys and the other (optional) arguments.
   *
   * By default, the resulting score of an element is the sum of its scores in the sorted sets where
   * it exists.
   *
   * @param destination The destination.
   * @param objectKW The objectKW.
   * @param aggregate The aggregate.
   * @returns The number of elements in the resulting sorted set at destination.
   */
  public zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX" = "SUM",
  ) {
    const keys: string[] = [];
    const weights: number[] = [];
    Reflect.ownKeys(objectKW).forEach(key => {
      keys.push(key as string);
      weights.push(objectKW[key as string]);
    });
    return this.command(
      "ZUNIONSTORE",
      destination,
      keys.length,
      ...keys,
      "WEIGHTS",
      ...weights,
      "AGGREGATE",
      aggregate,
    );
  }
}
