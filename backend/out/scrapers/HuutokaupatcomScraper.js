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
exports.callingScraper = void 0;
const playwright_1 = __importDefault(require("playwright"));
const huutokaupatScraper = (searchWord) => __awaiter(void 0, void 0, void 0, function* () {
    // Launch the headless browser 
    const browser = yield playwright_1.default.chromium.launch({
        headless: true,
    });
    // Go to the dev.to/tags page 
    const page = yield browser.newPage();
    yield page.goto("https://huutokaupat.com/haku?term=" + searchWord);
    console.log('went to page');
    try { // locate className
        // Recursive function to extract text content from an element and its children
        let arrayOfSales = [];
        //@ts-ignore
        const extractTextRecursively = (element) => __awaiter(void 0, void 0, void 0, function* () {
            const text = yield element.textContent();
            arrayOfSales.push(text);
            const children = yield element.$$(".list-entry.visible *");
            for (const child of children) {
                yield extractTextRecursively(child);
            }
        });
        // Locate and extract text from elements with the specified class name
        const elements = yield page.$$(".list-entry.visible");
        for (const element of elements) {
            yield extractTextRecursively(element);
        }
        yield browser.close();
        return arrayOfSales;
    }
    catch (error) {
        console.log('somethings wrong', error);
    }
    finally {
        yield browser.close();
    }
});
const callingScraper = (searchWord) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield huutokaupatScraper(searchWord);
    return sales;
});
exports.callingScraper = callingScraper;
