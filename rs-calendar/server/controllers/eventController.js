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
  const event = await (new Event(req.body)).save();
  req.flash('success', `Your event <strong>${event.name}</strong> successfully added`)
  res.redirect(`/administrator/event/${event.slug}`);
}

exports.editEvent = async (req, res) => {
  //1. Find the event given the ID
  const event = await Event.findOne({_id: req.params.id});
  //2. Confirm they are the owner of the event
  //TODO
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
  req.flash('success', `Successfully updated <strong>${event.name}</strong>. <a href="/administrator/events/${event._id}">View Event</a>`);
  // redirect them the event and tell them it worked
  res.redirect(`/administrator/events/${event._id}/edit`);
}