/*      ------------------      Create Project of file mgmt. in which
                different type of file which is in download... folder they will be..
                moved to the extension wise folder..the folder will also created at run time....    --- */

// let srcPath = process.argv[2] 
let fs = require('fs')
let path = require('path')

let srcPath = path.join(__dirname,"Downloads")
// console.log(srcPath)     -- it will show path..

let content = fs.readdirSync(srcPath)
// console.log(content);            --- it will show the content in Download dir..

let extensions = {
    Audio : [".mp3"],
    Video : ['.mp4','.mkv','.avi'],
    Document : ['.doc','.docx','.pdf','.txt','.xls','.ppt'],
    Image : ['.jpg','.png','.gif'],
    Software : ['.exe'],
    Applications : ['.apk']
}

if(fs.existsSync(srcPath))
{
    for(let i=0;i<content.length; i++)
    {
        let ext = path.extname(content[i])
        // console.log(ext);            -- for chck extension output work or not...
        
        let folderName = createFolder(ext)
        let destPath = path.join(__dirname,folderName)
        // console.log("file-- ",ext,"--",folderName,"dest --",destPath);
        
        if(fs.existsSync(destPath))
            moveFile(srcPath,destPath,content[i])
        else
        {
            fs.mkdirSync(destPath)
            moveFile(srcPath,destPath,content[i])
        }
    }
}
else
{
    console.log("Create a directory...first..")
}

function createFolder(ext)
{
    for(let key in extensions)
    {
        let folderArr = extensions[key]
        for(let i=0;i<folderArr.length;i++)
        {
            if(folderArr[i]==ext)
                return key;
        }
    }
    return 'Others'
}

function moveFile(srcPath,destPath,file)
{
    let src = path.join(srcPath,file)
    let desti = path.join(destPath,file)
    fs.copyFileSync(src,desti)
    fs.unlinkSync(src)
}