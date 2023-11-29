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
exports.RedisList = void 0;
var base_1 = require("../core/base");
var MethodList;
(function (MethodList) {
    MethodList["blpop"] = "BLPOP";
    MethodList["brpop"] = "BRPOP";
    MethodList["brpoplpush"] = "BRPOPLPUSH";
    MethodList["lindex"] = "LINDEX";
    MethodList["linsert"] = "LINSERT";
    MethodList["llen"] = "LLEN";
    MethodList["lpop"] = "LPOP";
    MethodList["lpush"] = "LPUSH";
    MethodList["lpushx"] = "LPUSHX";
    MethodList["lrange"] = "LRANGE";
    MethodList["lrem"] = "LREM";
    MethodList["lset"] = "LSET";
    MethodList["ltrim"] = "LTRIM";
    MethodList["rpop"] = "RPOP";
    MethodList["rpoplpush"] = "RPOPLPUSH";
    MethodList["rpush"] = "RPUSH";
    MethodList["rpushx"] = "RPUSHX";
})(MethodList || (MethodList = {}));
var RedisList = /** @class */ (function (_super) {
    __extends(RedisList, _super);
    function RedisList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisList.prototype.blpop = function (timeout) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(__spreadArray([MethodList.blpop], __read(keys), false), [timeout], false));
    };
    RedisList.prototype.brpop = function (timeout) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray(__spreadArray([MethodList.brpop], __read(keys), false), [timeout], false));
    };
    RedisList.prototype.brpoplpush = function (source, destination, timeout) {
        return this.command(MethodList.brpoplpush, source, destination, timeout);
    };
    RedisList.prototype.lindex = function (key, index) {
        return this.command(MethodList.lindex, key, index);
    };
    RedisList.prototype.linsert = function (key, type, pivot, value) {
        return this.command(MethodList.linsert, key, type, pivot, value);
    };
    RedisList.prototype.llen = function (key) {
        return this.command(MethodList.llen, key);
    };
    RedisList.prototype.lpop = function (key) {
        return this.command(MethodList.lpop, key);
    };
    RedisList.prototype.lpush = function (key, value) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodList.lpush, key, value], __read(values), false));
    };
    RedisList.prototype.lpushx = function (key, value) {
        return this.command(MethodList.lpushx, key, value);
    };
    RedisList.prototype.lrange = function (key, start, stop) {
        return this.command(MethodList.lrange, key, start, stop);
    };
    RedisList.prototype.lrem = function (key, count, value) {
        return this.command(MethodList.lrem, key, count, value);
    };
    RedisList.prototype.lset = function (key, index, value) {
        return this.command(MethodList.lset, key, index, value);
    };
    RedisList.prototype.ltrim = function (key, start, stop) {
        return this.command(MethodList.ltrim, key, start, stop);
    };
    RedisList.prototype.rpop = function (key) {
        return this.command(MethodList.rpop, key);
    };
    RedisList.prototype.rpoplpush = function (source, destination) {
        return this.command(MethodList.rpoplpush, source, destination);
    };
    RedisList.prototype.rpush = function (key, value) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodList.rpush, key, value], __read(values), false));
    };
    RedisList.prototype.rpushx = function (key, value) {
        return this.command(MethodList.rpushx, key, value);
    };
    return RedisList;
}(base_1.Base));
exports.RedisList = RedisList;
