const puppeteer = require('puppeteer');
const cheerio = require("cheerio");
const searchPage = 'https://www.abdenturists.ca/search/';
const fs = require('fs')
const path = require("path");
const json2csv = require("json2csv").parse;
const csvWriter = require('csv-write-stream')
const XLSX = require('xlsx')

const searchPattern = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ];
// const searchPattern = ['c','d' ];
const args = [
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process'
];
const fields = ["Name", "registrationNumber", "registrationType",'effectiveDate','endDate','practiceName','Conditions'];
const returnFormattedDate = function () {
    const date = Date.now()
    const currentDate = new Date(date)
    const hours = currentDate.getHours()
    const seconds = currentDate.getSeconds()
    const minutes = currentDate.getMinutes()
    return `${hours}_${minutes}_${seconds}`
}
const writeStream = fs.createWriteStream('data.csv');
const todayDate = returnFormattedDate()
const fileName = 'scrapperData'
const NewFileName = fs.createWriteStream(`${fileName}_${todayDate}.xlsx`);
const NewFileName2 = fs.createWriteStream("data12.xlsx");
let writeStreamText = fs.createWriteStream('scrapper.txt');
const writeFile = fs.createWriteStream('test.csv');
const writer = csvWriter({ headers: fields,sendHeaders: true})
writer.pipe(fs.createWriteStream('out.csv',{flags: 'a'}))

    writeStream.write(`Name,registrationNumber,registrationType,effectiveDate,endDate,practiceName,Conditions \n`);
    writeFile.write(`Name,registrationNumber,registrationType,effectiveDate,endDate,practiceName,Conditions \n`);
let DataObject = []
const ScrapData = async (letter) => {
    const browser = await puppeteer.launch(({headless: true,args,slowMo:100}));
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
    await page.goto(searchPage, {waitUntil: 'networkidle0'});
    await page.setViewport({
        width: 1300,
        height: 800
    });

    // await autoScroll(page);
    await navigationPromise;
    await page.waitForSelector('#advanced_iframe')
    const elementHandle = await page.$(
        'iframe[src="https://search.abdenturists.ca"]',
    );
    const frame = await elementHandle.contentFrame();
    console.log('filling form in iframe');
    await frame.type('#keywords', letter, { delay: 100 });
    await page.waitForTimeout(1000);
    console.log('clicking btn')
    await frame.click('#btnSearch')
    await page.waitForTimeout(1000);
    console.log('btn clicked')
    console.log('data loaded')
    await page.waitForTimeout(1000);
    const text = await frame.evaluate(() => {
        return document.querySelector('#search').innerHTML
    });
    let removedSpaces = text.replace(/\s\s+/g, '')
    const $ = cheerio.load(removedSpaces)
    console.log('writing data')
    $('.row').each((i,elm)=>{
        if(i%2 === 0)
        {
            const Name = $(elm).find('.col-sm-12 > h2').text()
            const registrationNumber = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(1) > p:nth-child(1)').text().split(':')[1]
            const registrationType = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(1) > p:nth-child(2)').text().split(':')[1]
            const effectiveDate = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(2) > p:nth-child(1)').text().split(':')[1]
            const endDate = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(2) > p:nth-child(2)').text().split(':')[1]
            const practiceName = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(3) > p:nth-child(1)').text().split(':')[1]
            const Conditions = $(elm).find('.col-sm-12 > .row > .col-sm-4:nth-child(3) > p:nth-child(2)').text()
            const Data =
                {
                    'Name': Name,
                    'registrationNumber': registrationNumber,
                    'registrationType': registrationType,
                    'effectiveDate': effectiveDate,
                    'endDate': endDate,
                    'practiceName': practiceName,
                    'Conditions': Conditions
                }

            writer.write({
                Name,
                registrationNumber,
                registrationType,
                effectiveDate,
                endDate,
                practiceName,
                Conditions
            })
            DataObject.push(Data)
            // write("test.csv", fields, Data);
            // writeStream.write(`${Name},${registrationNumber},${registrationType},${effectiveDate},${endDate},${practiceName},${Conditions} \n`);
        }
    // })
    })
    console.log('scraping done')
    writer.end();
    await browser.close();
}

const getFinalData =   async ()=>{
    for(let letter of searchPattern){
        console.log('currently Scraping Letter:', letter);
       await ScrapData(letter)
    }
    let binaryWS = XLSX.utils.json_to_sheet(DataObject);
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, binaryWS, 'scrapped data')
    XLSX.writeFile(wb, "data12.xlsx");
    console.log('all done')
// return writeStreamText.write(DataObject)
}

getFinalData().then(r => console.log(r))


    async function autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }


// Constructor method to assist our ReadFileSync
const readFileSync = filePath =>
    fs.readFileSync(filePath, { encoding: "utf-8" });


const findWord = async (text, filePath) => {
    const result = readFileSync(path.join(__dirname, filePath));
    return Promise.resolve(RegExp("\\b" + text + "\\b").test(result));
};

const write = async (fileName, fields, data) => {
    // output file in the same folder
    const filename = path.join(__dirname, "CSV", `${fileName}`);
    let rows;

    // I check if there is a header with these items
    const hasValue = await findWord("Name,registrationNumber,registrationType,effectiveDate,endDate,practiceName,Conditions", "./test.csv");
    console.log(hasValue,'hasValue')
//  If there is a header I add the other lines without it if I don't follow the natural flow
    if (hasValue) {
        rows = json2csv(data, { header: false });
    } else if (!fs.existsSync(fields)) {
        // If file doesn't exist, we will create new file and add rows with headers.
        rows = json2csv(data, { header: true });
    } else {
        // Rows without headers.
        rows = json2csv(data, { header: false });
    }

    // I deal with the information by removing the quotes
    const newRows = rows.replace(/[\\"]/g, "");
    // Append file function can create new file too.
    await fs.appendFileSync(filename, newRows);
    // Always add new line if file already exists.
    await fs.appendFileSync(filename, "\r\n");
};
