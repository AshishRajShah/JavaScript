//      ------------        Move A File.........
let fs = require("fs");
// let fst = require("fs-extra")        -- not working at this time..
let path = require("path")

//--- create a file...
let filePath = path.join(__dirname,"moveFile.txt")
console.log(filePath)

if(!fs.existsSync(filePath))
    fs.writeFileSync(filePath,"this is a movable file of ques 5 .")

//--------      send this file to moving dir..          --------------

//---  1st Create moving directory.. in Questions folder..

let dirPath = path.join(__dirname,"..","MovingDir")
// console.log(dirPath);
if(!fs.existsSync(dirPath))
    fs.mkdirSync(dirPath)

//--- 2nd move the file "moveFile.txt" to Moving Dir..

let destPath = path.join(dirPath,"moveFile.txt")
// i--
fs.copyFileSync(filePath,destPath)

fs.unlinkSync(filePath)


/* fst.moveSync(filePath,dirPath,function(err)
{
    if(err)
        return console.log(err);
    else
        console.log("File move Successfully..")
}) */