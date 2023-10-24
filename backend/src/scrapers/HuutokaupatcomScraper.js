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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.callingScraper = void 0;
var playwright_1 = require("playwright");
var huutokaupatScraper = function (searchWord) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, arrayOfSales_1, extractTextRecursively_1, elements, _i, elements_1, element, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playwright_1.default.chromium.launch({
                    headless: true,
                })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://huutokaupat.com/haku?term=" + searchWord)];
            case 3:
                _a.sent();
                console.log('went to page');
                _a.label = 4;
            case 4:
                _a.trys.push([4, 11, 12, 14]);
                arrayOfSales_1 = [];
                extractTextRecursively_1 = function (element) { return __awaiter(void 0, void 0, void 0, function () {
                    var text, children, _i, children_1, child;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, element.textContent()];
                            case 1:
                                text = _a.sent();
                                arrayOfSales_1.push(text);
                                return [4 /*yield*/, element.$$(".list-entry.visible *")];
                            case 2:
                                children = _a.sent();
                                _i = 0, children_1 = children;
                                _a.label = 3;
                            case 3:
                                if (!(_i < children_1.length)) return [3 /*break*/, 6];
                                child = children_1[_i];
                                return [4 /*yield*/, extractTextRecursively_1(child)];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 3];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, page.$$(".list-entry.visible")];
            case 5:
                elements = _a.sent();
                _i = 0, elements_1 = elements;
                _a.label = 6;
            case 6:
                if (!(_i < elements_1.length)) return [3 /*break*/, 9];
                element = elements_1[_i];
                return [4 /*yield*/, extractTextRecursively_1(element)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 6];
            case 9: return [4 /*yield*/, browser.close()];
            case 10:
                _a.sent();
                return [2 /*return*/, arrayOfSales_1];
            case 11:
                error_1 = _a.sent();
                console.log('somethings wrong', error_1);
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, browser.close()];
            case 13:
                _a.sent();
                return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
var callingScraper = function (searchWord) { return __awaiter(void 0, void 0, void 0, function () {
    var sales;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, huutokaupatScraper(searchWord)];
            case 1:
                sales = _a.sent();
                return [2 /*return*/, sales];
        }
    });
}); };
exports.callingScraper = callingScraper;
