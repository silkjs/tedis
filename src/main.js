"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TedisPool = exports.Tedis = void 0;
// core
var tedis_1 = require("./core/tedis");
Object.defineProperty(exports, "Tedis", { enumerable: true, get: function () { return tedis_1.Tedis; } });
var pool_1 = require("./core/pool");
Object.defineProperty(exports, "TedisPool", { enumerable: true, get: function () { return pool_1.TedisPool; } });
