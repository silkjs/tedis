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
var MethodString;
(function (MethodString) {
    MethodString["set"] = "SET";
    MethodString["get"] = "GET";
    MethodString["getrange"] = "GETRANGE";
    MethodString["getset"] = "GETSET";
    MethodString["getbit"] = "GETBIT";
    MethodString["mget"] = "MGET";
    MethodString["setbit"] = "SETBIT";
    MethodString["setex"] = "SETEX";
    MethodString["setnx"] = "SETNX";
    MethodString["setrange"] = "SETRANGE";
    MethodString["strlen"] = "STRLEN";
    MethodString["mset"] = "MSET";
    MethodString["msetnx"] = "MSETNX";
    MethodString["psetex"] = "PSETEX";
    MethodString["incr"] = "INCR";
    MethodString["incrby"] = "INCRBY";
    MethodString["incrbyfloat"] = "INCRBYFLOAT";
    MethodString["decr"] = "DECR";
    MethodString["decrby"] = "DECRBY";
    MethodString["append"] = "APPEND";
})(MethodString || (MethodString = {}));
var RedisString = /** @class */ (function (_super) {
    __extends(RedisString, _super);
    function RedisString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedisString.prototype.append = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.append, key, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.decr = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.decr, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.decrby = function (key, increment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.decrby, key, increment)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.get, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.getbit = function (key, offset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.getbit, key, offset)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.getrange = function (key, _a) {
        var _b = _a === void 0 ? [0, -1] : _a, start = _b[0], end = _b[1];
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.getrange, key, start, end)];
                    case 1: return [2 /*return*/, (_c.sent())];
                }
            });
        });
    };
    RedisString.prototype.getset = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.getset, key, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.incr = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.incr, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.incrby = function (key, increment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.incrby, key, increment)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.incrbyfloat = function (key, increment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.incrbyfloat, key, increment)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.mget = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodString.mget, key], keys))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.mset = function (objKV) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayKV;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayKV = new Array();
                        Reflect.ownKeys(objKV).forEach(function (key) {
                            arrayKV.push(key, objKV[key]);
                        });
                        return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodString.mset], arrayKV))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.msetnx = function (objKv) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayKV;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayKV = new Array();
                        Reflect.ownKeys(objKv).forEach(function (key) {
                            arrayKV.push(key, objKv[key]);
                        });
                        return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodString.msetnx], arrayKV))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.psetex = function (key, milliseconds, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.psetex, key, milliseconds, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.set, key, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.setbit = function (key, offset, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.setbit, key, offset, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.setex = function (key, seconds, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.setex, key, seconds, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.setnx = function (key) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command.apply(this, __spreadArrays([MethodString.setnx, key], keys))];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.setrange = function (key, offset, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.setrange, key, offset, value)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    RedisString.prototype.strlen = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.command(MethodString.strlen, key)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    return RedisString;
}(base_1.Base));
exports.RedisString = RedisString;
//# sourceMappingURL=string.js.map