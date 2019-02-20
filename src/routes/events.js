const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const {isAuthenticated} = require('../helpers/auth');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
  destination: path.join(__dirname,'../public/img/events'),
  filename: (req,file,cb,filename) => {
    cb(null,uuid() + path.extname(file.originalname).toLocaleLowerCase());
  }
});

const upload = multer({
  storage,
  limits: {fileSize: 2000000},
  fileFilter: (req,file,cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if(mimetype && extname){
      return cb(null,true);
    }
    cb("Error: Archivo no es valido");
  }
}).fields([{name: 'banner', maxCount: 1},{name: 'image', maxCount: 1}]);

router.get('/events/add', isAuthenticated, (req,res) =>{
  res.render('events/new-event');
});

router.post('/events/new-event', isAuthenticated, upload, async (req,res) =>{
  //const {title,description,discipline,category,type,hierarchy,event,start,finish,dates,municipality,place,organizer,speaker,url,entry,price,discount,public,especificPublic,gender,banner,image} = req.body;
  const errors = [];
  if (errors.length > 0) {
    res.render('events/new-event',{
      errors
    });
  } else{
    const newEvent = new Event();
    newEvent.title = req.body.title;
    newEvent.description = req.body.description;
    newEvent.discipline = req.body.discipline;
    newEvent.category = req.body.category;
    newEvent.type = req.body.type;
    newEvent.hierarchy = req.body.hierarchy;
    newEvent.event = req.body.event;
    newEvent.start = req.body.start;
    newEvent.finish = req.body.finish;
    req.body.dates = req.body.dates;
    newEvent.municipality = req.body.municipality;
    newEvent.place = req.body.place;
    newEvent.organizer = req.body.organizer;
    newEvent.speaker = req.body.speaker;
    newEvent.url = req.body.url;
    newEvent.entry = req.body.entry;
    newEvent.price = req.body.price;
    newEvent.discount = req.body.discount;
    newEvent.public = req.body.public;
    newEvent.especificPublic = req.body.especificPublic;
    newEvent.gender = req.body.gender;
    newEvent.banner = '/img/events/' + req.files['banner'][0];
    newEvent.image = '/img/events/' + req.files['image'][0];
    newEvent.user = req.user.id;
    await newEvent.save();
    req.flash('success_msg','Evento agregado satisfactoriamente');
    res.redirect('/events');
  }
});

router.get('/events', isAuthenticated, async (req,res) =>{
  const events = await Event.find({user: req.user.id}).sort({date:'desc'});
  res.render('events/all-events',{events});
});

router.get('/events/edit/:id', isAuthenticated, async (req,res) =>{
  const evento = await Event.findById(req.params.id);
  res.render('events/edit-event',{evento});
});

router.put('/events/edit-event/:id', isAuthenticated, async (req,res) =>{
  const {title,dates} = req.body;
  await Event.findByIdAndUpdate(req.params.id,{title,dates});
  req.flash('success_msg','Evento actualizado satisfactoriamente');
  res.redirect('/events');
});

router.delete('/events/delete/:id', isAuthenticated, async (req,res) =>{
  await Event.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Evento eliminado satisfactoriamente');
  res.redirect('/events');
});

module.exports = router;
