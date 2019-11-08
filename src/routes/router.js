const express = require('express');
const conttroller = require('../controllers/controllers')

const route = express.Router();

route.get('/',conttroller.getHome);

route.get('/singup',conttroller.signUp);

route.post('/singup',conttroller.signUpPosted);

route.get('/singin',conttroller.singIn);

route.post('/singin',conttroller.signInPosted);

route.get('/profile', conttroller.idAuthenticated ,conttroller.getProfile);

route.get('/logout',conttroller.LogOut);

module.exports = route;