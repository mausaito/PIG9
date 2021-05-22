const fs = require('fs')

module.exports.sideBar = (req, res) => {
    res.render('sidebar',{title: 'Menu Lateral'});
}
