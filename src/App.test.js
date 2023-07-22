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
    const browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();
    await page.goto(uiBaseUrl);
    console.log('Opened browser and go to page');

    // Check header is there
    const content = await page.content();
    if(!content.includes('Todo List')) {
        console.error(`Error seeing header`);
    }
    console.log('Checked the Header is there');

    // Show completed todos
    await page.click('#displayCompletedCheckbox');
    const content2 = await page.content();
    if(!content2.includes('Done')) {
        console.error(`Error seeing Done items`);
    }
    console.log('Showed completed todos');

    // Type into the item input field
    const text = Math.random().toString()
    await page.type('#addText', text);
    console.log('Typed into the item input field');

    // Click the "Add" button
    await page.click('#addButton');
    console.log('Clicked the Add button');

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
    console.log('Clicked new item');

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
    console.log('Checked new item is now done');

    const commentButtons = await page.$$('.todo-row .button');
    await commentButtons[commentButtons.length-1].click();
    const content6 = await page.content();
    console.log('Navigated to the comments page for first item');

    // Wait for the input and button to load on comments page
    await page.waitForSelector('input[type="text"]');
    await page.waitForSelector('.button');

    const newComment = 'New test comment';
    await page.type('input[type="text"]', newComment);
    console.log('Entered commment');

    const addCommentButton = await page.$('.button');
    await addCommentButton.click();
    console.log('Clicked the Add Comment button');

    await page.waitForFunction(
        (newComment) => {
            const comments = Array.from(document.querySelectorAll('.comment dt'));
            return comments.some((comment) => comment.textContent.includes(newComment));
        },
        {},
        newComment
    );
    console.log('Checked the comment is there');

    // Click the "Back to Main Page" button
    const backButtons = await page.$$('.button');
    await backButtons[1].click(); // the second button is the back button

    console.error(`All tests passed`);

    await browser.close();
    response = await this.httpClient.delete(`/todos/${str2}/comments`);
    response = await this.httpClient.delete(`/todos/${str2}`);

    console.error(`Cleaned up data`);

})();
