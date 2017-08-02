const mongoose = require('mongoose');
const Speaker = mongoose.model('Speaker');
const md5 = require('md5');

exports.getSpeakers = async (req, res) => {
  const speakers = await Speaker.find();
  res.render('speakers', { title: 'List of speakers', speakers });
};

exports.addSpeaker = (req, res) => {
  res.render('addSpeaker', { title: 'Add New Speaker' })
}

exports.createSpeaker = async (req, res) => {
  const hash = md5(req.body.email);
  req.body.avatar = `https://gravatar.com/avatar/${hash}?s=200`;
  const speaker = await (new Speaker(req.body)).save();
  req.flash('success', `Speaker <strong>${speaker.name}</strong> successfully added`)
  res.redirect('back');
}

exports.searchSpeakers = async (req, res) => {
  const events = await Speaker.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }//now we project(create) a new field named score
  })
  //sort by score
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(5);
  res.json(events);
}

exports.showSpeakers = async (req, res) => {
  const speakers = await Speaker.find();
  res.json(speakers);
}
