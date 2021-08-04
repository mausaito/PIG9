const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')
const models = require('../database/models');

module.exports.transacoes = async function (req, res) {
  const moedas = await models.Moeda.findAll()
  const categorias = await models.Categoria.findAll()

  res.render('transacoes', {
    title: 'Cadastro transações',
    error: {},
    content: {},
    moedas: moedas,
    categorias: categorias,
    user: req.session.usuario
  });
  return
};

module.exports.criarTransacao = async (req, res) => {
  const transacaoForm = req.body
  transacaoForm.idUsuarios_fk = req.session.usuario.id
  console.log(req.session)
  console.log(transacaoForm)
  await models.Lancamento.create(transacaoForm)
  res.redirect('transacoes/lista')
  return
}

module.exports.listarTransacao = async (req, res) => {
  const listaTransacao = await models.Lancamento.findAll()

    res.render('lista', {listaTransacao,
      user: req.session.usuario})
    return
}




// /* Salva Transacao no arquivo transacao.json*/
// function salvarTransacao(objeto) {
//     const transacoesCriadas = require('../transacao.json')
//     transacoesCriadas.push(objeto)
//     const str = JSON.stringify(transacoesCriadas)
//     fs.writeFileSync('transacao.json', str)
// }

// /* Ler no disco as transações*/
// function lerTransacaoNoDisco() {
//   const str = fs.readFileSync(path.join(__dirname, '../transacao.json'))
//   const obj = JSON.parse(str)
//   return obj
// }    