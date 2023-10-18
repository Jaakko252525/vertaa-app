


import puppeteer from 'puppeteer';
import { join } from 'path';

// function that searches tori.fi with parameter 
export const browsing = async (item: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  
  /**
   * @type {import("puppeteer").Configuration}
   */
  module.exports = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  };
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
    let count = 0
    let newArrayOfItems = []

    while (count < items.length) {

      let item = items[count].replace(/\s+/g, " ");
      newArrayOfItems.push(item)

      count += 1
    }



    

  // other actions...
  await browser.close();

  return newArrayOfItems


}




