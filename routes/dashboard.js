const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController')
const checkSession = require('../middlewares/checkSession');
// const { charts } = require('../externals/charts')
/* GET dashboard  */

router.get('/', checkSession, dashboardController.paginaInicial)
//router.get('/buscaInflacao', dashboardController.getInflacao)
module.exports = router;
