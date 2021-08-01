module.exports = function (req, res, next) {
    /*if (req.session.usuario) {
      res.redirect('/dashboard');
    }*/
    const rotasPublicas = [ '/' , '/home' , '/cadastro/login' ,'/cadastro' , '/login']
    console.log(rotasPublicas.includes(req.path) , req.session.usuario, req.path)
    if (rotasPublicas.includes(req.path) && req.session.usuario) {
        res.redirect('/dashboard')
    }
    next();
  };