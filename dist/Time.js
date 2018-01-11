"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Time = function () {
    function Time(time) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Time);

        this.type = type;
        if ((typeof time === "undefined" ? "undefined" : _typeof(time)) == "object") {
            this.seconds = type ? time.getSeconds() : time.seconds ? time.seconds : 0;
            this.minutes = type ? time.getMinutes() : time.minutes ? time.minutes : 0;
            this.hours = type ? time.getHours() : time.hours ? time.hours : 0;
        } else {
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }

        this.interval = null;
    }

    _createClass(Time, [{
        key: "reset",
        value: function reset(time) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if ((typeof time === "undefined" ? "undefined" : _typeof(time)) == "object") {
                this.seconds = type ? time.getSeconds() : time.seconds ? time.seconds : 0;
                this.minutes = type ? time.getMinutes() : time.minutes ? time.minutes : 0;
                this.hours = type ? time.getHours() : time.hours ? time.hours : 0;
            } else {
                this.seconds = 0;
                this.minutes = 0;
                this.hours = 0;
            }
        }
    }, {
        key: "get",
        value: function get() {
            return { hours: this.hours, minutes: this.minutes, seconds: this.seconds };
        }
    }, {
        key: "start",
        value: function start(fn) {
            var _this = this;

            var d = function d() {
                _this.seconds++;
                if (_this.seconds == 60) {
                    _this.seconds = 0;
                    _this.minutes++;
                }
                if (_this.minutes == 60) {
                    _this.minutes = 0;
                    _this.hours++;
                }
                if (typeof fn == 'function') {
                    fn({ hours: _this.hours, minutes: _this.minutes, seconds: _this.seconds });
                }
            };
            var a = function a() {
                if (typeof fn == 'function') {
                    fn({ hours: _this.hours, minutes: _this.minutes, seconds: _this.seconds });
                }
                _this.seconds--;
                if (_this.seconds == -1) {
                    _this.seconds = 59;
                    _this.minutes--;
                }
                if (_this.minutes == -1) {
                    _this.minutes = 59;
                    _this.hours--;
                }
                if (_this.hours == -1) {
                    clearInterval(_this.interval);
                    return;
                }
            };
            this.interval = setInterval(this.type ? d : a, 1000);
        }
    }, {
        key: "stop",
        value: function stop() {
            if (this.interval != null) {
                clearInterval(this.interval);
                return true;
            }
            return false;
        }
    }]);

    return Time;
}();

if (typeof exports === 'undefined') {
    window.Time = Time;
} else {
    module.exports = Time;
}