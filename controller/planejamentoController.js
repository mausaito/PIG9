const fs = require('fs')
module.exports.planejamento = (req, res) => {
    res.render('planejamento',{title: 'PI - Planejamento'});
}
