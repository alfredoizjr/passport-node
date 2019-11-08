const passport = require("passport");
const LocalStrateg = require("passport-local").Strategy;
const User = require("../models/users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-singup",
  new LocalStrateg(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        done(
          null,
          false,
          req.flash("singupMessage", "the email is alredy take")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use('local-singin', new LocalStrateg({
  usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
},async (req,email,password,done) => {

  user = await User.findOne({email: email})

  if(!user) {
    return done(null,false, req.flash('singinMessage','No user found'));
  }

  if(!user.comparetPasswrod(password)) {
    return done(null,false, req.flash('singinMessage','Incorrect password'));
  }

  done(null,user);

}));
