/* 
        this code is just for how to use request and jsdom to do  web scrapping,,,,
*/
const request = require("request");         //--------- request made
const jsdom = require("jsdom");         //-- jsdom  use .
const { JSDOM } = jsdom;                // -- take jsdom object...

const link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/kolkata-knight-riders-vs-mumbai-indians-14th-match-1304060/full-scorecard";

request(link,function cb(err,request,html)      //-- go to link ...
{
    if(err)
        console.log('error : ',err);
    else
    {
        // console.log(html);       -- all went good till here...
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const winTeam = document.querySelector('.ds-w-full p span'); //--fetch data from this selector of webpage..
        
        console.log(winTeam.textContent);

    }
})
