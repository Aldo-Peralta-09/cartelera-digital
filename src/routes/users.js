const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin',(req,res) =>{
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/events',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup',(req,res) =>{
  res.render('users/signup');
});

router.post('/users/signup', async (req,res) =>{
  const {name,email,dependency,password,confirm_password} = req.body;
  const errors = [];
  if (password != confirm_password) {
    errors.push({text: 'Las contraseñas no coinciden'});
  }
  if (password.length < 8) {
    errors.push({text: 'La contraseña debe de ser al menos de 8 caracteres'});
  }
  if (errors.length > 0) {
    res.render('users/signup', {errors,name,email,password,confirm_password});
  } else{
    const emailUser = await User.findOne({email: email});
    if(emailUser){
      req.flash('error_msg', 'El email ya esta en uso');
      res.redirect('/users/signup');
    }
    const newUser = new User({name,email,password,dependency});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Has sido registrado con exito');
    res.redirect('/users/signin');
  }
});

router.get('/users', async (req,res) =>{
  const users = await User.find().sort({date:'desc'});
  res.render('users/all-users',{users});
});

router.get('/users/edit/:id', async (req,res) =>{
  const user = await User.findById(req.params.id);
  res.render('users/edit-user',{user});
});

router.put('/users/edit-user/:id', async (req,res) =>{
  const {name,email,dependency,password,confirm_password} = req.body;
  const errors = [];
  if (password != confirm_password) {
    errors.push({text: 'Las contraseñas no coinciden'});
  }
  if (password.length < 8) {
    errors.push({text: 'La contraseña debe de ser al menos de 8 caracteres'});
  }
  if (errors.length > 0) {
    const user = await User.findById(req.params.id);
    res.render('users/edit-user', {errors,user});
  } else{
    const newUser = new User();
    const pass = await newUser.encryptPassword(password);
    await User.findByIdAndUpdate(req.params.id,{name,email,pass,dependency});
    req.flash('success_msg','Usuario actualizado satisfactoriamente');
    res.redirect('/users');
  }
});

router.delete('/users/delete/:id', async (req,res) =>{
  await User.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Usuario eliminado satisfactoriamente');
  res.redirect('/users');
});

router.get('/users/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
