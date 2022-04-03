//----------------      make an Array arr =[Audio,Video,Image,Software,Documents,app,Other
let arr = ["Audio","Video","image","Software","documents","Applications","Others"]
let file = ["abc","def","ghi","jkl"]
let exts = [".mp3",".mp4",".jpg",".exe",".pdf",".apk",".xml"]
// console.log(arr)     

//make folder for each element of the array..and inside each folder create same type of 4 files....
let fs = require("fs")
let path = require("path")
// let dest =__dirname
// console.log(dest)


for(let i=0; i<arr.length ;i++)
{
    // if(!fs.existsSync(arr[i])) fs.mkdirSync(arr[i])
if(!fs.existsSync('./'+arr[i])){
        fs.mkdirSync('./'+arr[i])
    }
         
    if(fs.existsSync('./'+arr[i])){
        for(let j=0; j<file.length; j++)
        {

            let fileName = file[j]+exts[i]
            let filePath = path.join(dest,arr[i],fileName)
            console.log(filePath)
            if(!fs.existsSync(filePath)){

                fs.writeFileSync(filePath,'')
            }
            
                
        }
    }
    
}