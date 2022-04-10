const request = require('request')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

let link = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/match-results"

let allPlayer =[]
let counter = 0

request(link , function cb(err,req,html)
{
    if(err)
        console.log("error :-- ",err);
    else
    {
        const dom = new JSDOM(html)
        const document = dom.window.document
        let matches = document.querySelectorAll('.ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent :nth-child(3) a')
        // console.log(matches.length);     //-- 16

        for(let i=0; i<matches.length; i++)
        {
            // console.log(matches[i].href);            //--- it shows link of each matches scorecard..
            let scorecardLink = "https://www.espncricinfo.com/"+ matches[i].href;
            counter++;

            request(scorecardLink, function cb2(err,res,html)
            {
                if(err)
                    console.log('error :- ',err);
                else
                {
                    const dom = new JSDOM(html)
                    const document = dom.window.document;
                    let teamName = document.querySelectorAll('[class="ds-text-ui-typo hover:ds-text-ui-typo-primary ds-block"]')
                    let players = document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tbody")
                    let winnerTeam = document.querySelector(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title")

                    console.log("\n::::::::::::::::::: ",teamName[0].textContent," -- VS-- ", teamName[1].textContent," ::::::::::::::::")
                    
                    for(let j=0; j<teamName.length; j++)
                    { 
                        let batmanRows = players[j].querySelectorAll('.ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tbody .ds-border-b.ds-border-line.ds-text-tight-s')
                        // console.log(batmanRows.length);
                        console.log("\n------------  ",teamName[j].textContent,"  ------------\n");

                        console.log("-- Batman --\t \t -- Runs -- \t -- Balls -- \t -- fourth -- \t -- sixer ---\n")
                        for(let k=0; k<batmanRows.length; k++)
                        {
                            let tds = batmanRows[k].querySelectorAll('td')
                            // console.log(tds.length);
                           
                            if(tds.length >4)
                            {
                                let batsmanName = tds[0].textContent
                                let Run     = tds[2].textContent
                                // let Matches = tds[4].textContent
                                let balls   = tds[3].textContent
                                let fours  = tds[5].textContent
                                let sixers  = tds[6].textContent

                                // console.log(batsmanName,"\t   ","\t\t",Run,"\t\t",balls,"\t\t",fours,"\t\t",sixers);

                                playerDetails(batsmanName,Run,balls,fours,sixers);
                                
                            }
                        }
                    }
                    console.log("\n-------------->\t",winnerTeam.textContent,"\t <-----------------");
                    console.log("\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n");
                }

                counter--;
                if(counter == 0)
                    console.log(allPlayer);
            })
            
            
        }
        
    }
})

// console.log("------------------------   All player who participated in Ipl 2022....  --------------------------------------------");
function playerDetails(batsmanName,Run,Ball,fours,sixers)
{
    Run =Number(Run)
    Ball =Number(Ball)
    fours =Number(fours)
    sixers=Number(sixers)
    for(let i=0; i<allPlayer.length; i++)
    {
        let playerObj = allPlayer[i]
        
        if(playerObj.Name == batsmanName)
        {
            playerObj.Runs    += Run
            playerObj.Balls   += Ball
            playerObj.Fours   += fours
            playerObj.Sixers  += sixers
            playerObj.Innings += 1
            return;
        }
    }

    let obj = {
        Name : batsmanName,
        Runs : Run,
        Balls : Ball,
        Fours : fours,
        Sixers  : sixers,
        Innings : 1
    }
    allPlayer.push(obj)
}

// console.log(allPlayer.length);