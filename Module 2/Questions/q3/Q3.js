
//----------        Copy file from on module to another...

let fs = require("fs")
let path = require("path")

//create a file...
let file = path.join(__dirname,"copy.txt")
if(!fs.existsSync(file))
    fs.writeFileSync(file,"...copy file...")

//copy file from module 2 to module 1..
let src = path.join(__dirname,"copy.txt")       //.---- source of copy...
console.log(src)

// destination directory...
let dirDest = path.join(__dirname,"..","..","..","Module 1","copyModule2")

if(!fs.existsSync(dirDest))
    fs.mkdirSync(dirDest)       //-------- create directory....

let dest = path.join(dirDest,"copy.txt")  //-------- destination of copy...
fs.copyFileSync(src,dest)
console.log(dest)