const fs = require('fs');
const { stringify } = require('querystring');
const models = require('../database/models');

module.exports.paginaInicial = async (req, res) => {
  const dadosDashboard = await models.Lancamento.findAll({
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
      valorReceita += dados.valor
    } else {
      valorDespesa += dados.valor
    }
    valorSaldo = valorReceita - valorDespesa
  }
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
    user: req.session.usuario})
  return
}




// api key: EF6QRYV79RAALACN