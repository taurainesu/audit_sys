var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');

module.exports = function(passport) {
	  //Configure Passport authenticated session persistence
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
           return done(err, user);
        });
    });

   passport.use('local', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
        }, (req,username, password, done) =>{
       // console.log(User.find());
       // console.log(User);
            //Find User
            User.findOne({username:username})
                .then(user =>{
                    if (!user){
                        return done(null, false, {message : 'Email is not registered'});
                    }

                    //Match password
                    if(password == user.password){
                        // console.log(req.isAuthenticated())
                        return done(null, user);
                    }else{
                        return  done( null, false, {message: 'Password is incorrect'});
                    }

                    // bcrypt.compare(password, user.password, (err, isMatch) => {
                    //     if(err) throw err;
                    //     if(isMatch){
                    //         return done(null, user);
                    //     }else{
                    //         return  done( null, false, {message: 'Password is incorrect'});
                    //     }
                    // });
                })
                .catch(err => console.log(err));
        })
    );


};
