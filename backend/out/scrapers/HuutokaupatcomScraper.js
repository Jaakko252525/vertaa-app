import playwright from "playwright";
const huutokaupatScraper = async (searchWord) => {
    // Launch the headless browser 
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    // Go to the dev.to/tags page 
    const page = await browser.newPage();
    await page.goto("https://huutokaupat.com/haku?term=" + searchWord);
    console.log('went to page');
    try { // locate className
        // Recursive function to extract text content from an element and its children
        let arrayOfSales = [];
        //@ts-ignore
        const extractTextRecursively = async (element) => {
            const text = await element.textContent();
            arrayOfSales.push(text);
            const children = await element.$$(".list-entry.visible *");
            for (const child of children) {
                await extractTextRecursively(child);
            }
        };
        // Locate and extract text from elements with the specified class name
        const elements = await page.$$(".list-entry.visible");
        for (const element of elements) {
            await extractTextRecursively(element);
        }
        await browser.close();
        return arrayOfSales;
    }
    catch (error) {
        console.log('somethings wrong', error);
    }
    finally {
        await browser.close();
    }
};
export const callingScraper = async (searchWord) => {
    const sales = await huutokaupatScraper(searchWord);
    return sales;
};
