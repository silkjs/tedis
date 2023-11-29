"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSet = void 0;
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
        return this.command.apply(this, __spreadArray([MethodSet.sadd, key, member], __read(members), false));
    };
    RedisSet.prototype.scard = function (key) {
        return this.command(MethodSet.scard, key);
    };
    RedisSet.prototype.sdiff = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sdiff, key, anotherkey], __read(keys), false));
    };
    RedisSet.prototype.sdiffstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sdiffstore,
            destination,
            key,
            anotherkey], __read(keys), false));
    };
    RedisSet.prototype.sinter = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sinter, key, anotherkey], __read(keys), false));
    };
    RedisSet.prototype.sinterstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sinterstore,
            destination,
            key,
            anotherkey], __read(keys), false));
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
        return this.command.apply(this, __spreadArray([MethodSet.srem, key, member], __read(members), false));
    };
    RedisSet.prototype.sunion = function (key, anotherkey) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sunion, key, anotherkey], __read(keys), false));
    };
    RedisSet.prototype.sunionstore = function (destination, key, anotherkey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodSet.sunionstore, destination, key, anotherkey], __read(keys), false));
    };
    return RedisSet;
}(base_1.Base));
exports.RedisSet = RedisSet;
