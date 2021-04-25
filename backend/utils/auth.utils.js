const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');

const mailgunDomain = 'mailgun.re-chord.live';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: mailgunDomain });

const addToken = (user, res) => {
    jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
        if (err) {
            res.status(404).json(err);
        }

        res.cookie('t', token);

        return res.json({
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar,
            },
            token,
        });
    });
};

const handleRegistrationError = (err, res) => {
    if (err.code === 11000) {
        return res.status(500).json({
            message: 'The provided ' + Object.keys(err.keyPattern).pop() + ' is taken!',
            source: Object.keys(err.keyPattern).pop(),
        });
    }

    return res.status(400).json(err);
};

const hashPassword = (user, password, res) => {
    bcrypt.hash(password, 10)
        .then(hash => {
            user.password = hash;
            user.save().then(updatedUser => addToken(updatedUser, res))
                .catch(err => handleRegistrationError(err, res));
        })
        .catch(err => res.status(500).json({ message: err }));
};

const buildActivationEmail = (user) => {
    const token = jwt.sign({ email: user.email }, process.env.EMAIL_VALIDATION_KEY, { expiresIn: '60m' });
    user.activationToken = token;

    return {
        from: 'reChord <noreply@rechord.org>',
        to: user.email,
        subject: 'Activate Your reChord Account',
        html: `
            <h3>Please click on the following link to activate your reChord account:</h3>
            <a href="${process.env.CLIENT_URL}/activate/${token}">activate account</a>
        `,
    };
};

const sendActivationEmail = (user, data, res) => {
    user.save()
        .then(() => {
            mg.messages().send(data)
                .then(() => res.json('An activation link has been sent to your email address!'))
                .catch(err => {
                    console.log(err);
                    User.deleteOne({ email: user.email })
                        .then(() => res.status(500).json({
                            message: 'Email address is invalid!',
                            source: 'email',
                        }));
                });
        })
        .catch(err => handleRegistrationError(err, res));
};

module.exports = { hashPassword, addToken, handleRegistrationError, buildActivationEmail, sendActivationEmail };