const express = require('express');
const router = express.Router();


/* GET home cadastro */
router.get('/', (req, res) =>{
    res.render('home')
})
/*
router.post('/', userController.criarUsuario)

router.put('/:id', userController.atualizaUsuario)

router.delete('/:id', userController.deletaUsuario)
*/

module.exports = router;
