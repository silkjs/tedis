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
exports.Array2Object = exports.Mixins = void 0;
function Mixins(base, froms) {
    var Mixin = /** @class */ (function (_super) {
        __extends(Mixin, _super);
        function Mixin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Mixin;
    }(base));
    froms.forEach(function (from) {
        Reflect.ownKeys(from.prototype).forEach(function (name) {
            Mixin.prototype[name] = from.prototype[name];
        });
    });
    return Mixin;
}
exports.Mixins = Mixins;
function Array2Object(array) {
    var obj = {};
    for (var i = 0, len = array.length; i < len; i++) {
        obj[array[i]] = array[++i];
    }
    return obj;
}
exports.Array2Object = Array2Object;
