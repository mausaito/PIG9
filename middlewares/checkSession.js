module.exports = function (req, res, next) {
    if (!req.session.usuario) {
      res.redirect('/home');
    }
    next();
  };
  module.exports.isAuthenticated = function(req, res, next) {
    /*
       check for valid credentials 
    */
    if (success)
    {
      req.session.user = foundUserInfo;
    }
    next();
  }