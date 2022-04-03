//      ------------        Move A File.........

let fs = require("fs")
const { dirname } = require("path")
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