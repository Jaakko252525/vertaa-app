import { Console } from "console";
import { raw } from "express";

const puppeteer = require('puppeteer');

// navigate item
const navigateToItem = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    await page.goto('https://www.tori.fi/koko_suomi?q=gameboy');
    console.log('succesful goto page')


  //
  const rowData = await page.evaluate(() => {
    const dataRows = document.querySelectorAll('[data-row]');
    //@ts-ignore
    const rowData = [];

    dataRows.forEach(row => {
      const rowNumber = row.getAttribute('data-row');
      const content = row.textContent;

      rowData.push({ rowNumber, content });

    });
    //@ts-ignore
    return rowData;
  });  


  // Log the extracted data
  const prettyRawData = await JSON.stringify(rowData, null, 2)


  
  const dataWithoutN = prettyRawData.replaceAll("n", "")
  const clearerData = dataWithoutN.replaceAll("t", "")


  // loop through if \ start getting letter

  let word = ''
  let count = 0

  let array = []

  const onlyLettersAndNumbers = (str: string) => {
    return /^[A-Za-z0-9]*$/.test(str);
  }

  while (count < clearerData.length) {

    if ( onlyLettersAndNumbers(clearerData[count]) === true ) {

      word += clearerData[count]
  
     } else {
          if (word.length > 0) {
            array.push(word)
            word = ''}


     }
    count += 1
  }


  let count_2 = 0

  let sale = []

  let arrayOfSales = []


  // if "myyd" dont add array
  while (count_2 < array.length) {

    if ( array[count_2] !== "Myyd" ) {
      sale.push(array[count_2])

    } else if ( array[count_2] === "Myyd" ) {
        arrayOfSales.push(sale)
        sale = []
    }

    count_2 += 1

  }

  console.log('arrayOfSales', array)







  //
  /*
    const firstListItemContent = await page.evaluate(() => {
      const listItem = document.querySelector('.list_mode_thumb');
      if (listItem) {

        return listItem.textContent; // Or extract any other data you need
      }
      return null;
    });
  
    const rawData = firstListItemContent.replace(/\s/g, '')
    console.log('Content of the first list_mode_thumb element:', rawData);

  */

  
    await browser.close();
  }

  
navigateToItem()