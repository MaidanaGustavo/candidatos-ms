const fs = require('fs')

fs.readFile("./candidatos/120000633198.json","utf8",function(err,data){
    if(err){
        return console.log("erro ao ler arquivo")
    }
    const jsonData = JSON.parse(data)

   // console.log(jsonData)
});

