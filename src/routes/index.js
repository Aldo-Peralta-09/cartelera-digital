const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => {
  const events = await Event.find().sort({date:'desc'});
  res.render('index',{events});
});

router.get('/detail/:id', async (req, res) => {
  const evento = await Event.findById(req.params.id);
  const schedule = await Schedule.find({name: evento.dates});
  res.render('detail',{evento});
});

module.exports = router;
