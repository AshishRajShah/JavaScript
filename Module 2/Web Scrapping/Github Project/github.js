const fs = require('fs')
const request = require('request')
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const githubLink ="https://github.com/topics"               //-- main link of github topics page...

request(githubLink,function(err,req,html)
{
    if(err)
        console.log('error : ',err);
    else
    {
        const dom = new JSDOM(html)
        const document = dom.window.document
        let  content = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center")        //-- content link
        // let contentDir = document.querySelectorAll('.f3.lh-condensed.text-center.Link--primary.mb-0.mt-1')      //-- content dir name array..
        
        for(let i=0; i<content.length; i++)
        {
            let contentLink = "https://github.com" + content[i].href        //  link to go content sites main page...
            console.log(contentLink); 

            /*                  ---- fetch dir name by new query selector.....

            // let contentDirName = contentDir[i].textContent.replace(/[\r\n\t]+/gm,"").trim()       // content dir...name..
            // console.log(contentDirName);  */

                                    //------   or to fetch main file name from his link or address........
            let contentDirName = path.basename(contentLink)
            console.log(contentDirName);


            if(!fs.existsSync(contentDirName))
                fs.mkdirSync(contentDirName)            // create directory of main 3 content 

            request(contentLink,contentDirName,function(err,reqs,html)      //this link will let us go to repo page..
            {
                if(err)
                    console.log("error :- ",err);
                else
                {
                   const dom = new JSDOM(html)
                   const document = dom.window.document
                   let repo = document.querySelectorAll(".text-bold.wb-break-word")     //--  content repositories link..
                 
                   for(let j=0; j<8; j++)
                   {
                        let repoLink = "https://github.com" + repo[j].href       //--  each content's repo full link..
                        // console.log(repoLink);

                        // let repoName = repo[j].textContent.replace(/[\n\r]+/gm,"").trim()      //-- repo name for create file with this..
                                   
                                    //------   or to fetch main file name from his link or address........
                        let repoName = path.basename(repoLink)          //---= to fetch repo file name...
                        // console.log(repoName);
                        repoName += '.json'     //--file save as json..
                        let fileName = path.join(__dirname,contentDirName,repoName) //-- repo as file name with its address..
                        // console.log(fileName);
                        
                        request(repoLink,fileName,function(err,requ,html)     //-- go to repo main page where issues are...
                        {
                            if(err)
                                console.log('error : ',err);
                            else
                            {
                                const dom = new JSDOM(html)
                                const document = dom.window.document
                                let issueLink = "https://github.com"+ document.querySelector('a[id="issues-tab"]').href
                                // console.log(issueLink);

                                request(issueLink,function(err,reqst,html)      // go to issue page..after requesting it...
                                {
                                    if(err)
                                        console.log('error : ',err);
                                    else
                                    {
                                        let issue =[]
                                        const dom = new JSDOM(html)
                                        const document = dom.window.document
                                                        //------------   issue list which are in issue link page...
                                        let issuesList= document.querySelectorAll('.Link--primary.v-align-middle')
                                        
                                        for(let k=0;k<issuesList.length;k++)
                                        {
                                            if( k>=4 || k==null )
                                                break
                                            else
                                            {
                                                let obj = {}
                                                let issuesListLink = "https://github.com"+issuesList[k].href
                                                    // console.log(issuesListLink);

                                                let issueName = issuesList[k].textContent      //---
                                                       //--------  or fetch text name...
                                                // let issueName = path.basename(issuesListLink)
                                                  // console.log(issueName);

                                                obj.IssueName = issueName
                                                obj.issueLink = issuesListLink
                                                issue.push(obj)         // push in array to store multiple objects...
                                                // console.log(issue);
                                            }
                                        }
                                        if(!fs.existsSync(fileName))
                                            fs.writeFileSync(fileName,JSON.stringify(issue))        
                                    }
                                })
                            }
                        })
                   }
                }
            })
        }
    }
})