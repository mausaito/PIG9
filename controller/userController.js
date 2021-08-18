const { json } = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path')
const { Usuario, Sequelize} = require('../database/models')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports.showCadastro = function (req, res) {
    res.render('cadastro', {title: 'Cadastrar',
      error: {},
      content: {},
      user: req.session.usuario
    });
    return
  };

module.exports.listarUsuario = async function (req, res) {
    let listaUsuario = await buscarTodosUsuarios()
    res.render ('listaUsuarios', {listaUsuario, title:'Lista de usuários',
      error: {},
      content: {},
      user: req.session.usuario,
  });
  return
};

module.exports.procurarUsuario = async (req, res) => {
    let {key} = req.query
    let listaUsuario = await buscarNomeUsuarios(key)
    res.render ('listaUsuarios', {listaUsuario, title:'Lista de usuários',
      error: {},
      content: {},
      user: req.session.usuario,
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
        res.render('login', {title: 'Login',
          user: req.session.nomeCompleto,
          error:{}
        });
        return
    }    
};

module.exports.formUsuario = (req, res) => {
    res.render('cadastro',{title: 'Cadastro usuário'});
    return
}

module.exports.paginaLogin = async (req, res) => {
    res.render('login',{title: 'Login',
    error: {
      email:'',
    },
    user: req.session.usuario,
  });
    return
}

module.exports.logout = async (req, res) => {
  req.session.estaAutenticado = false,
  req.session.usuario = '',
  res.render('home',{title: 'PIG9',
  error: {
    email:'',
  },
  user: req.session.usuario,
});
  return
}

module.exports.loginUsuario = async (req, res) => {
    const login = req.body
    const usuario = await buscarUsuario(login.email)
    console.log(usuario);
    if (!usuario) {
        user = '',
        res.render('login', {title: 'Login', user,
        error: {
            email: 'Email ou senha incorretos'},
            content: req.body,
        });  
        return
      } else {
        if (await validarSenha(login.hashSenha, usuario.hashSenha)) {
          req.session.usuario = usuario
          console.log(usuario.nomeCompleto)
          req.session.estaAutenticado = true  
          res.redirect('/dashboard')
          return
        } else {
          res.render('login', {title: 'Login', user,
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

/* Salva Usuarios no arquivo user.json
function salvarUser(objeto) {
    const usersCriados = require('../user.json')
    usersCriados.push(objeto)
    const str = JSON.stringify(usersCriados)
    fs.writeFileSync('user.json', str)
}
*/

/* Salva Usuarios no banco de dados*/
async function salvarUser(objeto) {
    const { nomeCompleto, email, dataNasc, tipoPerfil, hashSenha} = objeto;
    console.log(objeto);
    await Usuario.create({
      nomeCompleto,
      email,
      dataNasc,
      tipoPerfil,
      hashSenha
    })
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

/* buscando usuario no arquivo
function buscarUsuario(email) { 
    const usuarios = lerNoDisco()
    return usuarios.find(function(user){
        return user.email===email
    })
}
*/
async function buscarUsuario(email) {
    let user = await Usuario.findOne({
      where:{
        email
      }
    })
    console.log('chegou até aqui*!*')
    console.log(user);
    return user
}

/* Busca Todos usuários no banco de dados */
async function buscarTodosUsuarios() {
  let user = await Usuario.findAll()
  return user
}

/* Procura usuários no banco de dados */
async function buscarNomeUsuarios(key) {
  let user = await Usuario.findAll({
    where: {
      nomeCompleto:{
        [Op.like]:`%${key}%`
      }
    }
  })
  return user
}


/*
function lerNoDisco() {
    const str = fs.readFileSync(path.join(__dirname, '../user.json'))
    const obj = JSON.parse(str)
    return obj
}    
*/