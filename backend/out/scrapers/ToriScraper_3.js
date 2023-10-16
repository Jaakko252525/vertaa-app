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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browsing = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// function that searches tori.fi with parameter 
const browsing = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto('https://www.tori.fi/koko_suomi?q=' + item);
    // searching elements
    const itemRowsSelector = '.item_row_flex';
    let items = yield page.$$eval(itemRowsSelector, (elements) => {
        return elements.map(element => {
            //@ts-ignore
            const text = element.textContent.replace(/[\n\t]/g, ' ').trim();
            return text;
        });
    });
    // extra spaces out
    let count = 0;
    let newArrayOfItems = [];
    while (count < items.length) {
        let item = items[count].replace(/\s+/g, " ");
        newArrayOfItems.push(item);
        count += 1;
    }
    // other actions...
    yield browser.close();
    return newArrayOfItems;
});
exports.browsing = browsing;
