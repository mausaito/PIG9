const express = require('express');
const router = express.Router();
const planejamentoController = require ('../controller/planejamentoController');
const checkSession = require('../middlewares/checkSession');

/* GET users cadastro. */
router.get('/', checkSession, planejamentoController.planejamento)

module.exports = router;