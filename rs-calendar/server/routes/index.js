const express = require('express');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  // Always return the main index.html, so react-router render the route in the client
  res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

router.get('/administrator', catchErrors(eventController.getEvents));
router.get('/administrator/events', catchErrors(eventController.getEvents));
router.get('/administrator/add', eventController.addEvent);
router.post('/administrator/add',
  eventController.upload,
  catchErrors(eventController.resize),
  catchErrors(eventController.createEvent)
);
router.post('/administrator/add/:id',
  eventController.upload,
  catchErrors(eventController.resize),
  catchErrors(eventController.updateEvent)
);
router.get('/administrator/events/:id/edit',catchErrors(eventController.editEvent));
router.get('/administrator/event/:slug', catchErrors(eventController.getEventBySlug));

module.exports = router;
