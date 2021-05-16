const express = require('express');
const router = express.Router();

const userController = require ('../controller/userController')

/* GET users cadastro. */
router.get('/', userController.formUsuario)

router.post('/', userController.criarUsuario)

router.put('/:id', userController.atualizaUsuario)

router.delete('/:id', userController.deletaUsuario)

module.exports = router;
