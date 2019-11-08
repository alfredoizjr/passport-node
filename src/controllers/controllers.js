const passport = require("passport");

const controller = {
  getHome: (req, res) => {
    res.render("home");
  },
  signUp: (req, res) => {
    res.render("singup");
  },

  signUpPosted: passport.authenticate("local-singup", {
    successRedirect: "/profile",
    failureRedirect: "/singup",
    passReqToCallback: true
  }),

  singIn: (req, res) => {
    res.render('singin');
  },
  signInPosted: passport.authenticate("local-singin", {
    successRedirect: "/profile",
    failureRedirect: "/singin",
    passReqToCallback: true
  }),
  getProfile: (req, res) => {
    res.render("profile");
  },

  LogOut: (req, res) => {
      req.logout();
      res.redirect('/');
  },

  idAuthenticated: function (req,res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/')
  }
};

module.exports = controller;
