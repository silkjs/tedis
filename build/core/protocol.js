"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocol = void 0;
var Protocol = /** @class */ (function () {
    function Protocol() {
        this._result = [];
        this._end = "";
        this.data = {
            state: true,
            res: {
                error: false,
                data: null,
            },
        };
    }
    Protocol.prototype.write = function (data) {
        var array = (this._end + data.toString()).split("\r\n");
        this._end = array.pop();
        this._result = this._result.concat(array);
    };
    Protocol.prototype.parse = function () {
        this.data = {
            state: true,
            res: {
                error: false,
                data: null,
            },
        };
        if (this._result.length < 1 ||
            (this._result.length === 1 && this._end.length !== 0)) {
            this.data.state = false;
        }
        else {
            var current = this._result[0];
            switch (current.charAt(0)) {
                case "+":
                    this.data.res = {
                        error: false,
                        data: current.slice(1),
                    };
                    this._result.shift();
                    break;
                case "-":
                    this.data.res = {
                        error: true,
                        data: current.slice(1),
                    };
                    this._result.shift();
                    break;
                case ":":
                    this.data.res = {
                        error: false,
                        data: +current.slice(1),
                    };
                    this._result.shift();
                    break;
                case "$":
                    var size = parseInt(current.slice(1), 10);
                    this._result.shift();
                    if (-1 === size) {
                        this.data.res = {
                            error: false,
                            data: null,
                        };
                    }
                    else {
                        var res = this._result.shift();
                        if (res === undefined) {
                            this.data.res = {
                                error: true,
                                data: res,
                            };
                            break;
                        }
                        var ls = Buffer.byteLength(res);
                        if (ls === size) {
                            this.data.res = {
                                error: false,
                                data: res,
                            };
                        }
                        else {
                            this.data.res = {
                                error: false,
                                data: [res],
                            };
                            do {
                                var str = this._result.shift();
                                this.data.res.data.push(str);
                                ls += Buffer.byteLength(str);
                            } while (this._result.length > 0);
                        }
                    }
                    break;
                case "*":
                    var len = parseInt(current.slice(1), 10);
                    if (0 === len) {
                        this.data.res = {
                            error: false,
                            data: [],
                        };
                        this._result.shift();
                    }
                    else {
                        this.data.res.data = [];
                        var i = void 0;
                        for (i = 1; i < this._result.length && this.data.res.data.length < len; i++) {
                            if ("$-1" === this._result[i].slice(0, 3)) {
                                this.data.res.data.push(null);
                            }
                            else if (typeof this._result[i + 1] === "undefined") {
                                break;
                            }
                            else {
                                this.data.res.data.push(this._result[++i]);
                            }
                        }
                        if (this.data.res.data.length === len) {
                            this._result.splice(0, i);
                        }
                        else {
                            this.data.state = false;
                        }
                    }
                    break;
                default:
                    this.data.state = false;
            }
        }
    };
    Protocol.prototype.encode = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var length = parameters.length;
        var parameter;
        var request = "*".concat(length, "\r\n");
        for (var i = 0; i < length; i++) {
            parameter = parameters[i];
            if (typeof parameter === "string") {
                request += "$".concat(Buffer.byteLength(parameter), "\r\n").concat(parameter, "\r\n");
            }
            else if (typeof parameter === "number") {
                parameter = parameter.toString();
                request += "$".concat(Buffer.byteLength(parameter), "\r\n").concat(parameter, "\r\n");
            }
            else {
                throw new Error("encode ags err");
            }
        }
        return request;
    };
    return Protocol;
}());
exports.Protocol = Protocol;
