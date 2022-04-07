/* 
        Print player name and  highest wicket gainer from wep page...
*/
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/kolkata-knight-riders-vs-mumbai-indians-14th-match-1304060/full-scorecard";

request(link, function(err,request,html)
{
    if(err)
        console.log('error :- ',err)
    else
    {
        // console.log(html);           -- all good...
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const baller = document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed:nth-child(2) tbody .ds-border-b.ds-border-line.ds-text-tight-s')

        // console.log(baller.length);      -- correct..

        for(let i=0;i<baller.length; i++)
        {
            // console.log(baller[i].textContent);     //------- it shows all baller..details
            let rows = baller[i];
            let tds = rows.querySelectorAll('td')
            let BallerName = tds[0].textContent
            let wicket = tds[4].textContent

            console.log("Baller name : --- ",BallerName,"\t Wicket  :---- ",wicket);
            

        }
    }
})


