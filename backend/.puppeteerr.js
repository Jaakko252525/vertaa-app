import { join } from 'path';

/**
 * @type {import("puppeteer").Configuration}
 */
export const cacheDirectory = join(__dirname, '.cache', 'puppeteer');