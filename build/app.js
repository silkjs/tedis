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
var protocol_1 = require("./core/protocol");
var main_1 = require("./main");
var client = new main_1.Tedis({
    port: 6379,
    host: "127.0.0.1",
    password: "redis",
});
setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
    var protocol, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                protocol = new protocol_1.Protocol();
                protocol.write(Buffer.from("$9\r\nhello\r\nworld\r\n"));
                protocol.parse();
                console.log(protocol.data);
                return [4 /*yield*/, client.command("INFO", "STATS")];
            case 1:
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.command("FLUSHDB")];
            case 2:
                /**
                 * base
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.command("SET", "key1", "Hello")];
            case 3:
                // "OK"
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.command("SET", "key2", "World")];
            case 4:
                // "OK"
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.keys("*")];
            case 5:
                // "OK"
                /**
                 * key
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.del("key1")];
            case 6:
                // ["key2","key1"];
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.set("mystring", "hello")];
            case 7:
                // 1
                /**
                 * string
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.get("mystring")];
            case 8:
                // "OK"
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.hmset("myhash", {
                        name: "tedis",
                        age: 18,
                    })];
            case 9:
                // "hello"
                /**
                 * hash
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.hgetall("myhash")];
            case 10:
                // "OK"
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.lpush("mylist", "hello", "a", "b", "c", "d", 1, 2, 3, 4)];
            case 11:
                // {
                //   "name": "tedis",
                //   "age": "18"
                // }
                /**
                 * list
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.llen("mylist")];
            case 12:
                // 9
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.sadd("myset", "hello")];
            case 13:
                // 9
                /**
                 * set
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.sadd("myset", "tedis")];
            case 14:
                // 1
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.scard("myset")];
            case 15:
                // 1
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.zadd("myzset", {
                        one: 1,
                        two: 2,
                        three: 3,
                    })];
            case 16:
                // 2
                /**
                 * zset
                 */
                res = _a.sent();
                console.log(res);
                return [4 /*yield*/, client.zcard("myzset")];
            case 17:
                // 3
                res = _a.sent();
                console.log(res);
                // 3
                // close
                client.close();
                return [2 /*return*/];
        }
    });
}); }, 3000);
//# sourceMappingURL=app.js.map