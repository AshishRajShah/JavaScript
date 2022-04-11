const fs = require('fs')
const request = require('request')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const githubLink ="https://github.com/topics"

request(githubLink,function cb(err,req,html)
{
    if(err)
        console.log('error : ',err);
    else
    {
        const dom = new JSDOM(html)
        const document = dom.window.document
        let  repositories = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center")
        let repoDir = document.querySelectorAll('.f3.lh-condensed.text-center.Link--primary.mb-0.mt-1')
        
        for(let i=0; i<repositories.length; i++)
        {
            let contentLink = "https://github.com" + repositories[i].href
            console.log(contentLink); 
            
            let repoDirName = repoDir[i].textContent.replace(/[\r\n\t]+/gm,"")
            console.log(repoDirName); 

            if(!fs.existsSync(repoDirName))
                fs.mkdirSync(repoDirName)
        }

    }
})