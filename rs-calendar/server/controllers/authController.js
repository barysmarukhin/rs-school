const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

// now we use local strategy in passport
exports.login = passport.authenticate('local', {
  failureRedirect: '/administrator/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/administrator',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You successfully logged out!');
  res.redirect('/administrator');
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'You must be Logged In to create an event');
  res.redirect('/administrator/login');
}

exports.forgot = async(req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({email: req.body.email})
  if(!user) {
    req.flash('error', 'No user with that email found');
    return res.redirect('/administrator/login');
  }
  // 2. Send a reset token and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000 // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/administrator/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    subject: 'Password reset',
    filename: 'password-reset',
    resetURL
  })
  req.flash('success', `You have been emailed a password reset link.`);
  // 4. Redirect to login page
  res.redirect('/administrator/login');
}

exports.reset = async(req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token ,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if(!user) {
    req.flash('error', 'Password reset is invalid or has expired')
    return res.redirect('/administrator/login');
  }
  //if there is a user, show password form
  res.render('reset', { title: 'Reset your password' });
}

exports.confirmedPasswords = (req, res, next) => {
  if(req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  req.flash('error', 'Passwords do not match');
  res.redirect('back');
};

exports.update = async(req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token ,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if(!user) {
    req.flash('error', 'Password reset is invalid or has expired')
    return res.redirect('/administrator/login');
  }

  const setPassword = promisify(user.setPassword, user);// this method is available in cause of using plugin at User.js
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);// this method is available in cause of using passport.js
  req.flash('success', 'Your password has been reset! You are now logged in!');
  res.redirect('/administrator');
}
