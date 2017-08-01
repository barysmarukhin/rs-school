const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());// we can use this method because of using proper plugin in User.js

//what should we do with our income and outcome users? Look down below...
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
