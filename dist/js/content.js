/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/Content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/constant-case/dist.es2015/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/constant-case/dist.es2015/index.js ***!
  \*********************************************************/
/*! exports provided: constantCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constantCase", function() { return constantCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var no_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! no-case */ "./node_modules/no-case/dist.es2015/index.js");
/* harmony import */ var upper_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! upper-case */ "./node_modules/upper-case/dist.es2015/index.js");



function constantCase(input, options) {
    if (options === void 0) { options = {}; }
    return Object(no_case__WEBPACK_IMPORTED_MODULE_1__["noCase"])(input, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delimiter: "_", transform: upper_case__WEBPACK_IMPORTED_MODULE_2__["upperCase"] }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/dot-prop/index.js":
/*!****************************************!*\
  !*** ./node_modules/dot-prop/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(/*! is-obj */ "./node_modules/is-obj/index.js");

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor'
]);

const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));

function getPathSegments(path) {
	const pathArray = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i];

		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArray[++i];
		}

		parts.push(p);
	}

	if (!isValidPath(parts)) {
		return [];
	}

	return parts;
}

module.exports = {
	get(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return value === undefined ? object : value;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return;
		}

		for (let i = 0; i < pathArray.length; i++) {
			object = object[pathArray[i]];

			if (object === undefined || object === null) {
				// `object` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `object` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArray.length - 1) {
					return value;
				}

				break;
			}
		}

		return object === undefined ? value : object;
	},

	set(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return object;
		}

		const root = object;
		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (!isObj(object[p])) {
				object[p] = {};
			}

			if (i === pathArray.length - 1) {
				object[p] = value;
			}

			object = object[p];
		}

		return root;
	},

	delete(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (i === pathArray.length - 1) {
				delete object[p];
				return true;
			}

			object = object[p];

			if (!isObj(object)) {
				return false;
			}
		}
	},

	has(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < pathArray.length; i++) {
			if (isObj(object)) {
				if (!(pathArray[i] in object)) {
					return false;
				}

				object = object[pathArray[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};


/***/ }),

/***/ "./node_modules/is-obj/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-obj/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};


/***/ }),

/***/ "./node_modules/lower-case/dist.es2015/index.js":
/*!******************************************************!*\
  !*** ./node_modules/lower-case/dist.es2015/index.js ***!
  \******************************************************/
/*! exports provided: localeLowerCase, lowerCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localeLowerCase", function() { return localeLowerCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowerCase", function() { return lowerCase; });
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
var SUPPORTED_LOCALE = {
    tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069",
        },
    },
    az: {
        regexp: /\u0130/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069",
        },
    },
    lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
            I: "\u0069\u0307",
            J: "\u006A\u0307",
            Į: "\u012F\u0307",
            Ì: "\u0069\u0307\u0300",
            Í: "\u0069\u0307\u0301",
            Ĩ: "\u0069\u0307\u0303",
        },
    },
};
/**
 * Localized lower case.
 */
function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang)
        return lowerCase(str.replace(lang.regexp, function (m) { return lang.map[m]; }));
    return lowerCase(str);
}
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/no-case/dist.es2015/index.js":
/*!***************************************************!*\
  !*** ./node_modules/no-case/dist.es2015/index.js ***!
  \***************************************************/
/*! exports provided: noCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noCase", function() { return noCase; });
/* harmony import */ var lower_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lower-case */ "./node_modules/lower-case/dist.es2015/index.js");

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lower_case__WEBPACK_IMPORTED_MODULE_0__["lowerCase"] : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "./node_modules/upper-case/dist.es2015/index.js":
/*!******************************************************!*\
  !*** ./node_modules/upper-case/dist.es2015/index.js ***!
  \******************************************************/
/*! exports provided: localeUpperCase, upperCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localeUpperCase", function() { return localeUpperCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upperCase", function() { return upperCase; });
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
var SUPPORTED_LOCALE = {
    tr: {
        regexp: /[\u0069]/g,
        map: {
            i: "\u0130",
        },
    },
    az: {
        regexp: /[\u0069]/g,
        map: {
            i: "\u0130",
        },
    },
    lt: {
        regexp: /[\u0069\u006A\u012F]\u0307|\u0069\u0307[\u0300\u0301\u0303]/g,
        map: {
            i̇: "\u0049",
            j̇: "\u004A",
            į̇: "\u012E",
            i̇̀: "\u00CC",
            i̇́: "\u00CD",
            i̇̃: "\u0128",
        },
    },
};
/**
 * Localized upper case.
 */
function localeUpperCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang)
        return upperCase(str.replace(lang.regexp, function (m) { return lang.map[m]; }));
    return upperCase(str);
}
/**
 * Upper case as a function.
 */
function upperCase(str) {
    return str.toUpperCase();
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/esm-browser/nil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NIL", function() { return _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/esm-browser/version.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _version_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return _validate_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _parse_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/nil.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('00000000-0000-0000-0000-000000000000');

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function parse(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

/* harmony default export */ __webpack_exports__["default"] = (parse);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/esm-browser/parse.js");



function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/version.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


function version(uuid) {
  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

/* harmony default export */ __webpack_exports__["default"] = (version);

/***/ }),

/***/ "./src/app/BlipsExtension.ts":
/*!***********************************!*\
  !*** ./src/app/BlipsExtension.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlipsExtension = void 0;
const Commands_1 = __webpack_require__(/*! ./Commands */ "./src/app/Commands/index.ts");
const Resolver_1 = __webpack_require__(/*! ./Resolver */ "./src/app/Resolver.ts");
const Features = __webpack_require__(/*! ./Features */ "./src/app/Features/index.ts");
const LISTENER_SCRIPT = chrome.extension.getURL('/js/listener.js');
const MINIMAL_INTERVAL = 200;
const MAXIMUM_INTERVAL = 1500;
class BlipsExtension {
    constructor() {
        this.injectScript();
    }
    /**
     * Injects the script into the page
     */
    injectScript() {
        const script = document.createElement('script');
        script.setAttribute('src', LISTENER_SCRIPT);
        document.body.appendChild(script);
        return this;
    }
    /**
     * Listens for messages
     *
     * @param message The message
     */
    onMessage(message) {
        const { isBlipsResponse, identifier, result } = message.data;
        const isWaitingToBeResolved = Resolver_1.Resolver.isWaiting(identifier);
        if (isBlipsResponse && isWaitingToBeResolved) {
            Resolver_1.Resolver.resolve(identifier, result);
        }
    }
    /**
     * Executes the callback when the Builder is ready
     *
     * @param callback The callback
     */
    onBuilderLoad(callback) {
        this.onReadyCallback = callback;
        let interval = MINIMAL_INTERVAL;
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const isLoading = yield Commands_1.GetVariable.execute('isLoading');
            const isReady = isLoading === false;
            if (isReady) {
                this.onReadyCallback();
                interval = MAXIMUM_INTERVAL;
            }
            else {
                this.cleanFeatures();
                interval = MINIMAL_INTERVAL;
            }
        }), interval);
    }
    /**
     * Runs all features
     */
    runFeatures() {
        Object.values(Features).forEach((Feature) => this.requestFeature(Feature.code, 'run'));
    }
    /**
     * Request cleanup of all features
     */
    cleanFeatures() {
        Object.values(Features).forEach((Feature) => this.requestFeature(Feature.code, 'cleanup'));
    }
    /**
     * Requests a feature
     *
     * @param code The code of the feature
     * @param type The type of the feature
     */
    requestFeature(code, type) {
        const message = {
            isFeatureRequest: true,
            type,
            code,
        };
        this.sendMessage(message);
    }
    /**
     * Sends a message
     *
     * @param message The message
     */
    sendMessage(message) {
        window.postMessage(message, '*');
    }
    /**
     * Starts the Blips extension
     */
    start() {
        window.addEventListener('message', (message) => this.onMessage(message));
        return this;
    }
}
exports.BlipsExtension = BlipsExtension;


/***/ }),

/***/ "./src/app/Commands/BaseCommand.ts":
/*!*****************************************!*\
  !*** ./src/app/Commands/BaseCommand.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = void 0;
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const constant_case_1 = __webpack_require__(/*! constant-case */ "./node_modules/constant-case/dist.es2015/index.js");
const Resolver_1 = __webpack_require__(/*! ../Resolver */ "./src/app/Resolver.ts");
class BaseCommand {
    constructor() { }
    /**
     * The code of the command
     */
    static get code() {
        return constant_case_1.constantCase(this.name);
    }
    /**
     * Executes the command
     */
    static execute(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const identifier = uuid_1.v4();
                Resolver_1.Resolver.register(identifier, resolve);
                window.postMessage({
                    identifier,
                    isBlipsRequest: true,
                    commandCode: this.code,
                    args,
                }, '*');
            });
        });
    }
}
exports.BaseCommand = BaseCommand;
/**
 * Indicates wether the command is ready
 */
BaseCommand.isReady = false;


/***/ }),

/***/ "./src/app/Commands/GetVariable.ts":
/*!*****************************************!*\
  !*** ./src/app/Commands/GetVariable.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVariable = void 0;
const dot_prop_1 = __webpack_require__(/*! dot-prop */ "./node_modules/dot-prop/index.js");
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./src/app/Commands/BaseCommand.ts");
/**
 * Gets a variable by its name
 *
 * @code `GET_VARIABLE`
 * @arg variableName The name of the variable to get
 */
class GetVariable extends BaseCommand_1.BaseCommand {
    /**
     * Obtains the canvas
     */
    getCanvas() {
        return document.querySelector('#canvas');
    }
    /**
     * Returns the value of the variable
     *
     * @param variableName The variable
     */
    handle(variableName) {
        const isReady = !!window.angular;
        if (isReady) {
            const canvas = this.getCanvas();
            const hasCanvas = !!this.getCanvas();
            if (hasCanvas) {
                const controller = window.angular.element(canvas).controller();
                return dot_prop_1.get(controller, variableName);
            }
        }
        return null;
    }
}
exports.GetVariable = GetVariable;


/***/ }),

/***/ "./src/app/Commands/index.ts":
/*!***********************************!*\
  !*** ./src/app/Commands/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./GetVariable */ "./src/app/Commands/GetVariable.ts"), exports);


/***/ }),

/***/ "./src/app/Content.ts":
/*!****************************!*\
  !*** ./src/app/Content.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BlipsExtension_1 = __webpack_require__(/*! ./BlipsExtension */ "./src/app/BlipsExtension.ts");
const extension = new BlipsExtension_1.BlipsExtension().start();
extension.onBuilderLoad(extension.runFeatures);


/***/ }),

/***/ "./src/app/Features/BaseFeature.ts":
/*!*****************************************!*\
  !*** ./src/app/Features/BaseFeature.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFeature = void 0;
const constant_case_1 = __webpack_require__(/*! constant-case */ "./node_modules/constant-case/dist.es2015/index.js");
class BaseFeature {
    constructor() { }
    /**
     * Returns if the feature can run
     */
    static get canRun() {
        return this.shouldRunOnce ? !this.hasRun : true;
    }
    /**
     * Returns the code of the afeature
     */
    static get code() {
        return constant_case_1.constantCase(this.name);
    }
    /**
     * The code for cleaning up the feature
     */
    cleanup() { }
}
exports.BaseFeature = BaseFeature;
BaseFeature.shouldRunOnce = false;
BaseFeature.hasRun = false;
BaseFeature.isCleaned = false;
BaseFeature.alwaysClean = false;


/***/ }),

/***/ "./src/app/Features/BlipTitle.ts":
/*!***************************************!*\
  !*** ./src/app/Features/BlipTitle.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderTitle = void 0;
const BaseFeature_1 = __webpack_require__(/*! ./BaseFeature */ "./src/app/Features/BaseFeature.ts");
class BuilderTitle extends BaseFeature_1.BaseFeature {
    get botName() {
        const botNameElement = document.querySelector('.bot-name:nth-child(1)');
        return botNameElement.innerHTML;
    }
    get isBeholder() {
        return Array.from(document.querySelectorAll('iframe')).find((iFrame) => iFrame.getAttribute('src').includes('beholder'));
    }
    handle() {
        const botName = this.botName;
        document.title = `${botName} - Blip`;
    }
    cleanup() {
        if (this.isBeholder) {
            document.title = 'Beholder - Blip';
        }
        else {
            document.title = 'Blip Portal';
        }
    }
}
exports.BuilderTitle = BuilderTitle;
BuilderTitle.alwaysClean = true;


/***/ }),

/***/ "./src/app/Features/CopyBlock.ts":
/*!***************************************!*\
  !*** ./src/app/Features/CopyBlock.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyBlock = void 0;
const BaseFeature_1 = __webpack_require__(/*! ./BaseFeature */ "./src/app/Features/BaseFeature.ts");
const Utils_1 = __webpack_require__(/*! ../Utils */ "./src/app/Utils.ts");
class CopyBlock extends BaseFeature_1.BaseFeature {
    /**
     * Handles the copy
     */
    handleCopy() {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedNodesId = this.getSelectedNodesId();
            const hasSelectedNodes = selectedNodesId.length > 0;
            if (hasSelectedNodes) {
                this.copyBlocks(selectedNodesId);
                Utils_1.showSuccessToast('Bloco(s) copiado(s) com sucesso');
            }
        });
    }
    /**
     * Get the code of the selected blocks and write to the
     * clipboard
     *
     * @param blocksId The blocks ids
     */
    copyBlocks(blocksId) {
        const selectedBlocks = Utils_1.getBlocks().filter((block) => blocksId.includes(block.id));
        this.copyToClipboard(selectedBlocks);
    }
    /**
     * Copy the content to the clipboard
     *
     * @param content The content
     */
    copyToClipboard(content) {
        const blocksCode = JSON.stringify(content);
        window.navigator.clipboard.writeText(JSON.stringify({
            isCopyFromBlips: true,
            blocksCode,
        }));
    }
    /**
     * Returns all the selected nodes
     */
    getSelectedNodesId() {
        const selectedNodes = document.querySelectorAll('.selected-node');
        return Array.from(selectedNodes).map((node) => node.getAttribute('id'));
    }
    /**
     * Adds the functionality to copy the block
     */
    handle() {
        document.body.addEventListener('copy', this.handleCopy.bind(this));
    }
    /**
     * Removes the functionality to copy the block
     */
    cleanup() {
        document.body.removeEventListener('copy', this.handleCopy.bind(this));
    }
}
exports.CopyBlock = CopyBlock;
/**
 * Only runs this feature once
 */
CopyBlock.shouldRunOnce = true;


/***/ }),

/***/ "./src/app/Features/OriginalCaseInput.ts":
/*!***********************************************!*\
  !*** ./src/app/Features/OriginalCaseInput.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginalCaseInput = void 0;
const BaseFeature_1 = __webpack_require__(/*! ./BaseFeature */ "./src/app/Features/BaseFeature.ts");
/**
 * This feature leaves the input in actions with the exact
 * same casing that the user typed.
 */
class OriginalCaseInput extends BaseFeature_1.BaseFeature {
    handle() {
        const inputs = document.querySelectorAll('input.ttu');
        const listOfInputs = Array.from(inputs);
        for (const input of listOfInputs) {
            input.classList.remove('ttu');
        }
    }
}
exports.OriginalCaseInput = OriginalCaseInput;


/***/ }),

/***/ "./src/app/Features/PasteBlock.ts":
/*!****************************************!*\
  !*** ./src/app/Features/PasteBlock.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasteBlock = void 0;
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
const BaseFeature_1 = __webpack_require__(/*! ./BaseFeature */ "./src/app/Features/BaseFeature.ts");
const Utils_1 = __webpack_require__(/*! ../Utils */ "./src/app/Utils.ts");
class PasteBlock extends BaseFeature_1.BaseFeature {
    constructor() {
        super(...arguments);
        /**
         * Map of cached ids
         */
        this.cachedIds = new Map();
    }
    getIdFor(id) {
        if (this.cachedIds.has(id)) {
            return this.cachedIds.get(id);
        }
        const newId = uuid_1.v4();
        this.cachedIds.set(id, newId);
        return newId;
    }
    /**
     * Handles the copy
     */
    handlePaste(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const flow = Utils_1.getFlow();
            const clipboardData = event.clipboardData.getData('text');
            const blipsCopy = JSON.parse(clipboardData);
            if (isCopyFromBlips(blipsCopy)) {
                Utils_1.cleanCopiedStates();
                Utils_1.cleanSelectedNodes();
                const blocks = JSON.parse(blipsCopy.blocksCode);
                if (blocks.length > 0) {
                    /**
                     * Adds all the blocks to the flow, if the block already
                     * exists in canvas, then tranverse the block replacing
                     * the ids
                     */
                    for (const block of blocks) {
                        this.transverseBlock(block);
                        flow[block.id] = block;
                        Utils_1.selectBlock(block.id);
                    }
                    /**
                     * After including all the block into the flow, we need
                     * to check if they're still valid
                     */
                    for (const block of blocks) {
                        this.treatBlock(block);
                    }
                    Utils_1.showSuccessToast('Bloco(s) colado(s) com sucesso');
                }
            }
        });
    }
    /**
     * Returns if the block exists
     */
    blockExists(id) {
        const existingBlocksId = Utils_1.getBlocks().map((block) => block.id);
        return existingBlocksId.includes(id);
    }
    /**
     * Treats the block by applying verifications, corrections
     * and
     *
     * @param block The block
     */
    treatBlock(block) {
        const outputs = block.$conditionOutputs;
        let isInvalid = false;
        for (const output of outputs) {
            if (!this.blockExists(output.stateId)) {
                isInvalid = true;
                output.$invalid = true;
                delete output.stateId;
            }
        }
        if (isInvalid) {
            block.$invalid = true;
            block.invalidOutputs = true;
        }
    }
    /**
     * Transverse the block replacing its ids
     *
     * @param block The block
     */
    transverseBlock(block) {
        const keys = Object.keys(block);
        for (const key of keys) {
            const isNestedObject = typeof block[key] === 'object';
            if (isNestedObject) {
                this.transverseBlock(block[key]);
            }
            else {
                const isId = ['id', '$id', 'stateId'].includes(key);
                if (isId) {
                    block[key] = this.getIdFor(block[key]);
                }
            }
        }
    }
    /**
     * Adds the functionality of pasting the block
     */
    handle() {
        document.body.addEventListener('paste', this.handlePaste.bind(this));
    }
    /**
     * Removes the functionality of pasting the block
     */
    cleanup() {
        document.body.removeEventListener('paste', this.handlePaste.bind(this));
    }
}
exports.PasteBlock = PasteBlock;
/**
 * This feature should only be executed once
 */
PasteBlock.shouldRunOnce = true;
const isCopyFromBlips = (data) => !!data.isCopyFromBlips;


/***/ }),

/***/ "./src/app/Features/index.ts":
/*!***********************************!*\
  !*** ./src/app/Features/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./BlipTitle */ "./src/app/Features/BlipTitle.ts"), exports);
__exportStar(__webpack_require__(/*! ./CopyBlock */ "./src/app/Features/CopyBlock.ts"), exports);
__exportStar(__webpack_require__(/*! ./PasteBlock */ "./src/app/Features/PasteBlock.ts"), exports);
__exportStar(__webpack_require__(/*! ./OriginalCaseInput */ "./src/app/Features/OriginalCaseInput.ts"), exports);


/***/ }),

/***/ "./src/app/Resolver.ts":
/*!*****************************!*\
  !*** ./src/app/Resolver.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
class Resolver {
    /**
     * Returns if the resolver associated to identifier is still waiting
     *
     * @param identifier The identifier
     */
    static isWaiting(identifier) {
        return this.resolvers.has(identifier);
    }
    /**
     * Register a resolver
     *
     * @param identifier The identifier
     * @param resolve The resolver
     */
    static register(identifier, resolve) {
        this.resolvers.set(identifier, resolve);
        return this;
    }
    /**
     * Resolves the order
     *
     * @param identifier The identifeir
     */
    static resolve(identifier, result) {
        const isRegistered = this.resolvers.has(identifier);
        if (isRegistered) {
            const resolve = this.resolvers.get(identifier);
            resolve(result);
            this.resolvers.delete(identifier);
        }
        return this;
    }
}
exports.Resolver = Resolver;
/**
 * The resolvers
 */
Resolver.resolvers = new Map();


/***/ }),

/***/ "./src/app/Utils.ts":
/*!**************************!*\
  !*** ./src/app/Utils.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanSelectedNodes = exports.selectBlock = exports.cleanCopiedStates = exports.showDangerToast = exports.showSuccessToast = exports.getBlocks = exports.getFlow = exports.getController = void 0;
function getController() {
    const canvas = document.querySelector('#canvas');
    return window.angular.element(canvas).controller();
}
exports.getController = getController;
function getFlow() {
    return getController().flow;
}
exports.getFlow = getFlow;
function getBlocks() {
    return Object.values(getFlow());
}
exports.getBlocks = getBlocks;
function showSuccessToast(message) {
    getController().ngToast.success(message);
}
exports.showSuccessToast = showSuccessToast;
function showDangerToast(message) {
    getController().ngToast.danger(message);
}
exports.showDangerToast = showDangerToast;
function cleanCopiedStates() {
    getController().copiedStates = [];
}
exports.cleanCopiedStates = cleanCopiedStates;
function selectBlock(id) {
    const watchNode = setInterval(() => {
        const node = document.querySelector(`builder-node[id="${id}"]`);
        if (node) {
            getController().selectNode(node);
            clearInterval(watchNode);
        }
    });
}
exports.selectBlock = selectBlock;
function cleanSelectedNodes() {
    getController().selectedNodes = [];
}
exports.cleanSelectedNodes = cleanSelectedNodes;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnN0YW50LWNhc2UvZGlzdC5lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RvdC1wcm9wL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1vYmovaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvd2VyLWNhc2UvZGlzdC5lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vLWNhc2UvZGlzdC5lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXBwZXItY2FzZS9kaXN0LmVzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbWQ1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3NoYTEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92MS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjM1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0JsaXBzRXh0ZW5zaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvQ29tbWFuZHMvQmFzZUNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9Db21tYW5kcy9HZXRWYXJpYWJsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0NvbW1hbmRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvQ29udGVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL0ZlYXR1cmVzL0Jhc2VGZWF0dXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvRmVhdHVyZXMvQmxpcFRpdGxlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvRmVhdHVyZXMvQ29weUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvRmVhdHVyZXMvT3JpZ2luYWxDYXNlSW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9GZWF0dXJlcy9QYXN0ZUJsb2NrLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvRmVhdHVyZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9SZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpQztBQUNBO0FBQ007QUFDaEM7QUFDUCw2QkFBNkIsY0FBYztBQUMzQyxXQUFXLHNEQUFNLFFBQVEsc0RBQVEsRUFBRSw0QkFBNEIsb0RBQVMsRUFBRTtBQUMxRTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7QUNQYTtBQUNiLGNBQWMsbUJBQU8sQ0FBQyw4Q0FBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFVBQVU7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6SWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsZ0VBQWdFLG9CQUFvQixFQUFFO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7O0FDL0NBO0FBQUE7QUFBQTtBQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsNkJBQTZCLGNBQWM7QUFDM0Msa09BQWtPLG9EQUFTO0FBQzNPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsaUNBQWlDLEVBQUU7QUFDOUU7QUFDQSxpQzs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qiw4RUFBOEU7QUFDdkc7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFTztBQUNQO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxjQUFjO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsNENBQTRDLFFBQVE7QUFDcEQ7QUFDQTs7QUFFTztBQUNQLG1DQUFtQyxvQ0FBb0M7QUFDdkU7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1AsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDs7QUFFTztBQUNQLGFBQWEsNkJBQTZCLDBCQUEwQixhQUFhLEVBQUUscUJBQXFCO0FBQ3hHLGdCQUFnQixxREFBcUQsb0VBQW9FLGFBQWEsRUFBRTtBQUN4SixzQkFBc0Isc0JBQXNCLHFCQUFxQixHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxrQ0FBa0MsU0FBUztBQUMzQyxrQ0FBa0MsV0FBVyxVQUFVO0FBQ3ZELHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0EsNkdBQTZHLE9BQU8sVUFBVTtBQUM5SCxnRkFBZ0YsaUJBQWlCLE9BQU87QUFDeEcsd0RBQXdELGdCQUFnQixRQUFRLE9BQU87QUFDdkYsOENBQThDLGdCQUFnQixnQkFBZ0IsT0FBTztBQUNyRjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsU0FBUyxZQUFZLGFBQWEsT0FBTyxFQUFFLFVBQVUsV0FBVztBQUNoRSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBOztBQUVPO0FBQ1A7QUFDQSxrQ0FBa0Msb0NBQW9DLGFBQWEsRUFBRSxFQUFFO0FBQ3ZGLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU0sZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUCxpREFBaUQsUUFBUTtBQUN6RCx3Q0FBd0MsUUFBUTtBQUNoRCx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7O0FBRU87QUFDUCw0RUFBNEUsT0FBTztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsaUJBQWlCLHNGQUFzRixhQUFhLEVBQUU7QUFDdEgsc0JBQXNCLGdDQUFnQyxxQ0FBcUMsMENBQTBDLEVBQUUsRUFBRSxHQUFHO0FBQzVJLDJCQUEyQixNQUFNLGVBQWUsRUFBRSxZQUFZLG9CQUFvQixFQUFFO0FBQ3BGLHNCQUFzQixvR0FBb0c7QUFDMUgsNkJBQTZCLHVCQUF1QjtBQUNwRCw0QkFBNEIsd0JBQXdCO0FBQ3BELDJCQUEyQix5REFBeUQ7QUFDcEY7O0FBRU87QUFDUDtBQUNBLGlCQUFpQiw0Q0FBNEMsU0FBUyxFQUFFLHFEQUFxRCxhQUFhLEVBQUU7QUFDNUkseUJBQXlCLDZCQUE2QixvQkFBb0IsZ0RBQWdELGdCQUFnQixFQUFFLEtBQUs7QUFDako7O0FBRU87QUFDUDtBQUNBO0FBQ0EsMkdBQTJHLHNGQUFzRixhQUFhLEVBQUU7QUFDaE4sc0JBQXNCLDhCQUE4QixnREFBZ0QsdURBQXVELEVBQUUsRUFBRSxHQUFHO0FBQ2xLLDRDQUE0QyxzQ0FBc0MsVUFBVSxvQkFBb0IsRUFBRSxFQUFFLFVBQVU7QUFDOUg7O0FBRU87QUFDUCxnQ0FBZ0MsdUNBQXVDLGFBQWEsRUFBRSxFQUFFLE9BQU8sa0JBQWtCO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsNENBQTRDO0FBQzVDOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOU9BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsZ0VBQWdFLG9CQUFvQixFQUFFO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDUTtBQUNFO0FBQ0U7Ozs7Ozs7Ozs7Ozs7QUNQdEQ7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDs7QUFFbEQ7O0FBRUEsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVlLGtFQUFHLEU7Ozs7Ozs7Ozs7OztBQ3RObEI7QUFBZSxxR0FBc0MsRTs7Ozs7Ozs7Ozs7O0FDQXJEO0FBQUE7QUFBcUM7O0FBRXJDO0FBQ0EsT0FBTyw0REFBUTtBQUNmO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG9FQUFLLEU7Ozs7Ozs7Ozs7OztBQ2xDcEI7QUFBZSw2RUFBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLHlDQUF5QyxFOzs7Ozs7Ozs7Ozs7QUNBcEk7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7O0FBRWxEOztBQUVBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsU0FBUztBQUM1Qjs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsVUFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLG1FQUFJLEU7Ozs7Ozs7Ozs7OztBQy9GbkI7QUFBQTtBQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlnQkFBeWdCO0FBQ3pnQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLDREQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVlLHdFQUFTLEU7Ozs7Ozs7Ozs7OztBQzdCeEI7QUFBQTtBQUFBO0FBQTJCO0FBQ1k7QUFDdkM7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWM7OztBQUdkO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsK0NBQUc7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0EsdUVBQXVFO0FBQ3ZFOztBQUVBLDJFQUEyRTs7QUFFM0UsNkRBQTZEOztBQUU3RDtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCLG1DQUFtQzs7QUFFbkMsNkJBQTZCOztBQUU3QixpQ0FBaUM7O0FBRWpDLDJCQUEyQjs7QUFFM0IsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQSxnQkFBZ0IsNkRBQVM7QUFDekI7O0FBRWUsaUVBQUUsRTs7Ozs7Ozs7Ozs7O0FDOUZqQjtBQUFBO0FBQUE7QUFBMkI7QUFDQTtBQUMzQixTQUFTLHVEQUFHLGFBQWEsK0NBQUc7QUFDYixpRUFBRSxFOzs7Ozs7Ozs7Ozs7QUNIakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNSOztBQUUvQjtBQUNBLDBDQUEwQzs7QUFFMUM7O0FBRUEsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDQTtBQUNRO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IseURBQUs7QUFDdkI7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsV0FBVyw2REFBUztBQUNwQixHQUFHOzs7QUFHSDtBQUNBLDZCQUE2QjtBQUM3QixHQUFHLGVBQWU7OztBQUdsQjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUMvREE7QUFBQTtBQUFBO0FBQTJCO0FBQ1k7O0FBRXZDO0FBQ0E7QUFDQSwrQ0FBK0MsK0NBQUcsSUFBSTs7QUFFdEQ7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsNkRBQVM7QUFDbEI7O0FBRWUsaUVBQUUsRTs7Ozs7Ozs7Ozs7O0FDdkJqQjtBQUFBO0FBQUE7QUFBMkI7QUFDRTtBQUM3QixTQUFTLHVEQUFHLGFBQWEsZ0RBQUk7QUFDZCxpRUFBRSxFOzs7Ozs7Ozs7Ozs7QUNIakI7QUFBQTtBQUErQjs7QUFFL0I7QUFDQSxxQ0FBcUMsaURBQUs7QUFDMUM7O0FBRWUsdUVBQVEsRTs7Ozs7Ozs7Ozs7O0FDTnZCO0FBQUE7QUFBcUM7O0FBRXJDO0FBQ0EsT0FBTyw0REFBUTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZSxzRUFBTyxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWdEIsd0ZBQXdDO0FBQ3hDLGtGQUFxQztBQUNyQyxzRkFBc0M7QUFHdEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7QUFFbEUsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHO0FBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSTtBQUU3QixNQUFhLGNBQWM7SUFHekI7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNLLFlBQVk7UUFDbEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFFL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVqQyxPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLFNBQVMsQ0FBQyxPQUFxQjtRQUNyQyxNQUFNLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSTtRQUM1RCxNQUFNLHFCQUFxQixHQUFHLG1CQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUU1RCxJQUFJLGVBQWUsSUFBSSxxQkFBcUIsRUFBRTtZQUM1QyxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxhQUFhLENBQUMsUUFBa0I7UUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRO1FBRS9CLElBQUksUUFBUSxHQUFHLGdCQUFnQjtRQUUvQixXQUFXLENBQUMsR0FBUyxFQUFFO1lBQ3JCLE1BQU0sU0FBUyxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3hELE1BQU0sT0FBTyxHQUFHLFNBQVMsS0FBSyxLQUFLO1lBRW5DLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3RCLFFBQVEsR0FBRyxnQkFBZ0I7YUFDNUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsUUFBUSxHQUFHLGdCQUFnQjthQUM1QjtRQUNILENBQUMsR0FBRSxRQUFRLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxXQUFXO1FBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUN6QztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLGFBQWE7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQzdDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksY0FBYyxDQUFDLElBQVksRUFBRSxJQUF1QjtRQUN6RCxNQUFNLE9BQU8sR0FBbUI7WUFDOUIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixJQUFJO1lBQ0osSUFBSTtTQUNMO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxXQUFXLENBQUMsT0FBWTtRQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEUsT0FBTyxJQUFJO0lBQ2IsQ0FBQztDQUNGO0FBNUdELHdDQTRHQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIRCxnR0FBaUM7QUFFakMsc0hBQTRDO0FBRTVDLG1GQUFzQztBQUV0QyxNQUFzQixXQUFXO0lBTS9CLGdCQUFlLENBQUM7SUFFaEI7O09BRUc7SUFDSSxNQUFNLEtBQUssSUFBSTtRQUNwQixPQUFPLDRCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBT0Q7O09BRUc7SUFDSSxNQUFNLENBQU8sT0FBTyxDQUFDLEdBQUcsSUFBVzs7WUFDeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixNQUFNLFVBQVUsR0FBRyxTQUFJLEVBQUU7Z0JBRXpCLG1CQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBRXRDLE1BQU0sQ0FBQyxXQUFXLENBQ2hCO29CQUNFLFVBQVU7b0JBQ1YsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDdEIsSUFBSTtpQkFDVyxFQUNqQixHQUFHLENBQ0o7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDO0tBQUE7O0FBdkNILGtDQXdDQztBQXZDQzs7R0FFRztBQUNXLG1CQUFPLEdBQUcsS0FBSzs7Ozs7Ozs7Ozs7Ozs7OztBQ1YvQiwyRkFBOEI7QUFFOUIsb0dBQTJDO0FBRTNDOzs7OztHQUtHO0FBQ0gsTUFBYSxXQUFZLFNBQVEseUJBQVc7SUFDMUM7O09BRUc7SUFDSyxTQUFTO1FBQ2YsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxZQUFvQjtRQUNoQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87UUFFaEMsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBRXBDLElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRTtnQkFFOUQsT0FBTyxjQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQzthQUNyQztTQUNGO1FBRUQsT0FBTyxJQUFJO0lBQ2IsQ0FBQztDQUNGO0FBN0JELGtDQTZCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDRCxxR0FBNkI7Ozs7Ozs7Ozs7Ozs7OztBQ0E3QixvR0FBaUQ7QUFFakQsTUFBTSxTQUFTLEdBQUcsSUFBSSwrQkFBYyxFQUFFLENBQUMsS0FBSyxFQUFFO0FBRTlDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0o5QyxzSEFBNEM7QUFFNUMsTUFBc0IsV0FBVztJQU0vQixnQkFBZSxDQUFDO0lBRWhCOztPQUVHO0lBQ0ksTUFBTSxLQUFLLE1BQU07UUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUk7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLElBQUk7UUFDcEIsT0FBTyw0QkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQU9EOztPQUVHO0lBQ0ksT0FBTyxLQUFJLENBQUM7O0FBOUJyQixrQ0ErQkM7QUE5QmUseUJBQWEsR0FBRyxLQUFLO0FBQ3JCLGtCQUFNLEdBQUcsS0FBSztBQUNkLHFCQUFTLEdBQUcsS0FBSztBQUNqQix1QkFBVyxHQUFHLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNObkMsb0dBQTJDO0FBRTNDLE1BQWEsWUFBYSxTQUFRLHlCQUFXO0lBRzNDLElBQVcsT0FBTztRQUNoQixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO1FBRXZFLE9BQU8sY0FBYyxDQUFDLFNBQVM7SUFDakMsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDckUsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQ2hEO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUU1QixRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUcsT0FBTyxTQUFTO0lBQ3RDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxLQUFLLEdBQUcsaUJBQWlCO1NBQ25DO2FBQU07WUFDTCxRQUFRLENBQUMsS0FBSyxHQUFHLGFBQWE7U0FDL0I7SUFDSCxDQUFDOztBQTNCSCxvQ0E0QkM7QUEzQmUsd0JBQVcsR0FBRyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGxDLG9HQUEyQztBQUMzQywwRUFBc0Q7QUFHdEQsTUFBYSxTQUFVLFNBQVEseUJBQVc7SUFNeEM7O09BRUc7SUFDVyxVQUFVOztZQUN0QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDakQsTUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUM7WUFFbkQsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLHdCQUFnQixDQUFDLGlDQUFpQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDSyxVQUFVLENBQUMsUUFBZTtRQUNoQyxNQUFNLGNBQWMsR0FBRyxpQkFBUyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQzVCO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxlQUFlLENBQUMsT0FBWTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUUxQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDYixlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVO1NBQ0UsQ0FBQyxDQUNoQjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLGtCQUFrQjtRQUN4QixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7UUFFakUsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O0FBdEVILDhCQXVFQztBQXRFQzs7R0FFRztBQUNXLHVCQUFhLEdBQUcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQ1JwQyxvR0FBMkM7QUFFM0M7OztHQUdHO0FBQ0gsTUFBYSxpQkFBa0IsU0FBUSx5QkFBVztJQUN6QyxNQUFNO1FBQ1gsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUNyRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFlBQVksRUFBRTtZQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDOUI7SUFDSCxDQUFDO0NBQ0Y7QUFURCw4Q0FTQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZELGdHQUFpQztBQUVqQyxvR0FBMkM7QUFDM0MsMEVBT2lCO0FBR2pCLE1BQWEsVUFBVyxTQUFRLHlCQUFXO0lBQTNDOztRQU1FOztXQUVHO1FBQ0ssY0FBUyxHQUFHLElBQUksR0FBRyxFQUFrQjtJQXdIL0MsQ0FBQztJQXRIUyxRQUFRLENBQUMsRUFBVTtRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQzlCO1FBRUQsTUFBTSxLQUFLLEdBQUcsU0FBSSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUM7UUFDN0IsT0FBTyxLQUFLO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ1csV0FBVyxDQUFDLEtBQXFCOztZQUM3QyxNQUFNLElBQUksR0FBRyxlQUFPLEVBQUU7WUFDdEIsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBRTNDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5Qix5QkFBaUIsRUFBRTtnQkFDbkIsMEJBQWtCLEVBQUU7Z0JBRXBCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQkFFL0MsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDckI7Ozs7dUJBSUc7b0JBQ0gsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7d0JBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO3dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUs7d0JBQ3RCLG1CQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztxQkFDdEI7b0JBRUQ7Ozt1QkFHRztvQkFDSCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7cUJBQ3ZCO29CQUVELHdCQUFnQixDQUFDLGdDQUFnQyxDQUFDO2lCQUNuRDthQUNGO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSSxXQUFXLENBQUMsRUFBVTtRQUMzQixNQUFNLGdCQUFnQixHQUFHLGlCQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFFN0QsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFVBQVUsQ0FBQyxLQUFVO1FBQzNCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxpQkFBaUI7UUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSztRQUVyQixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JDLFNBQVMsR0FBRyxJQUFJO2dCQUNoQixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUk7Z0JBQ3RCLE9BQU8sTUFBTSxDQUFDLE9BQU87YUFDdEI7U0FDRjtRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJO1lBQ3JCLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSTtTQUM1QjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZSxDQUFDLEtBQVU7UUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFL0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDdEIsTUFBTSxjQUFjLEdBQUcsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtZQUVyRCxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBRW5ELElBQUksSUFBSSxFQUFFO29CQUNSLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdkM7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDOztBQWhJSCxnQ0FpSUM7QUFoSUM7O0dBRUc7QUFDVyx3QkFBYSxHQUFHLElBQUk7QUErSHBDLE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBUyxFQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEpoRixpR0FBMkI7QUFDM0IsaUdBQTJCO0FBQzNCLG1HQUE0QjtBQUM1QixpSEFBbUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIbkMsTUFBYSxRQUFRO0lBTW5COzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQWtCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBa0IsRUFBRSxPQUFpQjtRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO1FBRXZDLE9BQU8sSUFBSTtJQUNiLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFrQixFQUFFLE1BQVc7UUFDbkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBRW5ELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUU5QyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxJQUFJO0lBQ2IsQ0FBQzs7QUEzQ0gsNEJBNENDO0FBM0NDOztHQUVHO0FBQ1csa0JBQVMsR0FBRyxJQUFJLEdBQUcsRUFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKdkQsU0FBZ0IsYUFBYTtJQUMzQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUVoRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRTtBQUNwRCxDQUFDO0FBSkQsc0NBSUM7QUFFRCxTQUFnQixPQUFPO0lBQ3JCLE9BQU8sYUFBYSxFQUFFLENBQUMsSUFBSTtBQUM3QixDQUFDO0FBRkQsMEJBRUM7QUFFRCxTQUFnQixTQUFTO0lBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUFlO0lBQzlDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzFDLENBQUM7QUFGRCw0Q0FFQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxPQUFlO0lBQzdDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ3pDLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLGlCQUFpQjtJQUMvQixhQUFhLEVBQUUsQ0FBQyxZQUFZLEdBQUcsRUFBRTtBQUNuQyxDQUFDO0FBRkQsOENBRUM7QUFFRCxTQUFnQixXQUFXLENBQUMsRUFBVTtJQUNwQyxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDO1FBRS9ELElBQUksSUFBSSxFQUFFO1lBQ1IsYUFBYSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNoQyxhQUFhLENBQUMsU0FBUyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVRELGtDQVNDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLGFBQWEsRUFBRSxDQUFDLGFBQWEsR0FBRyxFQUFFO0FBQ3BDLENBQUM7QUFGRCxnREFFQyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL0NvbnRlbnQudHNcIik7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgbm9DYXNlIH0gZnJvbSBcIm5vLWNhc2VcIjtcbmltcG9ydCB7IHVwcGVyQ2FzZSB9IGZyb20gXCJ1cHBlci1jYXNlXCI7XG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnRDYXNlKGlucHV0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICByZXR1cm4gbm9DYXNlKGlucHV0LCBfX2Fzc2lnbih7IGRlbGltaXRlcjogXCJfXCIsIHRyYW5zZm9ybTogdXBwZXJDYXNlIH0sIG9wdGlvbnMpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGlzT2JqID0gcmVxdWlyZSgnaXMtb2JqJyk7XG5cbmNvbnN0IGRpc2FsbG93ZWRLZXlzID0gbmV3IFNldChbXG5cdCdfX3Byb3RvX18nLFxuXHQncHJvdG90eXBlJyxcblx0J2NvbnN0cnVjdG9yJ1xuXSk7XG5cbmNvbnN0IGlzVmFsaWRQYXRoID0gcGF0aFNlZ21lbnRzID0+ICFwYXRoU2VnbWVudHMuc29tZShzZWdtZW50ID0+IGRpc2FsbG93ZWRLZXlzLmhhcyhzZWdtZW50KSk7XG5cbmZ1bmN0aW9uIGdldFBhdGhTZWdtZW50cyhwYXRoKSB7XG5cdGNvbnN0IHBhdGhBcnJheSA9IHBhdGguc3BsaXQoJy4nKTtcblx0Y29uc3QgcGFydHMgPSBbXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBwID0gcGF0aEFycmF5W2ldO1xuXG5cdFx0d2hpbGUgKHBbcC5sZW5ndGggLSAxXSA9PT0gJ1xcXFwnICYmIHBhdGhBcnJheVtpICsgMV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cCA9IHAuc2xpY2UoMCwgLTEpICsgJy4nO1xuXHRcdFx0cCArPSBwYXRoQXJyYXlbKytpXTtcblx0XHR9XG5cblx0XHRwYXJ0cy5wdXNoKHApO1xuXHR9XG5cblx0aWYgKCFpc1ZhbGlkUGF0aChwYXJ0cykpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRyZXR1cm4gcGFydHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmICghaXNPYmoob2JqZWN0KSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gb2JqZWN0IDogdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFycmF5ID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXHRcdGlmIChwYXRoQXJyYXkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdG9iamVjdCA9IG9iamVjdFtwYXRoQXJyYXlbaV1dO1xuXG5cdFx0XHRpZiAob2JqZWN0ID09PSB1bmRlZmluZWQgfHwgb2JqZWN0ID09PSBudWxsKSB7XG5cdFx0XHRcdC8vIGBvYmplY3RgIGlzIGVpdGhlciBgdW5kZWZpbmVkYCBvciBgbnVsbGAgc28gd2Ugd2FudCB0byBzdG9wIHRoZSBsb29wLCBhbmRcblx0XHRcdFx0Ly8gaWYgdGhpcyBpcyBub3QgdGhlIGxhc3QgYml0IG9mIHRoZSBwYXRoLCBhbmRcblx0XHRcdFx0Ly8gaWYgaXQgZGlkJ3QgcmV0dXJuIGB1bmRlZmluZWRgXG5cdFx0XHRcdC8vIGl0IHdvdWxkIHJldHVybiBgbnVsbGAgaWYgYG9iamVjdGAgaXMgYG51bGxgXG5cdFx0XHRcdC8vIGJ1dCB3ZSB3YW50IGBnZXQoe2ZvbzogbnVsbH0sICdmb28uYmFyJylgIHRvIGVxdWFsIGB1bmRlZmluZWRgLCBvciB0aGUgc3VwcGxpZWQgdmFsdWUsIG5vdCBgbnVsbGBcblx0XHRcdFx0aWYgKGkgIT09IHBhdGhBcnJheS5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdCA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBvYmplY3Q7XG5cdH0sXG5cblx0c2V0KG9iamVjdCwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoIWlzT2JqKG9iamVjdCkgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdH1cblxuXHRcdGNvbnN0IHJvb3QgPSBvYmplY3Q7XG5cdFx0Y29uc3QgcGF0aEFycmF5ID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHAgPSBwYXRoQXJyYXlbaV07XG5cblx0XHRcdGlmICghaXNPYmoob2JqZWN0W3BdKSkge1xuXHRcdFx0XHRvYmplY3RbcF0gPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGkgPT09IHBhdGhBcnJheS5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdG9iamVjdFtwXSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmplY3QgPSBvYmplY3RbcF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH0sXG5cblx0ZGVsZXRlKG9iamVjdCwgcGF0aCkge1xuXHRcdGlmICghaXNPYmoob2JqZWN0KSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyYXkgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcCA9IHBhdGhBcnJheVtpXTtcblxuXHRcdFx0aWYgKGkgPT09IHBhdGhBcnJheS5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGRlbGV0ZSBvYmplY3RbcF07XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmplY3QgPSBvYmplY3RbcF07XG5cblx0XHRcdGlmICghaXNPYmoob2JqZWN0KSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhhcyhvYmplY3QsIHBhdGgpIHtcblx0XHRpZiAoIWlzT2JqKG9iamVjdCkgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFycmF5ID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXHRcdGlmIChwYXRoQXJyYXkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm9yLWxvb3Bcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGlzT2JqKG9iamVjdCkpIHtcblx0XHRcdFx0aWYgKCEocGF0aEFycmF5W2ldIGluIG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRvYmplY3QgPSBvYmplY3RbcGF0aEFycmF5W2ldXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZSA9PiB7XG5cdGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuIiwiLyoqXG4gKiBTb3VyY2U6IGZ0cDovL2Z0cC51bmljb2RlLm9yZy9QdWJsaWMvVUNEL2xhdGVzdC91Y2QvU3BlY2lhbENhc2luZy50eHRcbiAqL1xudmFyIFNVUFBPUlRFRF9MT0NBTEUgPSB7XG4gICAgdHI6IHtcbiAgICAgICAgcmVnZXhwOiAvXFx1MDEzMHxcXHUwMDQ5fFxcdTAwNDlcXHUwMzA3L2csXG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgxLA6IFwiXFx1MDA2OVwiLFxuICAgICAgICAgICAgSTogXCJcXHUwMTMxXCIsXG4gICAgICAgICAgICBJzIc6IFwiXFx1MDA2OVwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgYXo6IHtcbiAgICAgICAgcmVnZXhwOiAvXFx1MDEzMC9nLFxuICAgICAgICBtYXA6IHtcbiAgICAgICAgICAgIMSwOiBcIlxcdTAwNjlcIixcbiAgICAgICAgICAgIEk6IFwiXFx1MDEzMVwiLFxuICAgICAgICAgICAgScyHOiBcIlxcdTAwNjlcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGx0OiB7XG4gICAgICAgIHJlZ2V4cDogL1xcdTAwNDl8XFx1MDA0QXxcXHUwMTJFfFxcdTAwQ0N8XFx1MDBDRHxcXHUwMTI4L2csXG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgSTogXCJcXHUwMDY5XFx1MDMwN1wiLFxuICAgICAgICAgICAgSjogXCJcXHUwMDZBXFx1MDMwN1wiLFxuICAgICAgICAgICAgxK46IFwiXFx1MDEyRlxcdTAzMDdcIixcbiAgICAgICAgICAgIMOMOiBcIlxcdTAwNjlcXHUwMzA3XFx1MDMwMFwiLFxuICAgICAgICAgICAgw406IFwiXFx1MDA2OVxcdTAzMDdcXHUwMzAxXCIsXG4gICAgICAgICAgICDEqDogXCJcXHUwMDY5XFx1MDMwN1xcdTAzMDNcIixcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbi8qKlxuICogTG9jYWxpemVkIGxvd2VyIGNhc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2NhbGVMb3dlckNhc2Uoc3RyLCBsb2NhbGUpIHtcbiAgICB2YXIgbGFuZyA9IFNVUFBPUlRFRF9MT0NBTEVbbG9jYWxlLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmIChsYW5nKVxuICAgICAgICByZXR1cm4gbG93ZXJDYXNlKHN0ci5yZXBsYWNlKGxhbmcucmVnZXhwLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gbGFuZy5tYXBbbV07IH0pKTtcbiAgICByZXR1cm4gbG93ZXJDYXNlKHN0cik7XG59XG4vKipcbiAqIExvd2VyIGNhc2UgYXMgYSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvd2VyQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBsb3dlckNhc2UgfSBmcm9tIFwibG93ZXItY2FzZVwiO1xuLy8gU3VwcG9ydCBjYW1lbCBjYXNlIChcImNhbWVsQ2FzZVwiIC0+IFwiY2FtZWwgQ2FzZVwiIGFuZCBcIkNBTUVMQ2FzZVwiIC0+IFwiQ0FNRUwgQ2FzZVwiKS5cbnZhciBERUZBVUxUX1NQTElUX1JFR0VYUCA9IFsvKFthLXowLTldKShbQS1aXSkvZywgLyhbQS1aXSkoW0EtWl1bYS16XSkvZ107XG4vLyBSZW1vdmUgYWxsIG5vbi13b3JkIGNoYXJhY3RlcnMuXG52YXIgREVGQVVMVF9TVFJJUF9SRUdFWFAgPSAvW15BLVowLTldKy9naTtcbi8qKlxuICogTm9ybWFsaXplIHRoZSBzdHJpbmcgaW50byBzb21ldGhpbmcgb3RoZXIgbGlicmFyaWVzIGNhbiBtYW5pcHVsYXRlIGVhc2llci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vQ2FzZShpbnB1dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gb3B0aW9ucy5zcGxpdFJlZ2V4cCwgc3BsaXRSZWdleHAgPSBfYSA9PT0gdm9pZCAwID8gREVGQVVMVF9TUExJVF9SRUdFWFAgOiBfYSwgX2IgPSBvcHRpb25zLnN0cmlwUmVnZXhwLCBzdHJpcFJlZ2V4cCA9IF9iID09PSB2b2lkIDAgPyBERUZBVUxUX1NUUklQX1JFR0VYUCA6IF9iLCBfYyA9IG9wdGlvbnMudHJhbnNmb3JtLCB0cmFuc2Zvcm0gPSBfYyA9PT0gdm9pZCAwID8gbG93ZXJDYXNlIDogX2MsIF9kID0gb3B0aW9ucy5kZWxpbWl0ZXIsIGRlbGltaXRlciA9IF9kID09PSB2b2lkIDAgPyBcIiBcIiA6IF9kO1xuICAgIHZhciByZXN1bHQgPSByZXBsYWNlKHJlcGxhY2UoaW5wdXQsIHNwbGl0UmVnZXhwLCBcIiQxXFwwJDJcIiksIHN0cmlwUmVnZXhwLCBcIlxcMFwiKTtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIHZhciBlbmQgPSByZXN1bHQubGVuZ3RoO1xuICAgIC8vIFRyaW0gdGhlIGRlbGltaXRlciBmcm9tIGFyb3VuZCB0aGUgb3V0cHV0IHN0cmluZy5cbiAgICB3aGlsZSAocmVzdWx0LmNoYXJBdChzdGFydCkgPT09IFwiXFwwXCIpXG4gICAgICAgIHN0YXJ0Kys7XG4gICAgd2hpbGUgKHJlc3VsdC5jaGFyQXQoZW5kIC0gMSkgPT09IFwiXFwwXCIpXG4gICAgICAgIGVuZC0tO1xuICAgIC8vIFRyYW5zZm9ybSBlYWNoIHRva2VuIGluZGVwZW5kZW50bHkuXG4gICAgcmV0dXJuIHJlc3VsdC5zbGljZShzdGFydCwgZW5kKS5zcGxpdChcIlxcMFwiKS5tYXAodHJhbnNmb3JtKS5qb2luKGRlbGltaXRlcik7XG59XG4vKipcbiAqIFJlcGxhY2UgYHJlYCBpbiB0aGUgaW5wdXQgc3RyaW5nIHdpdGggdGhlIHJlcGxhY2VtZW50IHZhbHVlLlxuICovXG5mdW5jdGlvbiByZXBsYWNlKGlucHV0LCByZSwgdmFsdWUpIHtcbiAgICBpZiAocmUgaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKHJlLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHJlLnJlZHVjZShmdW5jdGlvbiAoaW5wdXQsIHJlKSB7IHJldHVybiBpbnB1dC5yZXBsYWNlKHJlLCB2YWx1ZSk7IH0sIGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiLyoqXG4gKiBTb3VyY2U6IGZ0cDovL2Z0cC51bmljb2RlLm9yZy9QdWJsaWMvVUNEL2xhdGVzdC91Y2QvU3BlY2lhbENhc2luZy50eHRcbiAqL1xudmFyIFNVUFBPUlRFRF9MT0NBTEUgPSB7XG4gICAgdHI6IHtcbiAgICAgICAgcmVnZXhwOiAvW1xcdTAwNjldL2csXG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgaTogXCJcXHUwMTMwXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBhejoge1xuICAgICAgICByZWdleHA6IC9bXFx1MDA2OV0vZyxcbiAgICAgICAgbWFwOiB7XG4gICAgICAgICAgICBpOiBcIlxcdTAxMzBcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGx0OiB7XG4gICAgICAgIHJlZ2V4cDogL1tcXHUwMDY5XFx1MDA2QVxcdTAxMkZdXFx1MDMwN3xcXHUwMDY5XFx1MDMwN1tcXHUwMzAwXFx1MDMwMVxcdTAzMDNdL2csXG4gICAgICAgIG1hcDoge1xuICAgICAgICAgICAgacyHOiBcIlxcdTAwNDlcIixcbiAgICAgICAgICAgIGrMhzogXCJcXHUwMDRBXCIsXG4gICAgICAgICAgICDEr8yHOiBcIlxcdTAxMkVcIixcbiAgICAgICAgICAgIGnMh8yAOiBcIlxcdTAwQ0NcIixcbiAgICAgICAgICAgIGnMh8yBOiBcIlxcdTAwQ0RcIixcbiAgICAgICAgICAgIGnMh8yDOiBcIlxcdTAxMjhcIixcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbi8qKlxuICogTG9jYWxpemVkIHVwcGVyIGNhc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2NhbGVVcHBlckNhc2Uoc3RyLCBsb2NhbGUpIHtcbiAgICB2YXIgbGFuZyA9IFNVUFBPUlRFRF9MT0NBTEVbbG9jYWxlLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmIChsYW5nKVxuICAgICAgICByZXR1cm4gdXBwZXJDYXNlKHN0ci5yZXBsYWNlKGxhbmcucmVnZXhwLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gbGFuZy5tYXBbbV07IH0pKTtcbiAgICByZXR1cm4gdXBwZXJDYXNlKHN0cik7XG59XG4vKipcbiAqIFVwcGVyIGNhc2UgYXMgYSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwcGVyQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgeyBkZWZhdWx0IGFzIHYxIH0gZnJvbSAnLi92MS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHYzIH0gZnJvbSAnLi92My5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY0IH0gZnJvbSAnLi92NC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY1IH0gZnJvbSAnLi92NS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5JTCB9IGZyb20gJy4vbmlsLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHZhbGlkYXRlIH0gZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlLmpzJzsiLCIvKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgbXNnID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGJ5dGVzKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KG1zZy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyArK2kpIHtcbiAgICAgIGJ5dGVzW2ldID0gbXNnLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1kNVRvSGV4RW5jb2RlZEFycmF5KHdvcmRzVG9NZDUoYnl0ZXNUb1dvcmRzKGJ5dGVzKSwgYnl0ZXMubGVuZ3RoICogOCkpO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhbiBhcnJheSBvZiBieXRlc1xuICovXG5cblxuZnVuY3Rpb24gbWQ1VG9IZXhFbmNvZGVkQXJyYXkoaW5wdXQpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcbiAgICB2YXIgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgdmFyIGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgdmFyIGEgPSAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlQWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlQWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpO1xuICB9XG5cbiAgcmV0dXJuIFthLCBiLCBjLCBkXTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IGJ5dGVzIHRvIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHNcbiAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICovXG5cblxuZnVuY3Rpb24gYnl0ZXNUb1dvcmRzKGlucHV0KSB7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIHZhciBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZDU7IiwiZXhwb3J0IGRlZmF1bHQgJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgdmFyIHY7XG4gIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2U7IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCIvLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIHZhciBLID0gWzB4NWE4Mjc5OTksIDB4NmVkOWViYTEsIDB4OGYxYmJjZGMsIDB4Y2E2MmMxZDZdO1xuICB2YXIgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgdmFyIGwgPSBieXRlcy5sZW5ndGggLyA0ICsgMjtcbiAgdmFyIE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgdmFyIE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IE47ICsrX2kpIHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQzMkFycmF5KDE2KTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgYXJyW2pdID0gYnl0ZXNbX2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMl0gPDwgOCB8IGJ5dGVzW19pICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1bX2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBOOyArK19pMikge1xuICAgIHZhciBXID0gbmV3IFVpbnQzMkFycmF5KDgwKTtcblxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgMTY7ICsrdCkge1xuICAgICAgV1t0XSA9IE1bX2kyXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfdCA9IDE2OyBfdCA8IDgwOyArK190KSB7XG4gICAgICBXW190XSA9IFJPVEwoV1tfdCAtIDNdIF4gV1tfdCAtIDhdIF4gV1tfdCAtIDE0XSBeIFdbX3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIHZhciBhID0gSFswXTtcbiAgICB2YXIgYiA9IEhbMV07XG4gICAgdmFyIGMgPSBIWzJdO1xuICAgIHZhciBkID0gSFszXTtcbiAgICB2YXIgZSA9IEhbNF07XG5cbiAgICBmb3IgKHZhciBfdDIgPSAwOyBfdDIgPCA4MDsgKytfdDIpIHtcbiAgICAgIHZhciBzID0gTWF0aC5mbG9vcihfdDIgLyAyMCk7XG4gICAgICB2YXIgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW190Ml0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hhMTsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnOyAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xuXG52YXIgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTsgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG5cbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW3NlZWRCeXRlc1swXSB8IDB4MDEsIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXTtcbiAgICB9XG5cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH0gLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG5cblxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogRGF0ZS5ub3coKTsgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTsgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuXG4gIHZhciBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7IC8vIGB0aW1lX21pZGBcblxuICB2YXIgdG1oID0gbXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmOyAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjsgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG5cbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwOyAvLyBgY2xvY2tfc2VxX2xvd2BcblxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7IC8vIGBub2RlYFxuXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBzdHJpbmdpZnkoYik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHYxOyIsImltcG9ydCB2MzUgZnJvbSAnLi92MzUuanMnO1xuaW1wb3J0IG1kNSBmcm9tICcuL21kNS5qcyc7XG52YXIgdjMgPSB2MzUoJ3YzJywgMHgzMCwgbWQ1KTtcbmV4cG9ydCBkZWZhdWx0IHYzOyIsImltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UuanMnO1xuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgdmFyIGJ5dGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuZXhwb3J0IHZhciBETlMgPSAnNmJhN2I4MTAtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydCB2YXIgVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lc3BhY2UgPSBwYXJzZShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmIChuYW1lc3BhY2UubGVuZ3RoICE9PSAxNikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdOYW1lc3BhY2UgbXVzdCBiZSBhcnJheS1saWtlICgxNiBpdGVyYWJsZSBpbnRlZ2VyIHZhbHVlcywgMC0yNTUpJyk7XG4gICAgfSAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuXG5cbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlLmxlbmd0aCk7XG4gICAgYnl0ZXMuc2V0KG5hbWVzcGFjZSk7XG4gICAgYnl0ZXMuc2V0KHZhbHVlLCBuYW1lc3BhY2UubGVuZ3RoKTtcbiAgICBieXRlcyA9IGhhc2hmdW5jKGJ5dGVzKTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMHgwZiB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDB4M2YgfCAweDgwO1xuXG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5naWZ5KGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBzaGExIGZyb20gJy4vc2hhMS5qcyc7XG52YXIgdjUgPSB2MzUoJ3Y1JywgMHg1MCwgc2hhMSk7XG5leHBvcnQgZGVmYXVsdCB2NTsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5cbmZ1bmN0aW9uIHZlcnNpb24odXVpZCkge1xuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnN1YnN0cigxNCwgMSksIDE2KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmVyc2lvbjsiLCJpbXBvcnQgeyBHZXRWYXJpYWJsZSB9IGZyb20gJy4vQ29tbWFuZHMnXHJcbmltcG9ydCB7IFJlc29sdmVyIH0gZnJvbSAnLi9SZXNvbHZlcidcclxuaW1wb3J0ICogYXMgRmVhdHVyZXMgZnJvbSAnLi9GZWF0dXJlcydcclxuaW1wb3J0IHR5cGUgeyBGZWF0dXJlUmVxdWVzdCwgTWVzc2FnZSB9IGZyb20gJy4vdHlwZXMnXHJcblxyXG5jb25zdCBMSVNURU5FUl9TQ1JJUFQgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2pzL2xpc3RlbmVyLmpzJylcclxuXHJcbmNvbnN0IE1JTklNQUxfSU5URVJWQUwgPSAyMDBcclxuY29uc3QgTUFYSU1VTV9JTlRFUlZBTCA9IDE1MDBcclxuXHJcbmV4cG9ydCBjbGFzcyBCbGlwc0V4dGVuc2lvbiB7XHJcbiAgcHVibGljIG9uUmVhZHlDYWxsYmFjazogRnVuY3Rpb25cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluamVjdFNjcmlwdCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbmplY3RzIHRoZSBzY3JpcHQgaW50byB0aGUgcGFnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5qZWN0U2NyaXB0KCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcclxuXHJcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBMSVNURU5FUl9TQ1JJUFQpXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVucyBmb3IgbWVzc2FnZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZTxhbnk+KSB7XHJcbiAgICBjb25zdCB7IGlzQmxpcHNSZXNwb25zZSwgaWRlbnRpZmllciwgcmVzdWx0IH0gPSBtZXNzYWdlLmRhdGFcclxuICAgIGNvbnN0IGlzV2FpdGluZ1RvQmVSZXNvbHZlZCA9IFJlc29sdmVyLmlzV2FpdGluZyhpZGVudGlmaWVyKVxyXG5cclxuICAgIGlmIChpc0JsaXBzUmVzcG9uc2UgJiYgaXNXYWl0aW5nVG9CZVJlc29sdmVkKSB7XHJcbiAgICAgIFJlc29sdmVyLnJlc29sdmUoaWRlbnRpZmllciwgcmVzdWx0KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZXMgdGhlIGNhbGxiYWNrIHdoZW4gdGhlIEJ1aWxkZXIgaXMgcmVhZHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2tcclxuICAgKi9cclxuICBwdWJsaWMgb25CdWlsZGVyTG9hZChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMub25SZWFkeUNhbGxiYWNrID0gY2FsbGJhY2tcclxuXHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBNSU5JTUFMX0lOVEVSVkFMXHJcblxyXG4gICAgc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBpc0xvYWRpbmcgPSBhd2FpdCBHZXRWYXJpYWJsZS5leGVjdXRlKCdpc0xvYWRpbmcnKVxyXG4gICAgICBjb25zdCBpc1JlYWR5ID0gaXNMb2FkaW5nID09PSBmYWxzZVxyXG5cclxuICAgICAgaWYgKGlzUmVhZHkpIHtcclxuICAgICAgICB0aGlzLm9uUmVhZHlDYWxsYmFjaygpXHJcbiAgICAgICAgaW50ZXJ2YWwgPSBNQVhJTVVNX0lOVEVSVkFMXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jbGVhbkZlYXR1cmVzKClcclxuICAgICAgICBpbnRlcnZhbCA9IE1JTklNQUxfSU5URVJWQUxcclxuICAgICAgfVxyXG4gICAgfSwgaW50ZXJ2YWwpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSdW5zIGFsbCBmZWF0dXJlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBydW5GZWF0dXJlcygpIHtcclxuICAgIE9iamVjdC52YWx1ZXMoRmVhdHVyZXMpLmZvckVhY2goKEZlYXR1cmUpID0+XHJcbiAgICAgIHRoaXMucmVxdWVzdEZlYXR1cmUoRmVhdHVyZS5jb2RlLCAncnVuJylcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcXVlc3QgY2xlYW51cCBvZiBhbGwgZmVhdHVyZXNcclxuICAgKi9cclxuICBwdWJsaWMgY2xlYW5GZWF0dXJlcygpIHtcclxuICAgIE9iamVjdC52YWx1ZXMoRmVhdHVyZXMpLmZvckVhY2goKEZlYXR1cmUpID0+XHJcbiAgICAgIHRoaXMucmVxdWVzdEZlYXR1cmUoRmVhdHVyZS5jb2RlLCAnY2xlYW51cCcpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXF1ZXN0cyBhIGZlYXR1cmVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb2RlIFRoZSBjb2RlIG9mIHRoZSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIGZlYXR1cmVcclxuICAgKi9cclxuICBwdWJsaWMgcmVxdWVzdEZlYXR1cmUoY29kZTogc3RyaW5nLCB0eXBlOiAnY2xlYW51cCcgfCAncnVuJykge1xyXG4gICAgY29uc3QgbWVzc2FnZTogRmVhdHVyZVJlcXVlc3QgPSB7XHJcbiAgICAgIGlzRmVhdHVyZVJlcXVlc3Q6IHRydWUsXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGNvZGUsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZW5kTWVzc2FnZShtZXNzYWdlKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZHMgYSBtZXNzYWdlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KSB7XHJcbiAgICB3aW5kb3cucG9zdE1lc3NhZ2UobWVzc2FnZSwgJyonKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIHRoZSBCbGlwcyBleHRlbnNpb25cclxuICAgKi9cclxuICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB0aGlzLm9uTWVzc2FnZShtZXNzYWdlKSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCdcclxuXHJcbmltcG9ydCB7IGNvbnN0YW50Q2FzZSB9IGZyb20gJ2NvbnN0YW50LWNhc2UnXHJcbmltcG9ydCB7IEJsaXBzUmVxdWVzdCB9IGZyb20gJy4uL3R5cGVzJ1xyXG5pbXBvcnQgeyBSZXNvbHZlciB9IGZyb20gJy4uL1Jlc29sdmVyJ1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VDb21tYW5kIHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2V0aGVyIHRoZSBjb21tYW5kIGlzIHJlYWR5XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1JlYWR5ID0gZmFsc2VcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29kZSBvZiB0aGUgY29tbWFuZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGNvZGUoKSB7XHJcbiAgICByZXR1cm4gY29uc3RhbnRDYXNlKHRoaXMubmFtZSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMgdGhlIGNvbW1hbmQgYW5kIGV2YWx1YXRlcyB0aGUgcmVzdWx0XHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IGhhbmRsZSguLi5hcmdzOiBhbnlbXSk6IGFueSB8IFByb21pc2U8YW55PlxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlcyB0aGUgY29tbWFuZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZXhlY3V0ZSguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSB1dWlkKClcclxuXHJcbiAgICAgIFJlc29sdmVyLnJlZ2lzdGVyKGlkZW50aWZpZXIsIHJlc29sdmUpXHJcblxyXG4gICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWRlbnRpZmllcixcclxuICAgICAgICAgIGlzQmxpcHNSZXF1ZXN0OiB0cnVlLFxyXG4gICAgICAgICAgY29tbWFuZENvZGU6IHRoaXMuY29kZSxcclxuICAgICAgICAgIGFyZ3MsXHJcbiAgICAgICAgfSBhcyBCbGlwc1JlcXVlc3QsXHJcbiAgICAgICAgJyonXHJcbiAgICAgIClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGdldCB9IGZyb20gJ2RvdC1wcm9wJ1xyXG5cclxuaW1wb3J0IHsgQmFzZUNvbW1hbmQgfSBmcm9tICcuL0Jhc2VDb21tYW5kJ1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYSB2YXJpYWJsZSBieSBpdHMgbmFtZVxyXG4gKlxyXG4gKiBAY29kZSBgR0VUX1ZBUklBQkxFYFxyXG4gKiBAYXJnIHZhcmlhYmxlTmFtZSBUaGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgdG8gZ2V0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2V0VmFyaWFibGUgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgLyoqXHJcbiAgICogT2J0YWlucyB0aGUgY2FudmFzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRDYW52YXMoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbnZhcycpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YXJpYWJsZU5hbWUgVGhlIHZhcmlhYmxlXHJcbiAgICovXHJcbiAgcHVibGljIGhhbmRsZSh2YXJpYWJsZU5hbWU6IHN0cmluZyk6IHVua25vd24ge1xyXG4gICAgY29uc3QgaXNSZWFkeSA9ICEhd2luZG93LmFuZ3VsYXJcclxuXHJcbiAgICBpZiAoaXNSZWFkeSkge1xyXG4gICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpXHJcbiAgICAgIGNvbnN0IGhhc0NhbnZhcyA9ICEhdGhpcy5nZXRDYW52YXMoKVxyXG5cclxuICAgICAgaWYgKGhhc0NhbnZhcykge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB3aW5kb3cuYW5ndWxhci5lbGVtZW50KGNhbnZhcykuY29udHJvbGxlcigpXHJcblxyXG4gICAgICAgIHJldHVybiBnZXQoY29udHJvbGxlciwgdmFyaWFibGVOYW1lKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9HZXRWYXJpYWJsZSdcclxuIiwiaW1wb3J0IHsgQmxpcHNFeHRlbnNpb24gfSBmcm9tICcuL0JsaXBzRXh0ZW5zaW9uJ1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uID0gbmV3IEJsaXBzRXh0ZW5zaW9uKCkuc3RhcnQoKVxyXG5cclxuZXh0ZW5zaW9uLm9uQnVpbGRlckxvYWQoZXh0ZW5zaW9uLnJ1bkZlYXR1cmVzKVxyXG4iLCJpbXBvcnQgeyBjb25zdGFudENhc2UgfSBmcm9tICdjb25zdGFudC1jYXNlJ1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VGZWF0dXJlIHtcclxuICBwdWJsaWMgc3RhdGljIHNob3VsZFJ1bk9uY2UgPSBmYWxzZVxyXG4gIHB1YmxpYyBzdGF0aWMgaGFzUnVuID0gZmFsc2VcclxuICBwdWJsaWMgc3RhdGljIGlzQ2xlYW5lZCA9IGZhbHNlXHJcbiAgcHVibGljIHN0YXRpYyBhbHdheXNDbGVhbiA9IGZhbHNlXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiB0aGUgZmVhdHVyZSBjYW4gcnVuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgY2FuUnVuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvdWxkUnVuT25jZSA/ICF0aGlzLmhhc1J1biA6IHRydWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNvZGUgb2YgdGhlIGFmZWF0dXJlXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgY29kZSgpIHtcclxuICAgIHJldHVybiBjb25zdGFudENhc2UodGhpcy5uYW1lKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvZGUgZm9yIGhhbmRsaW5nIHRoZSBmZWF0dXJlXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IGhhbmRsZSgpOiB2b2lkXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb2RlIGZvciBjbGVhbmluZyB1cCB0aGUgZmVhdHVyZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbGVhbnVwKCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBCYXNlRmVhdHVyZSB9IGZyb20gJy4vQmFzZUZlYXR1cmUnXHJcblxyXG5leHBvcnQgY2xhc3MgQnVpbGRlclRpdGxlIGV4dGVuZHMgQmFzZUZlYXR1cmUge1xyXG4gIHB1YmxpYyBzdGF0aWMgYWx3YXlzQ2xlYW4gPSB0cnVlXHJcblxyXG4gIHB1YmxpYyBnZXQgYm90TmFtZSgpIHtcclxuICAgIGNvbnN0IGJvdE5hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvdC1uYW1lOm50aC1jaGlsZCgxKScpXHJcblxyXG4gICAgcmV0dXJuIGJvdE5hbWVFbGVtZW50LmlubmVySFRNTFxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0JlaG9sZGVyKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJykpLmZpbmQoKGlGcmFtZSkgPT5cclxuICAgICAgaUZyYW1lLmdldEF0dHJpYnV0ZSgnc3JjJykuaW5jbHVkZXMoJ2JlaG9sZGVyJylcclxuICAgIClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGUoKSB7XHJcbiAgICBjb25zdCBib3ROYW1lID0gdGhpcy5ib3ROYW1lXHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtib3ROYW1lfSAtIEJsaXBgXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYW51cCgpIHtcclxuICAgIGlmICh0aGlzLmlzQmVob2xkZXIpIHtcclxuICAgICAgZG9jdW1lbnQudGl0bGUgPSAnQmVob2xkZXIgLSBCbGlwJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQudGl0bGUgPSAnQmxpcCBQb3J0YWwnXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEJhc2VGZWF0dXJlIH0gZnJvbSAnLi9CYXNlRmVhdHVyZSdcclxuaW1wb3J0IHsgZ2V0QmxvY2tzLCBzaG93U3VjY2Vzc1RvYXN0IH0gZnJvbSAnLi4vVXRpbHMnXHJcbmltcG9ydCB0eXBlIHsgQmxpcHNDb3B5IH0gZnJvbSAnLi4vdHlwZXMnXHJcblxyXG5leHBvcnQgY2xhc3MgQ29weUJsb2NrIGV4dGVuZHMgQmFzZUZlYXR1cmUge1xyXG4gIC8qKlxyXG4gICAqIE9ubHkgcnVucyB0aGlzIGZlYXR1cmUgb25jZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc2hvdWxkUnVuT25jZSA9IHRydWVcclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUgY29weVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlQ29weSgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXNJZCA9IHRoaXMuZ2V0U2VsZWN0ZWROb2Rlc0lkKClcclxuICAgIGNvbnN0IGhhc1NlbGVjdGVkTm9kZXMgPSBzZWxlY3RlZE5vZGVzSWQubGVuZ3RoID4gMFxyXG5cclxuICAgIGlmIChoYXNTZWxlY3RlZE5vZGVzKSB7XHJcbiAgICAgIHRoaXMuY29weUJsb2NrcyhzZWxlY3RlZE5vZGVzSWQpXHJcbiAgICAgIHNob3dTdWNjZXNzVG9hc3QoJ0Jsb2NvKHMpIGNvcGlhZG8ocykgY29tIHN1Y2Vzc28nKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjb2RlIG9mIHRoZSBzZWxlY3RlZCBibG9ja3MgYW5kIHdyaXRlIHRvIHRoZVxyXG4gICAqIGNsaXBib2FyZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJsb2Nrc0lkIFRoZSBibG9ja3MgaWRzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb3B5QmxvY2tzKGJsb2Nrc0lkOiBhbnlbXSkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRCbG9ja3MgPSBnZXRCbG9ja3MoKS5maWx0ZXIoKGJsb2NrKSA9PlxyXG4gICAgICBibG9ja3NJZC5pbmNsdWRlcyhibG9jay5pZClcclxuICAgIClcclxuXHJcbiAgICB0aGlzLmNvcHlUb0NsaXBib2FyZChzZWxlY3RlZEJsb2NrcylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvcHkgdGhlIGNvbnRlbnQgdG8gdGhlIGNsaXBib2FyZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGNvbnRlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNvcHlUb0NsaXBib2FyZChjb250ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGJsb2Nrc0NvZGUgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KVxyXG5cclxuICAgIHdpbmRvdy5uYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGlzQ29weUZyb21CbGlwczogdHJ1ZSxcclxuICAgICAgICBibG9ja3NDb2RlLFxyXG4gICAgICB9IGFzIEJsaXBzQ29weSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYWxsIHRoZSBzZWxlY3RlZCBub2Rlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0U2VsZWN0ZWROb2Rlc0lkKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RlZC1ub2RlJylcclxuXHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3RlZE5vZGVzKS5tYXAoKG5vZGUpID0+IG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZnVuY3Rpb25hbGl0eSB0byBjb3B5IHRoZSBibG9ja1xyXG4gICAqL1xyXG4gIHB1YmxpYyBoYW5kbGUoKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCB0aGlzLmhhbmRsZUNvcHkuYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY29weSB0aGUgYmxvY2tcclxuICAgKi9cclxuICBwdWJsaWMgY2xlYW51cCgpIHtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29weScsIHRoaXMuaGFuZGxlQ29weS5iaW5kKHRoaXMpKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCYXNlRmVhdHVyZSB9IGZyb20gJy4vQmFzZUZlYXR1cmUnXHJcblxyXG4vKipcclxuICogVGhpcyBmZWF0dXJlIGxlYXZlcyB0aGUgaW5wdXQgaW4gYWN0aW9ucyB3aXRoIHRoZSBleGFjdFxyXG4gKiBzYW1lIGNhc2luZyB0aGF0IHRoZSB1c2VyIHR5cGVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9yaWdpbmFsQ2FzZUlucHV0IGV4dGVuZHMgQmFzZUZlYXR1cmUge1xyXG4gIHB1YmxpYyBoYW5kbGUoKSB7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC50dHUnKVxyXG4gICAgY29uc3QgbGlzdE9mSW5wdXRzID0gQXJyYXkuZnJvbShpbnB1dHMpXHJcblxyXG4gICAgZm9yIChjb25zdCBpbnB1dCBvZiBsaXN0T2ZJbnB1dHMpIHtcclxuICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgndHR1JylcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnXHJcblxyXG5pbXBvcnQgeyBCYXNlRmVhdHVyZSB9IGZyb20gJy4vQmFzZUZlYXR1cmUnXHJcbmltcG9ydCB7XHJcbiAgY2xlYW5Db3BpZWRTdGF0ZXMsXHJcbiAgY2xlYW5TZWxlY3RlZE5vZGVzLFxyXG4gIGdldEJsb2NrcyxcclxuICBnZXRGbG93LFxyXG4gIHNlbGVjdEJsb2NrLFxyXG4gIHNob3dTdWNjZXNzVG9hc3QsXHJcbn0gZnJvbSAnLi4vVXRpbHMnXHJcbmltcG9ydCB0eXBlIHsgQmxpcHNDb3B5IH0gZnJvbSAnLi4vdHlwZXMnXHJcblxyXG5leHBvcnQgY2xhc3MgUGFzdGVCbG9jayBleHRlbmRzIEJhc2VGZWF0dXJlIHtcclxuICAvKipcclxuICAgKiBUaGlzIGZlYXR1cmUgc2hvdWxkIG9ubHkgYmUgZXhlY3V0ZWQgb25jZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc2hvdWxkUnVuT25jZSA9IHRydWVcclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIG9mIGNhY2hlZCBpZHNcclxuICAgKi9cclxuICBwcml2YXRlIGNhY2hlZElkcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KClcclxuXHJcbiAgcHJpdmF0ZSBnZXRJZEZvcihpZDogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5jYWNoZWRJZHMuaGFzKGlkKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZWRJZHMuZ2V0KGlkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld0lkID0gdXVpZCgpXHJcbiAgICB0aGlzLmNhY2hlZElkcy5zZXQoaWQsIG5ld0lkKVxyXG4gICAgcmV0dXJuIG5ld0lkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBjb3B5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVQYXN0ZShldmVudDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IGZsb3cgPSBnZXRGbG93KClcclxuICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKVxyXG4gICAgY29uc3QgYmxpcHNDb3B5ID0gSlNPTi5wYXJzZShjbGlwYm9hcmREYXRhKVxyXG5cclxuICAgIGlmIChpc0NvcHlGcm9tQmxpcHMoYmxpcHNDb3B5KSkge1xyXG4gICAgICBjbGVhbkNvcGllZFN0YXRlcygpXHJcbiAgICAgIGNsZWFuU2VsZWN0ZWROb2RlcygpXHJcblxyXG4gICAgICBjb25zdCBibG9ja3MgPSBKU09OLnBhcnNlKGJsaXBzQ29weS5ibG9ja3NDb2RlKVxyXG5cclxuICAgICAgaWYgKGJsb2Nrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBhbGwgdGhlIGJsb2NrcyB0byB0aGUgZmxvdywgaWYgdGhlIGJsb2NrIGFscmVhZHlcclxuICAgICAgICAgKiBleGlzdHMgaW4gY2FudmFzLCB0aGVuIHRyYW52ZXJzZSB0aGUgYmxvY2sgcmVwbGFjaW5nXHJcbiAgICAgICAgICogdGhlIGlkc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvciAoY29uc3QgYmxvY2sgb2YgYmxvY2tzKSB7XHJcbiAgICAgICAgICB0aGlzLnRyYW5zdmVyc2VCbG9jayhibG9jaylcclxuICAgICAgICAgIGZsb3dbYmxvY2suaWRdID0gYmxvY2tcclxuICAgICAgICAgIHNlbGVjdEJsb2NrKGJsb2NrLmlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWZ0ZXIgaW5jbHVkaW5nIGFsbCB0aGUgYmxvY2sgaW50byB0aGUgZmxvdywgd2UgbmVlZFxyXG4gICAgICAgICAqIHRvIGNoZWNrIGlmIHRoZXkncmUgc3RpbGwgdmFsaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2Nrcykge1xyXG4gICAgICAgICAgdGhpcy50cmVhdEJsb2NrKGJsb2NrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd1N1Y2Nlc3NUb2FzdCgnQmxvY28ocykgY29sYWRvKHMpIGNvbSBzdWNlc3NvJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBpZiB0aGUgYmxvY2sgZXhpc3RzXHJcbiAgICovXHJcbiAgcHVibGljIGJsb2NrRXhpc3RzKGlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nQmxvY2tzSWQgPSBnZXRCbG9ja3MoKS5tYXAoKGJsb2NrKSA9PiBibG9jay5pZClcclxuXHJcbiAgICByZXR1cm4gZXhpc3RpbmdCbG9ja3NJZC5pbmNsdWRlcyhpZClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyZWF0cyB0aGUgYmxvY2sgYnkgYXBwbHlpbmcgdmVyaWZpY2F0aW9ucywgY29ycmVjdGlvbnNcclxuICAgKiBhbmRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBibG9jayBUaGUgYmxvY2tcclxuICAgKi9cclxuICBwcml2YXRlIHRyZWF0QmxvY2soYmxvY2s6IGFueSkge1xyXG4gICAgY29uc3Qgb3V0cHV0cyA9IGJsb2NrLiRjb25kaXRpb25PdXRwdXRzXHJcbiAgICBsZXQgaXNJbnZhbGlkID0gZmFsc2VcclxuXHJcbiAgICBmb3IgKGNvbnN0IG91dHB1dCBvZiBvdXRwdXRzKSB7XHJcbiAgICAgIGlmICghdGhpcy5ibG9ja0V4aXN0cyhvdXRwdXQuc3RhdGVJZCkpIHtcclxuICAgICAgICBpc0ludmFsaWQgPSB0cnVlXHJcbiAgICAgICAgb3V0cHV0LiRpbnZhbGlkID0gdHJ1ZVxyXG4gICAgICAgIGRlbGV0ZSBvdXRwdXQuc3RhdGVJZFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzSW52YWxpZCkge1xyXG4gICAgICBibG9jay4kaW52YWxpZCA9IHRydWVcclxuICAgICAgYmxvY2suaW52YWxpZE91dHB1dHMgPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc3ZlcnNlIHRoZSBibG9jayByZXBsYWNpbmcgaXRzIGlkc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGJsb2NrIFRoZSBibG9ja1xyXG4gICAqL1xyXG4gIHB1YmxpYyB0cmFuc3ZlcnNlQmxvY2soYmxvY2s6IGFueSkge1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGJsb2NrKVxyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuICAgICAgY29uc3QgaXNOZXN0ZWRPYmplY3QgPSB0eXBlb2YgYmxvY2tba2V5XSA9PT0gJ29iamVjdCdcclxuXHJcbiAgICAgIGlmIChpc05lc3RlZE9iamVjdCkge1xyXG4gICAgICAgIHRoaXMudHJhbnN2ZXJzZUJsb2NrKGJsb2NrW2tleV0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgaXNJZCA9IFsnaWQnLCAnJGlkJywgJ3N0YXRlSWQnXS5pbmNsdWRlcyhrZXkpXHJcblxyXG4gICAgICAgIGlmIChpc0lkKSB7XHJcbiAgICAgICAgICBibG9ja1trZXldID0gdGhpcy5nZXRJZEZvcihibG9ja1trZXldKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBwYXN0aW5nIHRoZSBibG9ja1xyXG4gICAqL1xyXG4gIHB1YmxpYyBoYW5kbGUoKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgdGhpcy5oYW5kbGVQYXN0ZS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiBwYXN0aW5nIHRoZSBibG9ja1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjbGVhbnVwKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdwYXN0ZScsIHRoaXMuaGFuZGxlUGFzdGUuYmluZCh0aGlzKSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGlzQ29weUZyb21CbGlwcyA9IChkYXRhOiBhbnkpOiBkYXRhIGlzIEJsaXBzQ29weSA9PiAhIWRhdGEuaXNDb3B5RnJvbUJsaXBzXHJcbiIsImV4cG9ydCAqIGZyb20gJy4vQmxpcFRpdGxlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0NvcHlCbG9jaydcclxuZXhwb3J0ICogZnJvbSAnLi9QYXN0ZUJsb2NrJ1xyXG5leHBvcnQgKiBmcm9tICcuL09yaWdpbmFsQ2FzZUlucHV0J1xyXG4iLCJleHBvcnQgY2xhc3MgUmVzb2x2ZXIge1xyXG4gIC8qKlxyXG4gICAqIFRoZSByZXNvbHZlcnNcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHJlc29sdmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbj4oKVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGlmIHRoZSByZXNvbHZlciBhc3NvY2lhdGVkIHRvIGlkZW50aWZpZXIgaXMgc3RpbGwgd2FpdGluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkZW50aWZpZXIgVGhlIGlkZW50aWZpZXJcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzV2FpdGluZyhpZGVudGlmaWVyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnJlc29sdmVycy5oYXMoaWRlbnRpZmllcilcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGEgcmVzb2x2ZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZGVudGlmaWVyIFRoZSBpZGVudGlmaWVyXHJcbiAgICogQHBhcmFtIHJlc29sdmUgVGhlIHJlc29sdmVyXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyByZWdpc3RlcihpZGVudGlmaWVyOiBzdHJpbmcsIHJlc29sdmU6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLnJlc29sdmVycy5zZXQoaWRlbnRpZmllciwgcmVzb2x2ZSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzb2x2ZXMgdGhlIG9yZGVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWRlbnRpZmllciBUaGUgaWRlbnRpZmVpclxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVzb2x2ZShpZGVudGlmaWVyOiBzdHJpbmcsIHJlc3VsdDogYW55KSB7XHJcbiAgICBjb25zdCBpc1JlZ2lzdGVyZWQgPSB0aGlzLnJlc29sdmVycy5oYXMoaWRlbnRpZmllcilcclxuXHJcbiAgICBpZiAoaXNSZWdpc3RlcmVkKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmUgPSB0aGlzLnJlc29sdmVycy5nZXQoaWRlbnRpZmllcilcclxuXHJcbiAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICB0aGlzLnJlc29sdmVycy5kZWxldGUoaWRlbnRpZmllcilcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbGxlcigpIHtcclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJylcclxuXHJcbiAgcmV0dXJuIHdpbmRvdy5hbmd1bGFyLmVsZW1lbnQoY2FudmFzKS5jb250cm9sbGVyKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZsb3coKSB7XHJcbiAgcmV0dXJuIGdldENvbnRyb2xsZXIoKS5mbG93XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRCbG9ja3MoKTogYW55W10ge1xyXG4gIHJldHVybiBPYmplY3QudmFsdWVzKGdldEZsb3coKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdWNjZXNzVG9hc3QobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgZ2V0Q29udHJvbGxlcigpLm5nVG9hc3Quc3VjY2VzcyhtZXNzYWdlKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RhbmdlclRvYXN0KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gIGdldENvbnRyb2xsZXIoKS5uZ1RvYXN0LmRhbmdlcihtZXNzYWdlKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5Db3BpZWRTdGF0ZXMoKSB7XHJcbiAgZ2V0Q29udHJvbGxlcigpLmNvcGllZFN0YXRlcyA9IFtdXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RCbG9jayhpZDogc3RyaW5nKSB7XHJcbiAgY29uc3Qgd2F0Y2hOb2RlID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1aWxkZXItbm9kZVtpZD1cIiR7aWR9XCJdYClcclxuXHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICBnZXRDb250cm9sbGVyKCkuc2VsZWN0Tm9kZShub2RlKVxyXG4gICAgICBjbGVhckludGVydmFsKHdhdGNoTm9kZSlcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5TZWxlY3RlZE5vZGVzKCkge1xyXG4gIGdldENvbnRyb2xsZXIoKS5zZWxlY3RlZE5vZGVzID0gW11cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9