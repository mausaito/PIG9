const express = require('express');
const router = express.Router();

const transacoesController = require ('../controller/transacoesController')


/* GET users cadastro. */
router.get('/', transacoesController.transacoes)

router.get('/lista', transacoesController.listarTransacao)

router.post('/', transacoesController.criarTransacao)

module.exports = router;