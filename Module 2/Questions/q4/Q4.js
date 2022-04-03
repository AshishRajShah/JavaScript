/* ----- Read content from q2 folder and make an array which has..
          extension name of each file.... */  
          
let fs = require("fs");
let path = require("path");

let extarr=[];

//read data from directory first...
let dest = path.join(__dirname,"..","q2");      //--- console.log(dest)
let old_content = fs.readdirSync(dest)

content=[]

for(let i=0; i<old_content.length; i++){
    if(old_content[i].includes(".")){
        continue;
    }

    content.push(old_content[i]);
}

// console.log(content);

for(let i=0;i<content.length;i++)
// {
//     console.log(__dirname);      //-- to chck where is directory...
//     console.log(fs.existsSync(content[i]))       -- to chck what it says..
    if(!fs.existsSync(content[i]))
    {
       
        let fldPath = path.join(dest,content[i])
        // console.log(fldPath)

        let file =fs.readdirSync(fldPath)
        // console.log(file,"-----")
        for(let j=0; j<file.length;j++)
        {
            let name= file[j]
            let extsname = path.extname(name)
            
            // if(extarr.includes(extsname)==false)
            // console.log(file[j], extsname, extarr[i], i, j);
            // console.log(extarr) 
            // console.log("\n");
            if(extsname !== extarr[i])
            {
                //for loop on extarr
                //.includes("")

                // console.log(file[j], extsname, extarr[i], i, j);
                // console.log(extarr) 
                
                extarr.push(extsname)
               
            }  
            // console.log(file[j])
                
        }
    }

console.log(extarr)