const passport = require('passport');
//now we use local strategy in passport
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/administrator',
  successFlash: 'You are now logged in!'
});
