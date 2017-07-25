const express = require('express');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');

// Do work here
router.get('/', (req, res) => {
  // Always return the main index.html, so react-router render the route in the client
  res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

router.get('/administrator', eventController.getEvents)
router.get('/administrator/add', eventController.addEvent)
router.post('/administrator/add', eventController.createEvent)
module.exports = router;
