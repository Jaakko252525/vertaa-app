import { Console } from "console";
import { raw } from "express";

const puppeteer = require('puppeteer');

// navigate item
const navigateToItem = async () => {

    // launching headless 
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    // goto webpage
    await page.goto('https://www.tori.fi/koko_suomi?q=gameboy');
    console.log('succesful goto page')


  //
  const rowData = await page.evaluate(() => {
    const saleApplication = document.querySelectorAll('[list_mode_thumb]');
    //@ts-ignore
    const rowData = [];


    console.log('here')

    saleApplication.forEach(sale => {
      const rowNumber = sale.getAttribute('data-row');
      const product = sale.getAttribute('li-title');



      console.log('name', product)

      rowData.push( rowNumber );

    });
    //@ts-ignore
    return rowData;
  });  


    console.log('row data', rowData)

    await browser.close();
  }

  
navigateToItem()