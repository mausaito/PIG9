const express = require('express');
const router = express.Router();

const planejamentoController = require ('../controller/planejamentoController')

/* GET users cadastro. */
router.get('/', planejamentoController.planejamento)

module.exports = router;