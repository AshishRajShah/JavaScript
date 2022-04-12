const fs = require('fs')
const request = require('request')
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const githubLink ="https://github.com/topics"               //-- main link of github topics page...

request(githubLink,function cb(err,req,html)
{
    if(err)
        console.log('error : ',err);
    else
    {
        const dom = new JSDOM(html)
        const document = dom.window.document
        let  content = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center")        //-- content link
        let contentDir = document.querySelectorAll('.f3.lh-condensed.text-center.Link--primary.mb-0.mt-1')      //-- content dir name array..
        
        for(let i=0; i<content.length; i++)
        {
            let contentLink = "https://github.com" + content[i].href        //  link to go content sites main page...
            console.log(contentLink); 
            
            let contentDirName = contentDir[i].textContent.replace(/[\r\n\t]+/gm,"")        // content dir...name..
            console.log(contentDirName); 

            if(fs.existsSync(contentDirName))
                fs.mkdirSync(contentDirName)            // create directory of main 3 content 

            request(contentLink,contentDirName,function cb2(err,reqs,html)
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
                    //    console.log(repoLink);
                       let repoName = repo[j].textContent.replace(/[\n\r]+/gm,"")      //-- repo name for create file with this..
                    //    console.log(repoName);
                        let fileName = path.join(__dirname,contentDirName,repoName) //-- repo name with its address..
                        // console.log(fileName);
                        
                        request(repoLink,function cb3(err,requ,html)
                        {
                            if(err)
                                console.log('error : ',err);
                            else
                            {
                                const dom = new JSDOM(html)
                                const document = dom.window.document
                                let issueLink = "https://github.com"+ document.querySelector('a[id="issues-tab"]').href
                                // console.log(issueLink);

                                // request(issueLink,function cb4(err,reqst,html)
                                // {
                                //     if(err)
                                //         console.log('error : ',err);
                                //     else
                                //     {
                                //         const dom = new JSDOM(html)
                                //         const document = dom.window.document
                                //         let issuesListLink = document.querySelectorAll('.Link--primary.v-align-middle').href

                                //         for(let k=0;k<4;k++)
                                //         {
                                //             console.log(issuesListLink[k]);
                                //         }
                                //     }
                                // })

                            }
                        })


                        if(fs.existsSync(fileName))
                            fs.writeFileSync(fileName,'')
                        
                   }
                }
            })
        }

    }
})