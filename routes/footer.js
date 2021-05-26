const express = require('express');
const router = express.Router();

const footerController = require ('../controller/footerController')

/* GET menu lateral. */
router.get('/', footerController.footer)

module.exports = router;