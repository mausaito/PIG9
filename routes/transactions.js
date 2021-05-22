const express = require('express');
const router = express.Router();

const transacoesController = require ('../controller/transacoesController')

/* GET users cadastro. */
router.get('/', transacoesController.transacoes)
module.exports = router;