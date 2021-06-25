const fs = require('fs')



module.exports.paginaInicial = (req, res) => {
    console.log(req.session);
    res.render('dashboard', {
      user: req.session.usuario,
    });
  };