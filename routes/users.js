const express = require('express');
const router = express.Router();

const userController = require ('../controller/userController');
const checkSession = require('../middlewares/checkSession');


/* GET users cadastro. */
/* router.get('/', userController.formUsuario)*/

router.get('/', userController.showCadastro)

router.post('/', userController.criarUsuario)

// router.get('/logout',userController.logout)

router.put('/:id', userController.atualizaUsuario)

router.delete('/:id', userController.deletaUsuario)

router.post('/login',  userController.loginUsuario)

router.get('/login',  userController.paginaLogin)

module.exports = router;
