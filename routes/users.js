const express = require('express');
const router = express.Router();

const userController = require ('../controller/userController');
const checkSession = require('../middlewares/checkSession');
const checkLogin = require('../middlewares/checkLogin');


/* GET users cadastro. */
/* router.get('/', userController.formUsuario)*/

router.get('/', checkSession, userController.showCadastro);

router.get('/listaUsuarios', checkSession, userController.listarUsuario);

router.get('/procura', checkSession, userController.procurarUsuario);

router.get('/login', checkLogin, userController.paginaLogin);

router.post('/', userController.criarUsuario)

router.post('/login',  userController.loginUsuario)

// router.get('/logout',userController.logout)

router.put('/:id', userController.atualizaUsuario)

router.delete('/:id', userController.deletaUsuario)

module.exports = router;
