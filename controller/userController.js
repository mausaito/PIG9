const { json } = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path')
const models = require('../database/models')

module.exports.showCadastro = function (req, res) {
    res.render('cadastro', {title: 'Cadastro usuário',
      error: {},
      content: {},
    });
    return
  };

module.exports.criarUsuario = async (req, res) => {
    const userForm = req.body

    const usuario = await buscarUsuario(userForm.email)
    
    if (usuario) {
        res.render('cadastro', {title: 'Cadastro usuário',
            error: {
                email: 'Email já cadastrado'},
                content: req.body,
     
      });
      return
    } 

    if (userForm.hashSenha !== userForm.confSenha) {
        res.render('cadastro', {title: 'Cadastro usuário',
          error: {
            hashSenha: 'Senhas incompativeis'},
            content: req.body,
        
      });
      return
    } else {
    
        req.body.hashSenha = await criptografarSenha(req.body.hashSenha)
        delete req.body.confSenha
        salvarUser(userForm)
        //
        // await models.Usuario.create(userForm)
        //
        req.session.nomeCompleto = userForm.nomeCompleto
        req.session.estaAutenticado = true  
        res.render('login', {
          user: req.session.nomeCompleto
        });
        return
    }    
};

module.exports.formUsuario = (req, res) => {
    res.render('cadastro',{title: 'Cadastro usuário'});
    return
}

module.exports.paginaLogin = async (req, res) => {
    res.render('login',{title: 'login usuário'});
    return
}


module.exports.loginUsuario = async (req, res) => {
    const login = req.body
    const usuario = buscarUsuario(login.email)
    if (!usuario) {
        res.render('login', {title: 'Login usuário',
        error: {
            email: 'Email ou senha incorretos'},
            content: req.body,
        });  
        return
      } else {
        if (await validarSenha(login.hashSenha, usuario.hashSenha)) {
          req.session.nomeCompleto = usuario.nomeCompleto
          console.log(usuario.nomeCompleto)
          req.session.estaAutenticado = true  
          res.render('dashboard', {
            user: req.session.nomeCompleto,
          })
          return
        } else {
          res.render('home',{
            error: {
              email: 'Email ou senha incorreta',
            },
            
          })
          return
        }
      }
    }

module.exports.atualizaUsuario = (req, res) => {
    res.send('USUARIO ATUALIZADO')
    return
}

module.exports.deletaUsuario = (req, res) => {
    res.send('USUARIO DELETADO')
    return
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
    return await bcrypt.compareSync(senha, hashSenha)
}


function buscarUsuario(email) { 
    const usuarios = lerNoDisco()
    return usuarios.find(function(user){
        return user.email===email
    })
}

function lerNoDisco() {
    const str = fs.readFileSync(path.join(__dirname, '../user.json'))
    const obj = JSON.parse(str)
    return obj
}    
