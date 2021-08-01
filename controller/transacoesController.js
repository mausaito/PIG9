const { json } = require('body-parser')
const fs = require('fs')
const path = require('path')


module.exports.transacoes = function (req, res) {
    res.render('transacoes', {title: 'Cadastro usuário',
      error: {},
      content: {},
      user: req.session.usuario,
    });
  };

module.exports.criarTransacao = (req, res) => {
    const transacaoForm = req.body
    
    salvarTransacao(transacaoForm)
    res.redirect('transacoes/lista')
}

module.exports.listarTransacao = (req, res) => {
    const listaTransacao = lerTransacaoNoDisco()
    res.render('lista', {listaTransacao,
    user: req.session.usuario,
    })
}




/* Salva Transacao no arquivo transacao.json*/
function salvarTransacao(objeto) {
    const transacoesCriadas = require('../transacao.json')
    transacoesCriadas.push(objeto)
    const str = JSON.stringify(transacoesCriadas)
    fs.writeFileSync('transacao.json', str)
}

/* Ler no disco as transações*/
function lerTransacaoNoDisco() {
  const str = fs.readFileSync(path.join(__dirname, '../transacao.json'))
  const obj = JSON.parse(str)
  return obj
}    