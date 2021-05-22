const fs = require('fs')
module.exports.transacoes = (req, res) => {
    res.render('transacoes',{title: 'PI - Transacoes'});
}