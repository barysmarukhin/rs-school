const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const md5 = require('md5');

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please, enter the name of speaker'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an Email Address'
  },
  avatar: {
    type: String,
    trim: true
  },
  info: {
    type: String,
    trim: true
  }
});

//virtual field is something that can be generated
// speakerSchema.virtual('avatar').get(function() {
//   const hash = md5(this.email);
//   return `https://gravatar.com/avatar/${hash}?s=200`;
// });

speakerSchema.index({
  name: 'text',
})

module.exports = mongoose.model('Speaker', speakerSchema)
