const express = require('express');
const router = express.Router();

const sideController = require ('../controller/sideController')

/* GET menu lateral. */
router.get('/', sideController.sideBar)

module.exports = router;