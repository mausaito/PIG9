const { json } = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path')


module.exports.criarUsuario = async (req, res) => {
    const userForm = req.body
    req.body.senhaUsuario = await criptografarSenha(req.body.senhaUsuario)
    delete req.body.confsenhaUsuario
    salvarUser(userForm)
    res.redirect('dashboard')
}

module.exports.formUsuario = (req, res) => {
    res.render('cadastro',{title: 'Cadastro usuário'});
}

module.exports.loginUsuario = async (req, res) => {
    const login = req.body
    const usuario = buscarUsuario(login.emailUsuario)
    if (!usuario) {
        res.send('erro aqui')
      } else {
        if (await validarSenha(login.senhaUsuario, usuario.senhaUsuario)) {
          res.render('dashboard')
        } else {
          res.send('outro erro')
        }
      }
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
    usersCriados.push(objeto)
    const str = JSON.stringify(usersCriados)
    fs.writeFileSync('user.json', str)
}

/* criando hash da senha*/
async function criptografarSenha(senha) {
    const salt = await bcrypt.genSalt(5)
    return await bcrypt.hash(senha, salt)
}

/* validando a senha com o hash*/
async function validarSenha(senha,hashSenha) {
    console.log(senha)
    console.log(hashSenha)
    return await bcrypt.compareSync(senha, hashSenha)
}


function buscarUsuario(email) { 
    const usuarios = lerNoDisco()
    return usuarios.find(function(user){
        return user.emailUsuario===email
    })
}

function lerNoDisco() {
    const str = fs.readFileSync(path.join(__dirname, '../user.json'))
    const obj = JSON.parse(str)
    return obj
}    
