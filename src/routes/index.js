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
  let horario = "";
  if (schedule.monday != "") {
    horario = horario + '<p class="card-text"> Lunes: ' + schedule.monday + '</p>';
    if (schedule.tuesday != "") {
      horario = horario + '<p class="card-text"> Martes: ' + schedule.tuesday + '</p>';
      if (schedule.wednesday != "") {
        horario = horario + '<p class="card-text"> Miercoles: ' + schedule.wednesday + '</p>';
        if (schedule.thursday != "") {
          horario = horario + '<p class="card-text"> Jueves: ' + schedule.thursday + '</p>';
          if (schedule.friday != "") {
            horario = horario + '<p class="card-text"> Viernes: ' + schedule.friday + '</p>';
            if (schedule.saturday != "") {
              horario = horario + '<p class="card-text"> Sabado: ' + schedule.saturday + '</p>';
              if (schedule.sunday != "") {
                horario = horario + '<p class="card-text"> Domingo: ' + schedule.sunday + '</p>';
              }
            }
          }
        }
      }
    }
  }
  res.render('detail',{evento,horario});
});

module.exports = router;
