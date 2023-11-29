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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.RedisZset = void 0;
var base_1 = require("../core/base");
var tools_1 = require("../util/tools");
var MethodZset;
(function (MethodZset) {
    // bzpopmax
    // bzpopmin
    MethodZset["zadd"] = "ZADD";
    MethodZset["zcard"] = "ZCARD";
    MethodZset["zcount"] = "ZCOUNT";
    MethodZset["zincrby"] = "ZINCRBY";
    MethodZset["zinterstore"] = "ZINTERSTORE";
    MethodZset["zlexcount"] = "ZLEXCOUNT";
    // zpopmax
    // zpopmin
    MethodZset["zrange"] = "ZRANGE";
    MethodZset["zrangebylex"] = "ZRANGEBYLEX";
    MethodZset["zrangebyscore"] = "ZRANGEBYSCORE";
    MethodZset["zrank"] = "ZRANK";
    MethodZset["zrem"] = "ZREM";
    MethodZset["zremrangebylex"] = "ZREMRANGEBYLEX";
    MethodZset["zremrangebyrank"] = "ZREMRANGEBYRANK";
    MethodZset["zremrangebyscore"] = "ZREMRANGEBYSCORE";
    MethodZset["zrevrange"] = "ZREVRANGE";
    // zrevrangebylex
    MethodZset["zrevrangebyscore"] = "ZREVRANGEBYSCORE";
    MethodZset["zrevrank"] = "ZREVRANK";
    // zscan
    MethodZset["zscore"] = "ZSCORE";
    MethodZset["zunionstore"] = "ZUNIONSTORE";
})(MethodZset || (MethodZset = {}));
var RedisZset = /** @class */ (function (_super) {
    __extends(RedisZset, _super);
    function RedisZset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisZset.prototype.zadd = function (key, objMS, options) {
        if (options === void 0) { options = {}; }
        var array = new Array();
        var nxxx = options.nxxx, ch = options.ch, incr = options.incr;
        Reflect.ownKeys(objMS).forEach(function (member) {
            array.push(objMS[member], member);
        });
        if ("undefined" !== typeof nxxx) {
            if ("undefined" !== typeof ch) {
                if ("undefined" !== typeof incr) {
                    return this.command.apply(this, __spreadArray([MethodZset.zadd, key, nxxx, ch, incr], __read(array), false));
                }
                else {
                    return this.command.apply(this, __spreadArray([MethodZset.zadd, key, nxxx, ch], __read(array), false));
                }
            }
            else if ("undefined" !== typeof incr) {
                return this.command.apply(this, __spreadArray([MethodZset.zadd, key, nxxx, incr], __read(array), false));
            }
            else {
                return this.command.apply(this, __spreadArray([MethodZset.zadd, key, nxxx], __read(array), false));
            }
        }
        else if ("undefined" !== typeof ch) {
            if ("undefined" !== typeof incr) {
                return this.command.apply(this, __spreadArray([MethodZset.zadd, key, ch, incr], __read(array), false));
            }
            else {
                return this.command.apply(this, __spreadArray([MethodZset.zadd, key, ch], __read(array), false));
            }
        }
        else if ("undefined" !== typeof incr) {
            return this.command.apply(this, __spreadArray([MethodZset.zadd, key, incr], __read(array), false));
        }
        else {
            return this.command.apply(this, __spreadArray([MethodZset.zadd, key], __read(array), false));
        }
    };
    RedisZset.prototype.zcard = function (key) {
        return this.command(MethodZset.zcard, key);
    };
    RedisZset.prototype.zcount = function (key, min, max) {
        return this.command(MethodZset.zcount, key, min, max);
    };
    RedisZset.prototype.zincrby = function (key, increment, member) {
        return this.command(MethodZset.zincrby, key, increment, member);
    };
    RedisZset.prototype.zinterstore = function (destination, objectKW, aggregate) {
        if (aggregate === void 0) { aggregate = "SUM"; }
        var keys = new Array();
        var weights = new Array();
        Reflect.ownKeys(objectKW).forEach(function (key) {
            keys.push(key);
            weights.push(objectKW[key]);
        });
        return this.command.apply(this, __spreadArray(__spreadArray(__spreadArray(__spreadArray([MethodZset.zinterstore,
            destination,
            keys.length], __read(keys), false), ["WEIGHTS"], false), __read(weights), false), ["AGGREGATE",
            aggregate], false));
    };
    RedisZset.prototype.zlexcount = function (key, min, max) {
        return this.command(MethodZset.zlexcount, key, min, max);
    };
    RedisZset.prototype.zrange = function (key, start, stop, withscores) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("WITHSCORES" === withscores)) return [3 /*break*/, 2];
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrange, key, start, stop, "WITHSCORES")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, this.command(MethodZset.zrange, key, start, stop)];
                }
            });
        });
    };
    RedisZset.prototype.zrangebylex = function (key, min, max, options) {
        if ("object" === typeof options) {
            return this.command(MethodZset.zrangebylex, key, min, max, "LIMIT", options.offset, options.count);
        }
        return this.command(MethodZset.zrangebylex, key, min, max);
    };
    RedisZset.prototype.zrangebyscore = function (key, min, max, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, offset, count, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!("object" === typeof options.limit)) return [3 /*break*/, 4];
                        _a = options.limit, offset = _a.offset, count = _a.count;
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 2];
                        _b = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrangebyscore, key, min, max, "WITHSCORES", "LIMIT", offset, count)];
                    case 1: return [2 /*return*/, _b.apply(void 0, [_d.sent()])];
                    case 2: return [2 /*return*/, this.command(MethodZset.zrangebyscore, key, min, max, "LIMIT", offset, count)];
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 6];
                        _c = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrangebyscore, key, min, max, "WITHSCORES")];
                    case 5: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    case 6: return [2 /*return*/, this.command(MethodZset.zrangebyscore, key, min, max)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RedisZset.prototype.zrank = function (key, member) {
        return this.command(MethodZset.zrank, key, member);
    };
    RedisZset.prototype.zrem = function (key, member) {
        var members = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            members[_i - 2] = arguments[_i];
        }
        return this.command.apply(this, __spreadArray([MethodZset.zrem, key, member], __read(members), false));
    };
    RedisZset.prototype.zremrangebylex = function (key, min, max) {
        return this.command(MethodZset.zremrangebylex, key, min, max);
    };
    RedisZset.prototype.zremrangebyrank = function (key, start, stop) {
        return this.command(MethodZset.zremrangebyrank, key, start, stop);
    };
    RedisZset.prototype.zremrangebyscore = function (key, min, max) {
        return this.command(MethodZset.zremrangebyscore, key, min, max);
    };
    RedisZset.prototype.zrevrange = function (key, start, stop, withscores) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("WITHSCORES" === withscores)) return [3 /*break*/, 2];
                        _a = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrevrange, key, start, stop, "WITHSCORES")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, this.command(MethodZset.zrevrange, key, start, stop)];
                }
            });
        });
    };
    RedisZset.prototype.zrevrangebyscore = function (key, max, min, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, offset, count, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!("object" === typeof options.limit)) return [3 /*break*/, 4];
                        _a = options.limit, offset = _a.offset, count = _a.count;
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 2];
                        _b = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrevrangebyscore, key, max, min, "WITHSCORES", "LIMIT", offset, count)];
                    case 1: return [2 /*return*/, _b.apply(void 0, [_d.sent()])];
                    case 2: return [2 /*return*/, this.command(MethodZset.zrevrangebyscore, key, max, min, "LIMIT", offset, count)];
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!("WITHSCORES" === options.withscores)) return [3 /*break*/, 6];
                        _c = tools_1.Array2Object;
                        return [4 /*yield*/, this.command(MethodZset.zrevrangebyscore, key, max, min, "WITHSCORES")];
                    case 5: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    case 6: return [2 /*return*/, this.command(MethodZset.zrevrangebyscore, key, max, min)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RedisZset.prototype.zrevrank = function (key, member) {
        return this.command(MethodZset.zrevrank, key, member);
    };
    RedisZset.prototype.zscore = function (key, member) {
        return this.command(MethodZset.zscore, key, member);
    };
    RedisZset.prototype.zunionstore = function (destination, objectKW, aggregate) {
        if (aggregate === void 0) { aggregate = "SUM"; }
        var keys = new Array();
        var weights = new Array();
        Reflect.ownKeys(objectKW).forEach(function (key) {
            keys.push(key);
            weights.push(objectKW[key]);
        });
        return this.command.apply(this, __spreadArray(__spreadArray(__spreadArray(__spreadArray([MethodZset.zunionstore,
            destination,
            keys.length], __read(keys), false), ["WEIGHTS"], false), __read(weights), false), ["AGGREGATE",
            aggregate], false));
    };
    return RedisZset;
}(base_1.Base));
exports.RedisZset = RedisZset;
