const express = require('express');
const router = express.Router();


/* GET dashboard cadastro */
router.get('/', (req, res) =>{
    res.render('dashboard')
})
module.exports = router;