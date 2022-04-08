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
        // const baller = document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed:nth-child(2) tbody .ds-border-b.ds-border-line.ds-text-tight-s')
        // console.log(baller.length);      -- correct..

        let ballerTeam  = document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed:nth-child(2) tbody')
        let teamNameRow = document.querySelectorAll('[class ="ds-text-ui-typo hover:ds-text-ui-typo-primary ds-block"]')
        for(let j=0; j<ballerTeam.length; j++)
        {
            let rows = ballerTeam[j].querySelectorAll('.ds-border-b.ds-border-line.ds-text-tight-s');
            // console.log(rows.length);        //-- it gives output 6 6 bcz there is 2 team..
            let teamName = teamNameRow[j].textContent;
            console.log("\n---------------  ",teamName,"  -------------------\n");
            // for(let i=0;i<baller.length; i++)
            for(let i=0; i<rows.length; i++)
            {
                // console.log(baller[i].textContent);     //------- it shows all baller..details
                let tds = rows[i].querySelectorAll('td')
                let BallerName = tds[0].textContent
                let wicket = tds[4].textContent
    
                console.log("Baller name : --- ",BallerName,"\t Wicket  :---- ",wicket);
            }
        }

    }
})


