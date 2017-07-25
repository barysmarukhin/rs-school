const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');//allow url friendly names for our slugs

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter an event name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

eventSchema.pre('save', function(next) {
  if(!this.isModified('name')){
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
})

module.exports = mongoose.model('Event', eventSchema)
