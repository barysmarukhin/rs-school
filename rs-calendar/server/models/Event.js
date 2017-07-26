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
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply address!'
    }
  },
  photo: String
});

eventSchema.pre('save', async function(next) {
  if(!this.isModified('name')){
    next();
    return;
  }
  this.slug = slug(this.name);

  //handle the same named slugs
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const eventsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if(eventsWithSlug.length) {
    this.slug = `${this.slug}-${eventsWithSlug.length}`;
  }
  next();
})

module.exports = mongoose.model('Event', eventSchema)
