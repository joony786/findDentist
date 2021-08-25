// import * as cheerio from 'cheerio';
// import axios from "axios";
const cheerio = require('cheerio');
const axios = require('axios')

const url = 'https://search.abdenturists.ca/'
const url2 = 'https://www.abdenturists.ca/search/'
const formData = {
    keywords: 'b',
    filter: 'fName',
}
let data2 = {
    ctl04: 'ctl04%7CbtnSearch',
    __EVENTTARGET:'',
    __EVENTARGUMENT:'',
keywords: 'b',
filter: 'fName',
__VIEWSTATE: '7jlxlPCT4Kg78OxInfkjPmGnw2F21NLck3cbe9cHzmG1MZASR4twxwK9IuVFHTIcxyclMvsu21mkpYma7%2BR8aOD3UEPOBsFqNvCaLviV%2BmhcigXhrsYQ0%2FpDrRWTRcq8XEBzZmr0Kop%2FLrnWP2LKuQlNz35bTKIRcxFlDeYj8sL7xHMvWcSsrNWv8v9Ls4ApLDx5SAn7GgY%2FjfUjHG%2FAs2yNpeU6dEL%2BuRIlL%2BRL34il0Y6rtmPTgeto29%2BvqBuWZtzCIBgeimEWnbdljqTFnCEiBf6UBoW7PQTYA5NwH1x5iNT1bTr4oGJNx3a7OhLdtrWV18jKfGQBrxMvqCF6T0jeASE0CRjBm7vtKOkMVfPLtXj0K91k5QFM8bPDS7ayS3ScfE1F%2BmHNOBDQMEmX8%2Fle4qUzybSP4GZFc3l6nyvKERjkHvwrP4lMR%2BXMO40MyWUAdx489MUbCQoUHBq6yneFx%2FdNA38agLp3Wg2mTafG%2FgBFgWKtjHgIXQqJJFrf%2FG4GlAoqzX8d8Z8Vcail7oSQhQ2wTcYu1KGYp3TRjcJiCO27Ww%2FOTFdVTEOM2c%2Bkuf0xsxDzDBEN9Tuf9wme%2B1qfuUSXJo7HPqWOdc9Jn1OUOcWDt6dYsj4Hw%2F8GpQh6UNsGOsz80QUjyOg3QI%2BeDEkjXniaYvOXunMNa8CaQXWCYpXwPdI5i04Lpf7AWBDoKJBY8nGUqTkydXPcePvkfBxmS4oxL05m4aahdwcUj0pat%2BoQbWUO4uFqY3MN3wdByevDVGAl4LKlaRjw8zxYjPwjFVQyN94dobn0NNGYui9wjWBBevHqc5N1atJzG0VaEFSHxRTCUsjkh80L%2FqqCe783qG9VS%2FYJ2zhqCa9HhTfsxoj49r%2FJRl8WXMiAdqRv%2BclsmlYkEgKlSp16c6A3EwvB7J4TIEKNHHx7SH8SJJsvKu379idwbuTM1jrGziksM19CAVM8tPHAG5RmnZqY5HwaroT4c1m2gArP0sk4BKPWpRGxA7v1W1eurMuhAfk9d7uvFel7G%2FCK5vEh2%2BXFlNfW4R6gZD%2Bej1Xigr%2FyisYsSfiIW95DLiOIHK7aCsbWxzIqFAcQkZqE58SgWG3kIyUlY4nI5rhgcgZhsncT2xnPZ3ovlvmelDckIzwbERP7qzRsH7WJ5PBn35tBBDhr0rv%2Bp%2FsyKx8Iczyc3cDtsXoTTqVrggvyM1c0VvP1jj3SHeHRihY6qAxxFqtQvHKNyIvfOyNA6Lqn4FF5Ms66YQDsnliJ6y9VJj05H1yYqwBaWkTmv%2BOFI69cDg33tHeCUc92SrhLBk%2B8bHqoBzBO2DIiVi9p%2BabdziG1pZ65Bp0z9vuP4hq2tCxmA9QI5j9uMKbQCsAf22%2BJd%2F0YRTb8xqqjmGqcdkkmd8wiPMrefmPl5bPyojKEqfxj4LkBoJIg77R1oCjXwamV%2FfmkEVpEO%2Bq%2BMG%2B7KG0x6JOX30pkc0brm0TQtkjRghw100v2XZawfMtwBakaD8ZUVwsehzr5GMVp%2FRnEGDATkLrZzLL2Od5cAokOuBl42xsMAw845UZAXcgRJbkvw2mN%2BBOvsyxcuwl%2F%2BUl750QPQUPjprSRqnkKX%2FOQ190bE83jjfBD6JIv56EubQp8KkO%2B%2B0z9nQ2ZajoFTkKkWP8Dbbw5t2OiR7MGPMus6fUhnP7mharj4G1S3JUktRloWnB0uJyKffjHml9QRoiCs8Gk3PhJSbRxYTGedIqQY24nzqY%2FW9Eu8l6fi4IDAHIVWmqKAE%2BSY%2BRbJKhLZFB7j%2FE0ipX0WRVS7kH8vBZ9yVDeviukOELvmAKVN9%2F8xkSMbn9UxaJHYbSxIWnK3CifAmu%2BGSxWCVGcTERRwI8irXhbbfyVwxFc36RBY%2FNopHANzCodDmrs6d0aoN5%2F7Aamlo%2B%2F1AwmfTovy7yw6a95v0NmuRExwl%2BTCjnBbqR0%2FxVWCjGJsizNRMGXZD4%2BJSq2B%2BAGdYHdk0KEh8uOIHHOqKmTo0jhMdLcXxBmPT3TgKNh6r4mzdYVeFkheM1yMC6PA1mNQ3MlK2BAnIxiQSpyWt8MpEjkFZG2tPPxwNAQ8%2F%2FucU%2BvINDUs5yNs7HjtULMItuC%2F94HRCcijt1ekRtw%2Ff1TCeQHmPnr6qJ0Ft7wcszlzFDZyOFPOokecjCV38BxQ3yR2cVk9AuS4TdQccOeBVoQZ07XtkHIN0P%2B6MhJWPThnviy%2Fa%2BhN9be9HxU6mGbj52xjaZqCcSmGIBfWvPk0JHA%2BZl7J9X64RW2plnAAFGhlM1bIoVUqbQA%2FmXOwSB%2FOcv0ECv90VqMdKdoCN4UXOTgjx7yYJW8NDVEQAjvnr7QjXURVwlyqygTJA29mEgGX6%2FryFTyzz%2FOsEAaC2Fxf6iy6AJR9iKlsquS25gj7K9M2YH9J%2BnrgdKzjisJE8lKJXvkOjU0fSx4fZARewKRUXjdXyBaovSFpmLO%2BHW7%2Fvb33o5qHzYWJIFoqaJWN788mG8hdfWIrx3wnfp%2BRmR0lHg9RIIMJOqsC%2FyNB4r6baajFEdf7l3QjOEhkmJriMZw2wXRG6MqQj1%2BHLyaeTxZJbsp6hykY6f239JF99vF121dVe%2FyTOqbsUhryCR44fwt3sF%2BxY%2FPQwQAwXDv4exU%2FGL1WfiO0zRkn8mrrpVFISStY%2BKRF80O3%2BCrBFu8I6KJa7%2BNcNzjtfyN2CxK9XOpg%2BS9G%2FnQH%2Bu8l4%2FidgJFq1Ft0p42hLW9l58hJbbQ565YPSSgzzqhEgfwymtlAMia6ZFk%2FWNtBfW%2FPtFwJ%2FQgrRNjw%2B0QaiLCy12iKMb9LQ54CHuo5KbZtYhIKYQIj%2F78D7yA8frZ0sX4lev%2B6M4fBQLs%2B9EcRfRebqfo4%2BzqYgkZoOXGKAkBOo90JbIiGEDArxpD0xuoCaFpTp293M5EfgxpkW9x9c8T3%2BGReh2yQSMH3K7eqKyCq7fXHl%2BXqh6fnqx%2FkWJwvnzGPNkiYsDGB9RwAEsqBo3v%2F9XEt0%2BfCzjHcDMGiVg2U52mrE2OTu4LQ5qB%2BHQFcike7%2BX9EQnIY30OAI9UCcQh%2BZujiwEoyHzt49KcFgVGXPlsyd9lSwHP64Rc11E%2FuRNj3uG89Rs7tye2fajQ3PAlMmc8vUuu56csxtmDfclkkRGJAhmNEcdNmYORDD7g72hzrMuW%2FmnVEYjVQkphKkWgAhQDVxhAdxuRUJHOotkgTO72d0GutrqRdwDaDulAztHAtIzsONBZ15IGJnlb8uGXC6mYtiL%2FFUg4lknYO5ZwcomCRgMYSLTF93mpnXvLd3A2a%2Bv9QgFYR9kzCoPWVX8%2F5zdj5FIABqj02XLEoC%2FwBKcFZnH37q9umOf5WlWdq8C%2Bz6AN%2FOfDuhVlHXxaU4KWQsSXlpuEXnVkO4BRaEWdG%2F2DaIVwNUlPhy3o26F997SMR49ngHPHBcgHA37Ebvu6OoUxZmRWc3SKk%2Fhin2n8fN47OVetzcEog1iaF9pmy3AUceqoO87Vz1Q0jszAtclGSRF5KvSazypujz4%2BNNRTJG1TQC1g9Nb2%2BpqJLuGPXc4t0ydfnJJq8O0Rp%2Fh5z2pCf28cHGl6S6S5CI6s7xvJeStiEg5pTRk8c1WCgUZP4EqlIfDBuAYliWnJw3stzBxYcgYYcrRs7zyx%2FzoF4bzFuBR%2F9w5JRicYhZLal9%2BLFq6Ru4iLpHvs5u1oG57GU12kjuKpdv4KQXAtA321SmF2jYt0ERIJMCbvMNuj8tuCQX3wHSJewru%2F1Tqij8OV6fUw8OJeHgsm6gam9fuWttMrrmfMCQf2H6wmqBwno6sDDLUUeogqfoINfo4G8iFlSqsSrYFTi%2FEV1ivH9nbWyT1KQAu5i64TOOprNrHK1RZzBh%2BME5Uu0sBrldePIBkASGSZoRX%2BWnJO5Z50hU5eOAp8Adr7nCNQP0vQ3KevsU81BHzq9%2BeUFf52Xb6DPP9usK3C7nkK5KtfpmVKbej%2FftnkjU4JJetdtbwFUYhCTwSjD6UTiwxfxl41JAraLdxMPBI6o4dW134%2FqCUh8RlbgwIftX%2BlUbF8Wul4tzRpATgitYnI033cSCMrwf0maUjPxORV8GWMXcPQ8EYltxy0PvLzYYu4%2BkohCX2i3kICAQpMktISmsQ4IK08cChmZMRfNan5tUm6vveefLyU8JU7kV7oUju6WL88VUViT9%2B8jIXkbUEvYGJjQ%2Bbz%2F1KSnEkC5P6q%2BUQi8dBNc%2FjrffuwlMz8kKTFv295jnhF4F3P7bKD9rAx%2BDbNJFCEEQw66oVL5L5U9k7c%2B4LZjsBUQaARkRio2LgCtJKwYy3QR6R8uXS9QYEsInHQVkQ2bx6%2BGm7RNMc%2BG14Druod2uAFNOUfICgwpUh1D4%2FaPbuk8JPMDYtDEtETleaszPM6a%2Bxk8v%2B%2FQz4uMTSkofGo7B8hvo9bfB%2FoaG9SVwZvmbtVF7R2wE7%2BfCZzMEaJB4fC39R994Y4xxkLxqjAmubwrbLQHxK4t4cTXUMyumwJ2XWWs7HEUgOcpN6uOY5fT2Zd2glMo1ZBXyYKH71L0bRO5v8AMs51ufcAmiEsmo5IA7XscP5BrDhLyoZKgtYaf%2FvZVF1g5EwJJNrowWc%2F9%2FsKDVDp6eJI4k8g2%2B5rR1MI',
__VIEWSTATEGENERATOR: 'CA0B0334',
__EVENTVALIDATION: 'Gak%2BGII2aS1YXgf2gREqGfrGmDTMqW7erSXFtTQ4C5oKwsx3MXxqorp12oGvpQvpk5BgeWZQxyUfZQyryKFtCzaxDOO2xhi48%2BcWRbmLVZfvLl2gjgWSpcxFpLdH8QA8ylIiesfMUwGmX7vPVyxD6%2FZKzI6%2Feo0qsMMohEuz%2BvmKfraZgAIeqLWy41WYao19LSspZKJMMxe2zl8fGR59pMifmZEx1NTg3mKX%2BgtDkMw%3D',
__ASYNCPOST: true,
btnSearch: 'Search',
}
let data = "ctl04=ctl04%7CbtnSearch&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=FptILrukxC4V9MSGuJHMVNX6LCmhsW7v7VmLFLHdLvFFivTHtQwoKAgKBFzXokcyM0ylBR%2BzpYRBqgP6VeZd19Ffm2tYk6GzaZAx8TLD%2BjsHGVbVqQ6%2FZhlyrUn4GXZ5hGWtieUww3nNXmDG4%2Bn7LDjpSIDqToyYJOKGCkIvOwkIMVzCE8KdPLlc6%2Fqjy0UOA7DcYolhRL4CGFVQMae2qDZgcxUTaXyaO40UKwrOmRjuK5P%2BIsjii1qfGVPgKyj2&__VIEWSTATEGENERATOR=CA0B0334&__EVENTVALIDATION=ONNr43wbzKcicQt%2FTYELAGrZa0uP%2FZcTyNMo%2BHxG0ts2nRFId1EKwQJrPs9V0xsXR9hB2nYwWmIIXKt0DOFnNCwS461KagD0m5lFwO7usxvwe%2FOPNIpyeydME49nA2%2Fp8YThhDZRVuTNSvI9sfn8buyBEMqK4cbTnVS64t7uKdt7yRaPFUbWlLoQcTnEHv6XrGHFqMbG3MnGRuw8MvBqOOf8diwJ9ZxtqtYda7xBdiE%3D&keywords=&filter=fName&__ASYNCPOST=true&btnSearch=Search";

const getResults = async () =>{

    const response = await axios.post(url,data2)
    console.log(response.data,'response')
    const $ = cheerio.load(response)
    // console.log($.html())
    const siteHeading = $('#search')
    // console.log(siteHeading.html())
}
        getResults().then(r => r);


// fetch("https://search.abdenturists.ca/", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "en-US,en;q=0.9",
//         "cache-control": "no-cache",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"92\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-microsoftajax": "Delta=true",
//         "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://search.abdenturists.ca/",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "ctl04=ctl04%7CbtnSearch&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=FptILrukxC4V9MSGuJHMVNX6LCmhsW7v7VmLFLHdLvFFivTHtQwoKAgKBFzXokcyM0ylBR%2BzpYRBqgP6VeZd19Ffm2tYk6GzaZAx8TLD%2BjsHGVbVqQ6%2FZhlyrUn4GXZ5hGWtieUww3nNXmDG4%2Bn7LDjpSIDqToyYJOKGCkIvOwkIMVzCE8KdPLlc6%2Fqjy0UOA7DcYolhRL4CGFVQMae2qDZgcxUTaXyaO40UKwrOmRjuK5P%2BIsjii1qfGVPgKyj2&__VIEWSTATEGENERATOR=CA0B0334&__EVENTVALIDATION=ONNr43wbzKcicQt%2FTYELAGrZa0uP%2FZcTyNMo%2BHxG0ts2nRFId1EKwQJrPs9V0xsXR9hB2nYwWmIIXKt0DOFnNCwS461KagD0m5lFwO7usxvwe%2FOPNIpyeydME49nA2%2Fp8YThhDZRVuTNSvI9sfn8buyBEMqK4cbTnVS64t7uKdt7yRaPFUbWlLoQcTnEHv6XrGHFqMbG3MnGRuw8MvBqOOf8diwJ9ZxtqtYda7xBdiE%3D&keywords=&filter=fName&__ASYNCPOST=true&btnSearch=Search",
//     "method": "POST",
//     "mode": "cors"
// });


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

    // postData(url, data)
    // .then(data => {
    //     console.log(data);
    // });
