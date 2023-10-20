

// cheerio
import * as cheerio from 'cheerio';

import axios from 'axios';

// baseURL
const baseUrl = 'https://www.huuto.net/haku?words='


// function that fetches sales
export const getHuutoNetSales = async (item: string) => {

    // get req to baseURL + item searched
    const loadedPage = await axios.get(baseUrl + item)


    const html = loadedPage.data

    // use cheerio 
    const $ = cheerio.load(html)

    // className that we want to fetch
    const sales = $(".grid-element-container.item-card-container")

 
    // empty array
    let arrayOfSales = []

    // loop elements and put them to array
    // Loop through the selected elements
    for (const sale of sales) {
        const text = $(sale).text().replace(/\s+/g, " ");
        arrayOfSales.push(text)
}

    return arrayOfSales
}



















