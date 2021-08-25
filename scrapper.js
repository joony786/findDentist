// import * as puppeteer from 'puppeteer'
const puppeteer = require('puppeteer');

(async () => {
const url = 'https://search.abdenturists.ca/'
    const url2 = 'https://www.abdenturists.ca/search/'
const browser = await puppeteer.launch(({headless: false}));
const page = await browser.newPage();
await page.setRequestInterception(true);

const formData = {
    keywords: 'a',
    filter: 'fName',
}
page.on('request', interceptedRequest => {


    const data = {
        'method': 'POST',
        // 'postData': 'keywords=a&filter=fName'
        "postData": "ctl04=ctl04%7CbtnSearch&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=FptILrukxC4V9MSGuJHMVNX6LCmhsW7v7VmLFLHdLvFFivTHtQwoKAgKBFzXokcyM0ylBR%2BzpYRBqgP6VeZd19Ffm2tYk6GzaZAx8TLD%2BjsHGVbVqQ6%2FZhlyrUn4GXZ5hGWtieUww3nNXmDG4%2Bn7LDjpSIDqToyYJOKGCkIvOwkIMVzCE8KdPLlc6%2Fqjy0UOA7DcYolhRL4CGFVQMae2qDZgcxUTaXyaO40UKwrOmRjuK5P%2BIsjii1qfGVPgKyj2&__VIEWSTATEGENERATOR=CA0B0334&__EVENTVALIDATION=ONNr43wbzKcicQt%2FTYELAGrZa0uP%2FZcTyNMo%2BHxG0ts2nRFId1EKwQJrPs9V0xsXR9hB2nYwWmIIXKt0DOFnNCwS461KagD0m5lFwO7usxvwe%2FOPNIpyeydME49nA2%2Fp8YThhDZRVuTNSvI9sfn8buyBEMqK4cbTnVS64t7uKdt7yRaPFUbWlLoQcTnEHv6XrGHFqMbG3MnGRuw8MvBqOOf8diwJ9ZxtqtYda7xBdiE%3D&keywords=&filter=fName&__ASYNCPOST=true&btnSearch=Search",

    };


    // Request modified... finish sending!
    interceptedRequest.continue(data);
});

// Navigate, trigger the intercept, and resolve the response
const loadPage = await page.goto(url2,{waitUntil: 'domcontentloaded'});
const responseBody = await loadPage.text();
console.log(responseBody);
    await loadPage.evaluate(() => {
        const keyWord = document.getElementById(('#keywords'));
        console.log(keyWord,'input ')
        keyWord.value = 'a';
    });
// Close the browser - done!
    await browser.close();
})();
