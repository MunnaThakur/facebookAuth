const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const facebookStrategy = require('passport-facebook').Strategy;
const routes = require('./route/userRoute');
const config = require('./config/config');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session);

passport.serializeUser(function(user,cb){
    cb(null,user)
});

passport.deserializeUser(function(obj,cb){
    cb(null,obj)
});

passport.use(new facebookStrategy({
    clientID :config.facebookAuth.appId,
    clientSecret : config.facebookAuth.appSecret,
    callbackURL :config.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done){
        return done(null,profile)
    }
))

app.use('/',routes);
const port = 3000;

app.listen(port, ()=>{console.log(`Server is listning on http://localhost:${port}`);});
