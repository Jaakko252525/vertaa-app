"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHuutoNetSales = void 0;
// cheerio
const cheerio = __importStar(require("cheerio"));
const axios = require('axios');
// baseURL
const baseUrl = 'https://www.huuto.net/haku?words=';
// function that fetches sales
const getHuutoNetSales = async (item) => {
    // get req to baseURL + item searched
    const loadedPage = await axios.get(baseUrl + item);
    const html = loadedPage.data;
    // use cheerio 
    const $ = cheerio.load(html);
    // className that we want to fetch
    const sales = $(".grid-element-container.item-card-container");
    // empty array
    let arrayOfSales = [];
    // loop elements and put them to array
    // Loop through the selected elements
    for (const sale of sales) {
        const text = $(sale).text().replace(/\s+/g, " ");
        arrayOfSales.push(text);
    }
    return arrayOfSales;
};
exports.getHuutoNetSales = getHuutoNetSales;
