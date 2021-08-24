const fs = require('fs');
const { stringify } = require('querystring');
const { Op } = require('sequelize');
const models = require('../database/models');
const { exibeInflacao } = require('../externals/alphaVantage')

module.exports.paginaInicial = async (req, res) => {
  
  const dadosDashboard = await models.Lancamento.findAll({
    where:{
      idUsuarios_fk:req.session.usuario.id
    },
    include: [{
      model: models.Categoria, as: "categoria"}]
    }) 
  console.log(JSON.stringify(dadosDashboard))
  let dadosValor = []
  let dadosCategoria = []
  let graficoDespRec = []
  let valorReceita = 0
  let valorDespesa = 0
  let valorSaldo = 0
  for (const dados of dadosDashboard) {
    dadosValor.push(dados.valor)
    dadosCategoria.push(dados.categoria.nome)
    if (dados.tipoLancamento === 'RECEITA') {
      valorReceita += Number(dados.valor)
    } else {
      valorDespesa += Number(dados.valor)
    }
    valorSaldo = valorReceita - valorDespesa
  }

  const situacao = valorSaldo > 0 ? 'POSITIVO' : 'NEGATIVO'
  const dicasDashboard = await models.DicasGerais.findAll({
    where: { dicasPerfil: req.session.usuario.tipoPerfil, situacao: situacao,
      ...(situacao =='POSITIVO' && {valorMin: {
        [Op.lte]: valorSaldo
    }})
  }})

  console.log(dicasDashboard)


  
  // criando a string para o grafico de valor por categoria
  const stringCategorias = JSON.stringify(dadosCategoria)
  const stringValor = JSON.stringify(dadosValor)
  // criando a string para o grafico de receita x despesa
  graficoDespRec.push(valorReceita),
  graficoDespRec.push(valorDespesa)
  const stringGrafico = JSON.stringify(graficoDespRec)

  console.log(dadosValor, dadosCategoria, valorReceita, valorDespesa)
  console.log (stringCategorias)  

  res.render('dashboard', {title: 'Dashboard', stringValor , stringCategorias, stringGrafico, valorReceita, valorDespesa, valorSaldo,
    dicasDashboard, user: req.session.usuario})
  return
}

module.exports.getInflacao = async (req, res) => {
  const inflacao = await exibeInflacao()
  res.send(inflacao)
}



// api key: EF6QRYV79RAALACN