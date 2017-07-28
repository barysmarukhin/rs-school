const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const multer = require('multer');//to store photos in the memory of the server
const jimp = require('jimp');// to resize
const uuid = require('uuid');//to give a random unique name

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.render('events', { title: 'List of events', events });
}

exports.addEvent = (req, res) => {
  res.render('editEvent', { title: 'Add Event' });
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if(!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
}

exports.createEvent = async (req, res) => {
  req.body.author = req.user._id;
  const event = await (new Event(req.body)).save();
  req.flash('success', `Your event <strong>${event.name}</strong> successfully added`)
  res.redirect(`/administrator/event/${event.slug}`);
}

const confirmOwner = (event, user) => {
  if(!event.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!');
  }
};

exports.editEvent = async (req, res) => {
  //1. Find the event given the ID
  const event = await Event.findOne({_id: req.params.id});
  //2. Confirm they are the owner of the event
  confirmOwner(event, req.user)
  //3. Render out the edit form so the user can update their event
  res.render('editEvent', { title:`Edit "${event.name}"`, event });
}

exports.updateEvent = async (req, res) => {
  //set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the event
  const event = await Event.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, //return the new store instead of the old one
    runValidators: true
  }).exec();// run the query(first param of findOneAndUpdate)
  req.flash('success', `Successfully updated <strong>${event.name}</strong>. <a href="/administrator/event/${event.slug}">View Event</a>`);
  // redirect them the event and tell them it worked
  res.redirect(`/administrator/events/${event._id}/edit`);
}

exports.getEventBySlug = async (req, res, next) => {
  const event = await Event.findOne({ slug: req.params.slug });
  if(!event) return next();
  res.render('event', { title: event.name, event })
}

exports.getEventsByTag = async(req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true }
  const tagsPromise =  Event.getTagsList();
  const eventsPromise =  Event.find({tags: tagQuery});
  const [tags, events] = await Promise.all([tagsPromise, eventsPromise]);
  res.render('tag', { tags, title: 'Tags', tag, events })
}

exports.searchEvents = async (req, res) => {
  const events = await Event.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }//now we project a new field named score
  })
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(5);
  res.json(events);
}
