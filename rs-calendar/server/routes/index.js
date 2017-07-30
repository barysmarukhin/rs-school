const express = require('express');
const router = express.Router();
const path = require('path');
const eventController = require('../controllers/eventController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  // Always return the main index.html, so react-router render the route on the client
  res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

router.get('/administrator', catchErrors(eventController.getEvents));
router.get('/administrator/events', catchErrors(eventController.getEvents));
router.get('/administrator/add', authController.isLoggedIn, eventController.addEvent);
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

router.get('/administrator/tags', catchErrors(eventController.getEventsByTag));
router.get('/administrator/tags/:tag', catchErrors(eventController.getEventsByTag));

router.get('/administrator/login', userController.loginForm);
router.post('/administrator/login', authController.login);
router.get('/administrator/logout', authController.logout);
router.get('/administrator/register', userController.registerForm);

router.post('/administrator/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/administrator/account', authController.isLoggedIn, userController.account);
router.post('/administrator/account', catchErrors(userController.updateAccount));
router.post('/administrator/account/forgot', catchErrors(authController.forgot));
router.get('/administrator/account/reset/:token', catchErrors(authController.reset));
router.post('/administrator/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
)

/*
  API
*/

router.get('/administrator/api/search', catchErrors(eventController.searchEvents));
router.get('/administrator/api/events/near', catchErrors(eventController.mapEvents));
module.exports = router;
