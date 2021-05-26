const fs = require('fs')

module.exports.footer = (req, res) => {
    res.render('foter',{title: 'Footer'});
}