const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await UserModel.create({
                image: profile.photos[0].value,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: 'no password logged in by google',
                signUpWay: 'google'
            });
        }
        isNewUser = true;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        done(null, { token });
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;