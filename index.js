const fs = require('fs')
const graceful = require('graceful-fs')
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'eleicaoms',
  password: 'minhasenha',
  port: 5432,
})
//console.log(client.query)







client.connect()



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
   //  console.log(jsonData)
    pegarDado(jsonData)

});
	
}


const pegarDado = function(data){
	data.eleicao = JSON.stringify(data.eleicao)
	data.cargo = JSON.stringify(data.cargo)
	data.vices = JSON.stringify(data.vices)
	//data.vices = data.vices.replace("\"","")
	data.partido = JSON.stringify(data.partido)
	if(data.eleicoesAnteriores.id == undefined){
		data.eleicoesAnteriores.id = null
	}
	if(data.id== 120000852026   || data.id==120000852025){
		 data.vices = data.vices.replace('\\"',"")
		 data.nomeColigacao = data.nomeColigacao.replace('\"',"")	
	}
	client.query(`INSERT INTO public.candidatos(id, "nomeUrna", numero, "idCandidatoSuperior", "nomeCompleto", "descricaoSexo", "dataDeNascimento", "tituloEleitor", "descricaoEstadoCivil", "descricaoCorRaca", "descricaoSituacao", nacionalidade, "grauInstrucao", ocupacao, "gastoCampanha1T", "gastoCampanha2T", "sgUfNascimento", "nomeMunicipioNascimento", "localCandidatura", "ufCandidatura", "ufSuperiorCandidatura", "dataUltimaAtualizacao", "fotoUrl", "fotoDataUltimaAtualizacao", "descricaoTotalizacao", "nomeColigacao", "composicaoColigacao", "numeroProcessoDrap", "numeroProcessoDrapEncrypt", "numeroProcesso", "numeroProcessoEncrypt", "numeroProcessoPrestContas", "numeroProcessoPrestContasEncrypt", "numeroProtocolo", cargo, "totalDeBens", vices, partido, substituto, motivos, "codigoSituacaoCandidato", "descricaoSituacaoCandidato", "st_SUBSTITUIDO", "descricaoNaturalidade", "st_MOTIVO_AUSENCIA_REQUISITO", "st_MOTIVO_CONDUTA_VEDADA", cnpjcampanha, "gastoCampanha", "st_MOTIVO_ABUSO_PODER", "st_MOTIVO_COMPRA_VOTO", "ds_MOTIVO_OUTROS", "st_MOTIVO_GASTO_ILICITO", "st_MOTIVO_IND_PARTIDO", "st_MOTIVO_FICHA_LIMPA", "st_DIVULGA_ARQUIVOS", "st_DIVULGA_BENS", "st_DIVULGA", "st_REELEICAO", cpf, "eleicoesAnteriores", emails, sites, eleicao)VALUES (${data.id},'${data.nomeUrna.replace("'","\''")}',${data.numero},${data.idCandidatoSuperior},'${data.nomeCompleto.replace("'","\''")}','${data.descricaoSexo}','${data.dataDeNascimento}',${data.tituloEleitor},'${data.descricaoEstadoCivil}','${data.descricaoCorRaca}','${data.descricaoSituacao}','${data.nacionalidade}','${data.grauInstrucao}','${data.ocupacao}',${data.gastoCampanha1T},${data.gastoCampanha2T},'${data.sgUfNascimento}','${data.nomeMunicipioNascimento.replace("'","\''")}','${data.localCandidatura}','${data.ufCandidatura}','${data.ufSuperiorCandidatura}','${data.dataUltimaAtualizacao}','{${data.fotoUrl}}','${data.fotoDataUltimaAtualizacao}','${data.descricaoTotalizacao}','{${data.nomeColigacao}}','{${data.composicaoColigacao}}','${data.numeroProcessoDrap}','{${data.numeroProcessoDrapEncrypt}}','{${data.numeroProcesso}}','{${data.numeroProcessoEncrypt}}','${data.numeroProcessoPrestContas}','${data.numeroProcessoPrestContasEncrypt}','${data.numeroProtocolo}','${data.cargo}',${data.totalDeBens},'${data.vices.replace("\'","\''")}','${data.partido}','${data.substituto}','${data.motivos}',${data.codigoSituacaoCandidato},'${data.descricaoSituacaoCandidato}','${data.st_SUBSTITUIDO}','${data.descricaoNaturalidade.replace("'","\''")}','${data.st_MOTIVO_AUSENCIA_REQUISITO}','${data.st_MOTIVO_CONDUTA_VEDADA}','${data.cnpjcampanha}',${data.gastoCampanha},'${data.st_MOTIVO_ABUSO_PODER}','${data.st_MOTIVO_COMPRA_VOTO}','${data.ds_MOTIVO_OUTROS}','${data.st_MOTIVO_GASTO_ILICITO}','${data.st_MOTIVO_IND_PARTIDO}','${data.st_MOTIVO_FICHA_LIMPA}','${data.st_DIVULGA_ARQUIVOS}','${data.st_DIVULGA_BENS}','${data.st_DIVULGA}','${data.st_REELEICAO}','${data.cpf}','{${data.eleicoesAnteriores.id}}','{${data.emails}}','{${data.sites}}','${data.eleicao}')`).then().catch(err=>console.log(data))
	percorreBens(data.bens,data.id)
	percorreArquivos(data.arquivos,data.id)
}

const percorreBens = function(arrayBens,id){
	for(let i = 0;i<arrayBens.length;i++){
		let idBens = id*i+id;	
	client.query(`INSERT INTO public.bens("idBens", ordem, descricao, "descricaoDeTipoDeBem", valor, "dataUltimaAtualizacao", "idCandidato")VALUES( ${idBens},${arrayBens[i].ordem},'${arrayBens[i].descricao.replace(/\'/g,'')}' , '${arrayBens[i].descricaoDeTipoDeBem.replace(/\'/g,'')}', ${arrayBens[i].valor}, '${arrayBens[i].dataUltimaAtualizacao}',${id})`).then().catch(err=>console.log(err.toString()))
}
}

const percorreArquivos = function(arquivos,id){
	for(let i = 0;i<arquivos.length;i++){
		client.query(`INSERT INTO public.arquivos("idArquivo", nome, url, tipo, "codTipo", "fullFilePath", "fileInputStream", "fileByteArray", "idCandidato")VALUES (${arquivos[i].idArquivo},'${arquivos[i].nome}' , '${arquivos[i].url}', '${arquivos[i].tipo}', ${arquivos[i].codTipo}, '${arquivos[i].fullFilePath}','${arquivos[i].fileInputStream}', '${arquivos[i].fileByteArray}', ${id})`)
	}
}

const percorreEleicao = function(eleicaoAnterior){
	for(let i = 0;i<eleicaoAnterior.length;i++){
		console.log(eleicaoAnterior[i].id)
	}
}

