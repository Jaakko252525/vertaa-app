"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browsing = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// function that searches tori.fi with parameter 
const browsing = async (item) => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto('https://www.tori.fi/koko_suomi?q=' + item);
    // searching elements
    const itemRowsSelector = '.item_row_flex';
    let items = await page.$$eval(itemRowsSelector, (elements) => {
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
    await browser.close();
    return newArrayOfItems;
};
exports.browsing = browsing;
