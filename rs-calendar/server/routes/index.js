const express = require('express');
const router = express.Router();
const path = require('path');

// Do work here
router.get('/', (req, res) => {
  // Always return the main index.html, so react-router render the route in the client
  res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

router.get('/about', (req, res) => {
  res.render('events');
})

module.exports = router;
