const { json } = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')


module.exports.criarUsuario = (req, res) => {
    const userForm = req.body
    req.body.senhaUsuario = criptografarSenha(req.body.senhaUsuario)
    delete req.body.confsenhaUsuario
    salvarUser(userForm)
    res.redirect('/')
}

module.exports.formUsuario = (req, res) => {
    res.render('cadastro',{title: 'Cadastro usuário'});
}

module.exports.atualizaUsuario = (req, res) => {
    res.send('USUARIO ATUALIZADO')
}

module.exports.deletaUsuario = (req, res) => {
    res.send('USUARIO DELETADO')
}

/* Salva Usuarios no arquivo user.json*/
function salvarUser(objeto) {
    const usersCriados = require('../user.json')
    console.log(usersCriados)
    usersCriados.push(objeto)
    const str = JSON.stringify(usersCriados)
    console.log(str)
    fs.writeFileSync('user.json', str)
}

/* criando hash da senha*/
function criptografarSenha(senha) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(senha, salt)
}

/* validando a senha com o hash*/
function login(senha,hashSenha) {
    return bcrypt.compareSync(senha, hashSenha)
}
