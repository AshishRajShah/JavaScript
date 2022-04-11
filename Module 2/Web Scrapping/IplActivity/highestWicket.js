/* 
        Highest Wicket taker............
*/

const request = require('request');
const jsdom = require('jsdom');
const{ JSDOM } = jsdom

link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/lucknow-super-giants-vs-delhi-capitals-15th-match-1304061/full-scorecard";

request(link, function cb(err,req, html)
{
    if(err)
        console.log('error :- ',err);
    else
    {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const ballerTable = document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed:nth-child(2) tbody .ds-border-b.ds-border-line.ds-text-tight-s');
        let playerlink = document.querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed:nth-child(2) tbody .ds-border-b.ds-border-line.ds-text-tight-s a');

        let maxWicket =0;
        let player;
        let detailLink;
        for(let i=0; i<ballerTable.length; i++)     //--- this loop is for fetch all rows...
        {
            // console.log(ballerTable[i].textContent);     -- it shows all baller row..
            let tds = ballerTable[i].querySelectorAll('td')     //-- this loop  divide each row in column,,
            let playerName = tds[0].textContent;                // Name is found in column 1st...
            let wicket = tds[4].textContent;                    //  Column is found in column 4th...
            let ballerlink = "https://www.espncricinfo.com"+playerlink[i].href;     // the link of player details...
            // console.log(ballerlink)
            
            console.log("-------    Player Name :- ",playerName,"\t\tWicket :- ",wicket);
            
            //------------ logic for highest wicket taker...
            if(maxWicket<wicket)            // -t will give ..the max wc taker, his name and his link
            {
                maxWicket = wicket;
                player = playerName;
                detailLink = ballerlink;
            }    
        }
        console.log("\n------------ The highest wicket taker is ............\n");
        console.log("-------    Player Name :- ",player,"\t\tWicket :- ",maxWicket);

        console.log("\n-------------------- ",player,"Details...  ---------------\n");
        // console.log("--------- ",detailLink);        //--- the player link.....
        
        request(detailLink,function cb2(err,request,html)
        {
            if(err)
                console.log("error :- ",err);
            else
            {
                const dom = new JSDOM(html)
                const document = dom.window.document;
                const details = document.querySelectorAll('.ds-text-title-s.ds-font-bold.ds-text-ui-typo h5')
                
                let fullName = details[0].textContent;
                let birthday = details[1].textContent;

                console.log("Full name of player :- ",fullName,"\t\t   D.O.B :- ",birthday,"   ---------\n");     
            }
        
        })

    }
})




