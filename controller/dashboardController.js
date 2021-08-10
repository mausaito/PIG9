const fs = require('fs');
const { stringify } = require('querystring');
const models = require('../database/models');

/*module.exports.paginaInicial = (req, res) => {
  console.log(req.session);
  res.render('dashboard', {
    user: req.session.usuario,
  });
};
*/

module.exports.paginaInicial = async (req, res) => {
  const dadosDashboard = await models.Lancamento.findAll({ group: ['Lancamento.idCategorias_fk']}) 
  console.log(JSON.stringify(dadosDashboard))
  let dadosValor = []
  let dadosCategoria = []
  for (const dados of dadosDashboard) {
    dadosValor.push(dados.valor)
    dadosCategoria.push(dados.idCategorias_fk)
  }
  const stringCategorias = JSON.stringify(dadosCategoria)
  const stringValor = JSON.stringify(dadosValor)
  console.log(dadosValor, dadosCategoria)
  console.log (stringCategorias)  

  res.render('dashboard', { stringValor , stringCategorias,
    user: req.session.usuario})
  return
}




// api key: EF6QRYV79RAALACN