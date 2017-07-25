exports.getEvents = (req, res, next) => {
  console.log(req.name)
  res.render('administrator');
}

exports.addEvent = (req, res, next) => {
  res.render('editEvent', { title: 'Add Event' });
}

exports.createEvent = (req, res, next) => {
  res.json(req.body);
}
