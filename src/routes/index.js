const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  const events = await Event.find().sort({date:'desc'});
  res.render('index',{events});
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
