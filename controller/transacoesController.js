const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')
const models = require('../database/models');
const {conversorMoedas}=require('../externals/conversorMoedas')
module.exports.transacoes = async function (req, res) {
  const moedas = await models.Moeda.findAll()
  const categorias = await models.Categoria.findAll()

  res.render('transacoes', {
    title: 'Cadastrar transações',
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
  if (!transacaoForm.tipoLancamento || !transacaoForm.idCategorias_fk ||
    !transacaoForm.descricao || !transacaoForm.valor || !transacaoForm.idMoedas_fk ||
    !transacaoForm.dataPagto || !transacaoForm.banco) {  
    const moedas = await models.Moeda.findAll()
    const categorias = await models.Categoria.findAll()
    res.render('transacoes', {
      title: 'Cadastrar transações',
      error:{
        formulario: 'É preciso preencher todos os campos'},
        content: req.body,
        moedas: moedas,
        categorias: categorias,
        user: req.session.usuario

    });  
    return
  } else {
  transacaoForm.idUsuarios_fk = req.session.usuario.id
  await models.Lancamento.create(transacaoForm)
  res.redirect('transacoes/lista')
  return
}
}

module.exports.listarTransacao = async (req, res) => {
  const listaTransacao = await models.Lancamento.findAll({
    where:{
      idUsuarios_fk:req.session.usuario.id
    },
    include: [{
      model: models.Moeda, as: "moeda"
    },{
      model: models.Categoria, as: "categoria"
    }]
  })
console.log(listaTransacao)
  res.render('lista', {
    title: 'Listar Transacões',
    listaTransacao,
    user: req.session.usuario
  })
  return
}

// Atualiza

module.exports.attTransacao = async function (req, res) {
  let { id } = req.params
  const lancamento = await models.Lancamento.findOne({
    where: { id: id }
  })
  const moedas = await models.Moeda.findAll()
  const categorias = await models.Categoria.findAll()
console.log(lancamento, id)
  res.render('attTransacoes', {
    title: 'Atualizar Transação',
    error: {},
    content: {},
    moedas: moedas,
    categorias: categorias,
    lancamento: lancamento,
    user: req.session.usuario
  });
  return
};

module.exports.atualizarTransacao = async (req, res) => {
  const transacaoForm = req.body
  let { id } = req.params
  transacaoForm.idUsuarios_fk = req.session.usuario.id
  const atualzar = await models.Lancamento.update(
    transacaoForm
  ,{
    where: {id: id}
  }
    )
  console.log(atualzar)
  res.redirect('/transacoes/lista')
  return
}

module.exports.conversorMoedas = async function (req, res) {
  const conversao = await conversorMoedas()
  res.send(conversao)
  

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