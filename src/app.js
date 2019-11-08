const express = require('express');
const engine = require('ejs-mate');
const passport = require('passport');
const path = require('path');
const sessions = require('express-session');
const app = express();
const flash = require('connect-flash');
// db connection
require('./db');
require('./passport/local.auth');
// settings
app.set('views',path.join(__dirname,'views'));
app.set('port',process.env.PORT || 8000);
app.engine('ejs',engine);
app.set('view engine','ejs');
// middleware
app.use(express.urlencoded({extended: true}));
app.use(sessions({
    secret: 'mysecretSession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());// flash message
app.use(passport.initialize());
app.use(passport.session());

// send flash message to all routers 
app.use((req,res,next) => {
    app.locals.singupMessage = req.flash('singupMessage');
    app.locals.singinMessage = req.flash('singinMessage');
    app.locals.user = req.user;
    next();
})

// routes
app.use('/',require('./routes/router'));
// public
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get('port'),() => console.log('server is online on port '+ app.get('port')))