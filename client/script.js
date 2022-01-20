"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var containerElement = document.querySelector('#words');
var searchInputElement = document.querySelector('input#search');
var wordsState = [];
var filteredWordsState = [];
function debounce(fn, delay) {
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
function displayWords() {
    if (containerElement) {
        containerElement.innerHTML = '';
        var _loop_1 = function (word) {
            var wordElement = document.createElement('article');
            wordElement.classList.add('word');
            if (word.selected)
                wordElement.classList.add('selected');
            wordElement.innerText = word.value;
            containerElement.appendChild(wordElement);
            wordElement.addEventListener('click', function (e) {
                wordsState = wordsState.map(function (el) { return el.value === word.value ? __assign(__assign({}, el), { selected: !word.selected }) : el; });
                displayWords();
            });
        };
        for (var _i = 0, wordsState_1 = wordsState; _i < wordsState_1.length; _i++) {
            var word = wordsState_1[_i];
            _loop_1(word);
        }
    }
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, inputHandler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/data')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    wordsState = data.words.map(function (word, idx) { return ({ id: idx, value: word, selected: false }); });
                    displayWords();
                    inputHandler = debounce(function (e) {
                        var searchValue = e.target.value;
                        if (searchValue.length === 0)
                            return displayWords();
                        var exactWords = wordsState.filter(function (word) { return word.value === searchValue; });
                        var closeWords = wordsState.filter(function (word) { return word.value.startsWith(searchValue) && !exactWords.find(function (e) { return e.id === word.id; }); });
                        filteredWordsState = __spreadArray(__spreadArray([], exactWords, true), closeWords, true);
                        displayWords();
                    }, 600);
                    if (searchInputElement)
                        searchInputElement.addEventListener('input', debounce(inputHandler, 500));
                    return [2 /*return*/];
            }
        });
    });
})();
