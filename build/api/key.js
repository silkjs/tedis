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
var MethodKey;
(function (MethodKey) {
    MethodKey["del"] = "DEL";
    MethodKey["dump"] = "DUMP";
    MethodKey["exists"] = "EXISTS";
    MethodKey["expire"] = "EXPIRE";
    MethodKey["expireat"] = "EXPIREAT";
    MethodKey["pexpire"] = "PEXPIRE";
    MethodKey["pexpireat"] = "PEXPIREAT";
    MethodKey["keys"] = "KEYS";
    MethodKey["move"] = "MOVE";
    MethodKey["persist"] = "PERSIST";
    MethodKey["pttl"] = "PTTL";
    MethodKey["ttl"] = "TTL";
    MethodKey["randomkey"] = "RANDOMKEY";
    MethodKey["rename"] = "RENAME";
    MethodKey["renamenx"] = "RENAMENX";
    MethodKey["type"] = "TYPE";
})(MethodKey || (MethodKey = {}));
var RedisKey = /** @class */ (function (_super) {
    __extends(RedisKey, _super);
    function RedisKey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisKey.prototype.del = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodKey.del, key], keys))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    // public async dump(key: string) {
    //   return (await this.command(MethodKey.dump, key)) as string | null;
    // }
    RedisKey.prototype.exists = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodKey.exists, key], keys))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.expire = function (key, seconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.expire, key, seconds)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.expireat = function (key, timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.expireat, key, timestamp)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.keys = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.keys, pattern)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.move = function (key, db) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.move, key, db)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.persist = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.persist, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.pexpire = function (key, milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.pexpire, key, milliseconds)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.pexpireat = function (key, millisecondsTimestamp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.pexpireat, key, millisecondsTimestamp)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.pttl = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.pttl, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.randomkey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.randomkey)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.rename = function (key, newKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.rename, key, newKey)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.renamenx = function (key, newKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.renamenx, key, newKey)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.ttl = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.ttl, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisKey.prototype.type = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodKey.type, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    return RedisKey;
}(base_1.Base));
exports.RedisKey = RedisKey;
//# sourceMappingURL=key.js.map