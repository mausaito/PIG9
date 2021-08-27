const express = require('express');
const router = express.Router();
const transacoesController = require ('../controller/transacoesController');
const checkSession = require('../middlewares/checkSession');


/* GET users cadastro. */
router.get('/', transacoesController.transacoes)

router.get('/lista', checkSession, transacoesController.listarTransacao)

router.post('/', transacoesController.criarTransacao)

router.get('/:id/attTransacoes', checkSession, transacoesController.attTransacao)

router.put('/atualizar/:id', transacoesController.atualizarTransacao)

router.get('/converteMoeda', transacoesController.conversorMoedas)

// router.delete('/deletar/:id', transacoesController.deletarTransacao)


module.exports = router;