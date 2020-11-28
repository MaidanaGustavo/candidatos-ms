// Importação de bibliotecas;
const fs = require('fs')
const graceful = require('graceful-fs')
const { Client } = require('pg')
// Instancia do postgres;
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'eleicaoms',
  password: 'minhasenha',
  port: 5432,
})
// Conexao
client.connect()
graceful.gracefulify(fs)

/*le todo o diretório, e chama a funçao percorreCandidatos, passando o array files
que contém uma string com o nome de cada arquivo;
*/
fs.readdir('./candidatos',function(error,files){
	percorreCandidatos(files)  
});
/*Agora vamos percorrer o array files, passando para a função 'lerArquivo', 
uma string com o diretorio local "candidatos" + o nome de cada arquivov json;
*/
const percorreCandidatos = function (obj){
	for(let i = 0 ; i<obj.length;i++){
		lerArquivo('./candidatos/'+obj[i])
	}
}
/*
A função lerArquivo vai utilizar da fs.readFile para, obviamente, ler o conteudo
de cada arquivo. Depois de convertermos com parse chamamos a função inserir
com o json sendo passado como parametro;
*/
const lerArquivo  = function(str){
	let obj
	fs.readFile(str,"utf8",function(err,data){
    if(err){
	console.log(err)        
    }
     const jsonData = JSON.parse(data)
   //  console.log(jsonData)
    inserir(jsonData)

});
	
}
/* 
	A função inserir é o core da nossa aplicação, basicamente ela faz toda a
	insersao no banco de dados. Vamos enteder melhor em detalhes abaixo: 
*/
const inserir = function(data){
	/*  
		Esse primeiro bloco faz o seguinte: seleciona todos os arquvios json dentro
		do conteudo do arquivvo, e utiliza a função stringify para converte-los em 
		string para poder fazer a inserção no banco;
	*/
	data.eleicao = JSON.stringify(data.eleicao)
	data.cargo = JSON.stringify(data.cargo)
	data.vices = JSON.stringify(data.vices)
	data.partido = JSON.stringify(data.partido)
	/* 
		Essas duas variaveis são arrays para poder ser inserido posteriormente 
		as eleicoes, na tabela eleição, conforme a modelagem;
	 */
	let arrId =[]
	let arr =[]
	// Inserção nos arrays;
	for(let i = 0; i<data.eleicoesAnteriores.length;i++){
		arrId.push(data.eleicoesAnteriores[i].id)
		arr.push(data.eleicoesAnteriores[i])
	}	
	
	/* 
		Aqui é um caso muito especifico, ao decorrer do trabalho identificamos 
		que dois arquivos, no campo vice e nomeColigacao tinham um "  a mais,
		então isso é basicamente pra remover isso. Como são apenas dois, essa 
		"gambiarra", localiza esses dois arquivos e removem esses ";
	 */
	if(data.id== 120000852026   || data.id==120000852025){
		 data.vices = data.vices.replace('\\"',"")
		 data.nomeColigacao = data.nomeColigacao.replace('\"',"")	
	}
	/* 
		E aqui é a inserção. 
		Primeiro: a inserção dos candidatos, com os replaces para remover o ' a mais.
		os demais: basicamente é mesma coisa, um for para percorrer e inserir os dados;
	*/
	client.query(`INSERT INTO public.candidatos(id, "nomeUrna", numero, "idCandidatoSuperior", "nomeCompleto", "descricaoSexo", "dataDeNascimento", "tituloEleitor", "descricaoEstadoCivil", "descricaoCorRaca", "descricaoSituacao", nacionalidade, "grauInstrucao", ocupacao, "gastoCampanha1T", "gastoCampanha2T", "sgUfNascimento", "nomeMunicipioNascimento", "localCandidatura", "ufCandidatura", "ufSuperiorCandidatura", "dataUltimaAtualizacao", "fotoUrl", "fotoDataUltimaAtualizacao", "descricaoTotalizacao", "nomeColigacao", "composicaoColigacao", "numeroProcessoDrap", "numeroProcessoDrapEncrypt", "numeroProcesso", "numeroProcessoEncrypt", "numeroProcessoPrestContas", "numeroProcessoPrestContasEncrypt", "numeroProtocolo", cargo, "totalDeBens", vices, partido, substituto, motivos, "codigoSituacaoCandidato", "descricaoSituacaoCandidato", "st_SUBSTITUIDO", "descricaoNaturalidade", "st_MOTIVO_AUSENCIA_REQUISITO", "st_MOTIVO_CONDUTA_VEDADA", cnpjcampanha, "gastoCampanha", "st_MOTIVO_ABUSO_PODER", "st_MOTIVO_COMPRA_VOTO", "ds_MOTIVO_OUTROS", "st_MOTIVO_GASTO_ILICITO", "st_MOTIVO_IND_PARTIDO", "st_MOTIVO_FICHA_LIMPA", "st_DIVULGA_ARQUIVOS", "st_DIVULGA_BENS", "st_DIVULGA", "st_REELEICAO", cpf, "eleicoesAnteriores", emails, sites, eleicao)VALUES (${data.id},'${data.nomeUrna.replace("'","\''")}',${data.numero},${data.idCandidatoSuperior},'${data.nomeCompleto.replace("'","\''")}','${data.descricaoSexo}','${data.dataDeNascimento}',${data.tituloEleitor},'${data.descricaoEstadoCivil}','${data.descricaoCorRaca}','${data.descricaoSituacao}','${data.nacionalidade}','${data.grauInstrucao}','${data.ocupacao}',${data.gastoCampanha1T},${data.gastoCampanha2T},'${data.sgUfNascimento}','${data.nomeMunicipioNascimento.replace("'","\''")}','${data.localCandidatura}','${data.ufCandidatura}','${data.ufSuperiorCandidatura}','${data.dataUltimaAtualizacao}','{${data.fotoUrl}}','${data.fotoDataUltimaAtualizacao}','${data.descricaoTotalizacao}','{${data.nomeColigacao}}','{${data.composicaoColigacao}}','${data.numeroProcessoDrap}','{${data.numeroProcessoDrapEncrypt}}','{${data.numeroProcesso}}','{${data.numeroProcessoEncrypt}}','${data.numeroProcessoPrestContas}','${data.numeroProcessoPrestContasEncrypt}','${data.numeroProtocolo}','${data.cargo}',${data.totalDeBens},'${data.vices.replace("\'","\''")}','${data.partido}','${data.substituto}','${data.motivos}',${data.codigoSituacaoCandidato},'${data.descricaoSituacaoCandidato}','${data.st_SUBSTITUIDO}','${data.descricaoNaturalidade.replace("'","\''")}','${data.st_MOTIVO_AUSENCIA_REQUISITO}','${data.st_MOTIVO_CONDUTA_VEDADA}','${data.cnpjcampanha}',${data.gastoCampanha},'${data.st_MOTIVO_ABUSO_PODER}','${data.st_MOTIVO_COMPRA_VOTO}','${data.ds_MOTIVO_OUTROS}','${data.st_MOTIVO_GASTO_ILICITO}','${data.st_MOTIVO_IND_PARTIDO}','${data.st_MOTIVO_FICHA_LIMPA}','${data.st_DIVULGA_ARQUIVOS}','${data.st_DIVULGA_BENS}','${data.st_DIVULGA}','${data.st_REELEICAO}','${data.cpf}','{${arrId}}','{${data.emails}}','{${data.sites}}','${data.eleicao}')`).then().catch(err=>console.log(data))
	percorreBens(data.bens,data.id)
	percorreArquivos(data.arquivos,data.id)
	percorreEleicao(arr)
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
		client.query(`INSERT INTO public.eleicoes(nroano, local, "nomeUrna", "nomeCandidato", ideleicao, cargo, partido, "situacaoTotalizacao", "txLink")VALUES (${eleicaoAnterior[i].nrAno},'${eleicaoAnterior[i].local}','${eleicaoAnterior[i].nomeUrna.replace("\'","")}}', '${eleicaoAnterior[i].nomeCandidato.replace("\'","")}', ${eleicaoAnterior[i].idEleicao},'${eleicaoAnterior[i].cargo}' , '${eleicaoAnterior[i].partido}','${eleicaoAnterior[i].situacaoTotalizacao}','${eleicaoAnterior[i].txLink}')`).then().catch(err=>console.log(eleicaoAnterior[i]))
	}
}

