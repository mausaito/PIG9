const express = require('express');
const router = express.Router();
const transacoesController = require ('../controller/transacoesController');
const checkSession = require('../middlewares/checkSession');


/* GET users cadastro. */
router.get('/', checkSession, transacoesController.transacoes)

router.get('/lista', checkSession, transacoesController.listarTransacao)

router.post('/', transacoesController.criarTransacao)

module.exports = router;