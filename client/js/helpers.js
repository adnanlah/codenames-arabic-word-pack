export function debounce(fn, delay) {
    var timeoutID = null;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(function () { return fn.apply(_this, args); }, delay);
    };
}
