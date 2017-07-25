const mongoose = require('mongoose');
const Event = mongoose.model('Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.render('events', { title: 'List of events', events });
}

exports.addEvent = (req, res) => {
  res.render('editEvent', { title: 'Add Event' });
}

exports.createEvent = async (req, res) => {
  const event = await (new Event(req.body)).save();
  req.flash('success', `Your event <strong>${event.name}</strong> successfully added`)
  res.redirect(`/administrator/event/${event.slug}`);
}

exports.editEvent = async (req, res) => {
  //1. Find the event given the ID
  const event = await Event.findOne({_id: req.params.id});
  console.log(event);
  //2. Confirm they are the owner of the event
  //TODO
  //3. Render out the edit form so the user can update their event
  res.render('editEvent', { title:`Edit "${event.name}"`, event });
}

exports.updateEvent = async (req, res) => {
  // find and update the event
  const event = await Event.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, //return the new store instead of the old one
    runValidators: true
  }).exec();// run the query
  req.flash('success', `Successfully updated <strong>${event.name}</strong>. <a href="/administrator/events/${event._id}">View Event</a>`);
  // redirect them the event and tell them it worked
  res.redirect(`/administrator/events/${event._id}/edit`);
}
