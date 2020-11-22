const fs = require('fs')
const graceful = require('graceful-fs')
graceful.gracefulify(fs)
fs.readdir('./candidatos',function(error,files){
	exibe(files)
});

const exibe = function (obj){
	for(let i = 0 ; i<obj.length;i++){
		lerArquivo('./candidatos/'+obj[i])
	}
}

const lerArquivo  = function(str){
	let obj
	fs.readFile(str,"utf8",function(err,data){
    if(err){
        
    }
     const jsonData = JSON.parse(data)
     pegarDado(jsonData)
});
	
}

const pegarDado = function(data){
	percorreBens(data.bens)
	percorreArquivos(data.arquivos)
	percorreEleicao(data.eleicoesAnteriores)
}

const percorreBens = function(arrayBens){
	for(let i = 0;i<arrayBens.length;i++){
		console.log(arrayBens[i].ordem)
	}
}

const percorreArquivos = function(arquivos){
	for(let i = 0;i<arquivos.length;i++){
		console.log(arquivos[i].idArquivo)
	}
}

const percorreEleicao = function(eleicaoAnterior){
	for(let i = 0;i<eleicaoAnterior.length;i++){
		console.log(eleicaoAnterior[i].id)
	}
}

