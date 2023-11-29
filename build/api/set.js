"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../core/base");
var MethodSet;
(function (MethodSet) {
    MethodSet["sadd"] = "SADD";
    MethodSet["scard"] = "SCARD";
    MethodSet["sdiff"] = "SDIFF";
    MethodSet["sdiffstore"] = "SDIFFSTORE";
    MethodSet["sinter"] = "SINTER";
    MethodSet["sinterstore"] = "SINTERSTORE";
    MethodSet["sismember"] = "SISMEMBER";
    MethodSet["smembers"] = "SMEMBERS";
    MethodSet["smove"] = "SMOVE";
    MethodSet["spop"] = "SPOP";
    MethodSet["srandmember"] = "SRANDMEMBER";
    MethodSet["srem"] = "SREM";
    MethodSet["sscan"] = "SSCAN";
    MethodSet["sunion"] = "SUNION";
    MethodSet["sunionstore"] = "SUNIONSTORE";
})(MethodSet || (MethodSet = {}));
var RedisSet = /** @class */ (function (_super) {
    __extends(RedisSet, _super);
    function RedisSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisSet.prototype.sadd = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sadd, key, member], members));
    };
    RedisSet.prototype.scard = function (key) {
        return this.command(MethodSet.scard, key);
    };
    RedisSet.prototype.sdiff = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sdiff, key, anotherkey], keys));
    };
    RedisSet.prototype.sdiffstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sdiffstore,
            destination,
            key,
            anotherkey], keys));
    };
    RedisSet.prototype.sinter = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sinter, key, anotherkey], keys));
    };
    RedisSet.prototype.sinterstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sinterstore,
            destination,
            key,
            anotherkey], keys));
    };
    RedisSet.prototype.sismember = function (key, member) {
        return this.command(MethodSet.sismember, key, member);
    };
    RedisSet.prototype.smembers = function (key) {
        return this.command(MethodSet.smembers, key);
    };
    RedisSet.prototype.smove = function (source, destination, member) {
        return this.command(MethodSet.smove, source, destination, member);
    };
    RedisSet.prototype.spop = function (key, count) {
        if (typeof count === "number") {
            return this.command(MethodSet.spop, key, count);
        }
        else {
            return this.command(MethodSet.spop, key);
        }
    };
    RedisSet.prototype.srandmember = function (key, count) {
        if (typeof count === "number") {
            return this.command(MethodSet.srandmember, key, count);
        }
        else {
            return this.command(MethodSet.srandmember, key);
        }
    };
    RedisSet.prototype.srem = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.srem, key, member], members));
    };
    RedisSet.prototype.sunion = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sunion, key, anotherkey], keys));
    };
    RedisSet.prototype.sunionstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodSet.sunionstore, destination, key, anotherkey], keys));
    };
    return RedisSet;
}(base_1.Base));
exports.RedisSet = RedisSet;
//# sourceMappingURL=set.js.map