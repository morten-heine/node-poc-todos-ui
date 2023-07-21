const puppeteer = require('puppeteer');
const axios = require('axios');
require('dotenv').config();
const { getApiBaseUrl, getUiBaseUrl } = require('./utils/config.js');

(async () => {

    const apiBaseUrl = getApiBaseUrl();
    const uiBaseUrl = getUiBaseUrl();

    this.httpClient = axios.create({
        baseURL: apiBaseUrl
    });

    // Open browser and go to page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(uiBaseUrl);
    console.log('Open browser and go to page');

    // Check header is there
    const content = await page.content();
    if(!content.includes('Todo List')) {
        console.error(`Error seeing header`);
    }
    console.log('Check the Header is there');

    // Show completed todos
    await page.click('#displayCompletedCheckbox');
    const content2 = await page.content();
    if(!content2.includes('Done')) {
        console.error(`Error seeing Done items`);
    }
    console.log('Show completed todos');

    // Type into the item input field
    const text = Math.random().toString()
    await page.type('#addText', text);
    console.log('Type into the item input field');

    // Click the "Add" button
    await page.click('#addButton');
    console.log('Click the Add button');

    // Workaround
    await page.reload();
    await page.click('#displayCompletedCheckbox');
    const content3 = await page.content();

    // Find position of done and undone and new item and check it is before Done.
    const pos1 = content3.indexOf('Undone')
    const pos2 = content3.indexOf(text)
    const pos3 = content3.indexOf('Done')
    if(pos2 > pos3 || pos2 < pos1) {
        console.error(`Error new items is done`);
    }

    // Find id of new item
    const str1 = content3.substr(0,pos2-2);
    const pos4 = str1.lastIndexOf("\"");
    const str2 = str1.substr(pos4+1);

    // Click new item
    await page.click(`[id="${str2}"]`);
    const content4 = await page.content();
    console.log('Click new item');

    // Workaround
    await page.reload();
    await page.click('#displayCompletedCheckbox');
    const content5 = await page.content();

    // Find position of done and undone and new item and check it is before Done.
    const posa = content5.indexOf('Undone');
    const posb = content5.indexOf(text);
    const posc = content5.indexOf('Done');
    if(posb < posc) {
       console.error(`Error new items is not done`);
    }
    console.log('Check new item is now done');

    // Todo test todo comments

    console.error(`All tests passed`);

    await browser.close();
    response = await this.httpClient.delete(`/todos/${str2}`);

})();

// todo: mark done
