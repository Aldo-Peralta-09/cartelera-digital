const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const {isAuthenticated} = require('../helpers/auth');

router.get('/schedules/add', isAuthenticated, (req,res) =>{
    res.render('schedules/new-schedule');
});
  
router.post('/schedule/new-schedule', isAuthenticated, async (req,res) =>{
    const errors = [];
    if (errors.length > 0) {
      res.render('schedule/new-schedule',{
        errors
      });
    } else{
      const newSchedule = new Schedule();
      newSchedule.name = req.body.name;
      newSchedule.date = req.body.date;
      newSchedule.monday = req.body.monday1 + " " + req.body.monday2 + " " + req.body.monday3;
      newSchedule.tuesday = req.body.tuesday1 + " " + req.body.tuesday2 + " " + req.body.tuesday3;
      newSchedule.wednesday = req.body.wednesday1 + " " + req.body.wednesday2 + " " + req.body.wednesday3;
      newSchedule.thursday = req.body.thursday1 + " " + req.body.thursday2 + " " + req.body.thursday3;
      newSchedule.friday = req.body.friday1 + " " + req.body.friday2 + " " + req.body.friday3;
      newSchedule.saturday = req.body.saturday1 + " " + req.body.saturday2 + " " + req.body.saturday3;
      newSchedule.sunday = req.body.sunday1 + " " + req.body.sunday2 + " " + req.body.sunday3;
      newSchedule.user =  req.user.id;
      await newSchedule.save();
      req.flash('success_msg','Horario agregado satisfactoriamente');
      res.redirect('/schedules');
    }
});
  
router.get('/schedules', isAuthenticated, async (req,res) =>{
    const schedules = await Schedule.find({user: req.user.id}).sort({date:'desc'});
    res.render('schedules/all-schedules',{schedules});
});
  
router.get('/schedules/edit/:id', isAuthenticated, async (req,res) =>{
    const schedule = await Schedule.findById(req.params.id);
    res.render('schedules/edit-schedule',{schedule});
});
  
router.put('/schedules/edit-schedule/:id', isAuthenticated, async (req,res) =>{
    const {title,dates} = req.body;
    await Schedule.findByIdAndUpdate(req.params.id,{title,dates});
    req.flash('success_msg','Horario actualizado satisfactoriamente');
    res.redirect('/schedules');
});
  
router.delete('/schedules/delete/:id', isAuthenticated, async (req,res) =>{
    await Schedule.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Horario eliminado satisfactoriamente');
    res.redirect('/events');
});

module.exports = router;