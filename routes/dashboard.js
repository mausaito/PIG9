const express = require('express');
const router = express.Router();
const dashboardController = require ('../controller/dashboardController')
const checkSession = require('../middlewares/checkSession');

/* GET dashboard  */

router.get('/', checkSession, dashboardController.paginaInicial)

module.exports = router;
