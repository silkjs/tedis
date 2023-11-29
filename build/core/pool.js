"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tedis_1 = require("./tedis");
var TedisPool = /** @class */ (function () {
    function TedisPool(options) {
        if (options === void 0) { options = {}; }
        this.connection_pool = [];
        this.cushion_list = [];
        this.min_conn = options.min_conn || 1;
        this.max_conn = options.max_conn || 10;
        this.act_conn = 0;
        this.host = options.host || "127.0.0.1";
        this.port = options.port || 6379;
        this.password = options.password;
        this.timeout = options.timeout;
    }
    TedisPool.prototype.release = function () {
        this.connection_pool.forEach(function (conn) {
            conn.close();
        });
    };
    TedisPool.prototype.getTedis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conn = this.connection_pool.shift();
                        if (!("undefined" !== typeof conn)) return [3 /*break*/, 1];
                        return [2 /*return*/, conn];
                    case 1:
                        if (!(this.act_conn < this.max_conn)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.newConnection()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var timer = setTimeout(function () {
                                _this.cushion_list.shift();
                                reject("timeout, the connection pool is full");
                            }, 1000 * 20);
                            _this.cushion_list.push(function (res) {
                                clearTimeout(timer);
                                _this.cushion_list.shift();
                                resolve(res);
                            });
                        })];
                }
            });
        });
    };
    TedisPool.prototype.putTedis = function (conn) {
        var callback = this.cushion_list.shift();
        if ("undefined" !== typeof callback) {
            callback(conn);
        }
        else {
            this.connection_pool.push(conn);
        }
    };
    TedisPool.prototype.newConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.act_conn++;
            var conn = new tedis_1.Tedis({
                host: _this.host,
                port: _this.port,
                password: _this.password,
                timeout: _this.timeout,
            });
            conn.on("connect", function () {
                conn.on("error", function (err) {
                    console.log(err);
                });
                conn.on("close", function (had_error) {
                    _this.closeConnection(conn);
                });
                conn.on("timeout", function () {
                    _this.miniConnection(conn);
                });
                resolve(conn);
            });
            conn.on("error", function (err) {
                _this.act_conn--;
                reject(err);
            });
        });
    };
    TedisPool.prototype.closeConnection = function (conn) {
        var index = this.connection_pool.findIndex(function (item) {
            return item.id === conn.id;
        });
        if (-1 !== index) {
            this.connection_pool.splice(index, 1);
        }
        this.act_conn--;
    };
    TedisPool.prototype.miniConnection = function (conn) {
        if (this.min_conn < this.act_conn) {
            conn.close();
        }
    };
    return TedisPool;
}());
exports.TedisPool = TedisPool;
//# sourceMappingURL=pool.js.map