let fs = require("fs");
let path = require("path")

//make a folder..
// fs.mkdirSync("Practice1Folder");

// destination of folder.. nad also create file1.txt file in that folder..
let dest = path.join(__dirname,"Practice1Folder","file1.txt");
// console.log(dest)

//make a text file with content...
fs.writeFileSync(dest,"new file has been made..")

//read a file..
console.log(fs.readFileSync(dest,))

//del file ..
// fs.unlinkSync("file1.txt")  //-- i did it bcz i have to create the file in Practice1Folder..