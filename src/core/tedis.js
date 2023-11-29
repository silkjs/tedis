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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tedis = void 0;
// api
var hash_1 = require("../api/hash");
var key_1 = require("../api/key");
var list_1 = require("../api/list");
var set_1 = require("../api/set");
var string_1 = require("../api/string");
var zset_1 = require("../api/zset");
// util
var tools_1 = require("../util/tools");
// core
var base_1 = require("./base");
var Tedis = /** @class */ (function (_super) {
    __extends(Tedis, _super);
    function Tedis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tedis;
}((0, tools_1.Mixins)(base_1.Base, [key_1.RedisKey, string_1.RedisString, hash_1.RedisHash, list_1.RedisList, set_1.RedisSet, zset_1.RedisZset])));
exports.Tedis = Tedis;
