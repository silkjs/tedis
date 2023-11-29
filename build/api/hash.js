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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../core/base");
var tools_1 = require("../util/tools");
var MethodHash;
(function (MethodHash) {
    MethodHash["hdel"] = "HDEL";
    MethodHash["hexists"] = "HEXISTS";
    MethodHash["hget"] = "HGET";
    MethodHash["hgetall"] = "HGETALL";
    MethodHash["hincrby"] = "HINCRBY";
    MethodHash["hincrbyfloat"] = "HINCRBYFLOAT";
    MethodHash["hkeys"] = "HKEYS";
    MethodHash["hlen"] = "HLEN";
    MethodHash["hmget"] = "HMGET";
    MethodHash["hmset"] = "HMSET";
    MethodHash["hscan"] = "HSCAN";
    MethodHash["hset"] = "HSET";
    MethodHash["hsetnx"] = "HSETNX";
    MethodHash["hstrlen"] = "HSTRLEN";
    MethodHash["hvals"] = "HVALS";
})(MethodHash || (MethodHash = {}));
var RedisHash = /** @class */ (function (_super) {
    __extends(RedisHash, _super);
    function RedisHash() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisHash.prototype.hdel = function (key, field) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodHash.hdel, key, field], fields));
    };
    RedisHash.prototype.hexists = function (key, field) {
        return this.command(MethodHash.hexists, key, field);
    };
    RedisHash.prototype.hget = function (key, field) {
        return this.command(MethodHash.hget, key, field);
    };
    RedisHash.prototype.hgetall = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodHash.hgetall, key)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    RedisHash.prototype.hincrby = function (key, field, increment) {
        return this.command(MethodHash.hincrby, key, field, increment);
    };
    RedisHash.prototype.hincrbyfloat = function (key, field, increment) {
        return this.command(MethodHash.hincrbyfloat, key, field, increment);
    };
    RedisHash.prototype.hkeys = function (key) {
        return this.command(MethodHash.hkeys, key);
    };
    RedisHash.prototype.hlen = function (key) {
        return this.command(MethodHash.hlen, key);
    };
    RedisHash.prototype.hmget = function (key, field) {
        var fields = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArrays([MethodHash.hmget, key, field], fields));
    };
    RedisHash.prototype.hmset = function (key, hash) {
        var arrayFV = new Array();
        Reflect.ownKeys(hash).forEach(function (field) {
            arrayFV.push(field, hash[field]);
        });
        return this.command.apply(this, __spreadArrays([MethodHash.hmset, key], arrayFV));
    };
    RedisHash.prototype.hset = function (key, field, value) {
        return this.command(MethodHash.hset, key, field, value);
    };
    RedisHash.prototype.hsetnx = function (key, field, value) {
        return this.command(MethodHash.hsetnx, key, field, value);
    };
    RedisHash.prototype.hstrlen = function (key, field) {
        return this.command(MethodHash.hstrlen, key, field);
    };
    RedisHash.prototype.hvals = function (key) {
        return this.command(MethodHash.hvals, key);
    };
    return RedisHash;
}(base_1.Base));
exports.RedisHash = RedisHash;
//# sourceMappingURL=hash.js.map