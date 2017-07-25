const mongoose = require('mongoose');
const Event = mongoose.model('Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.render('events', { title: 'List of events', events });
}

exports.addEvent = (req, res, next) => {
  res.render('editEvent', { title: 'Add Event' });
}

exports.createEvent = async (req, res, next) => {
  const event = await (new Event(req.body)).save();
  req.flash('success', `Your event ${event.name} successfully added`)
  res.redirect(`/administrator/event/${event.slug}`);
}
