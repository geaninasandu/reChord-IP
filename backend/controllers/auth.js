const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mailgun = require('mailgun-js');
const { buildActivationEmail, sendActivationEmail } = require('../utils/auth.utils');
const { credentialsValidator, emailValidator } = require('../utils/users.utils');
const { addToken } = require('../utils/auth.utils');

const mailgunDomain = 'mailgun.re-chord.live';
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: mailgunDomain });

exports.login = (req, res) => {
    if (!emailValidator(req.body.email)) {
        return res.status(400).json('Invalid email!');
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User does not exist!', source: 'email' });
        }

        if (user.activationToken !== '') {
            return res.status(403).json({ message: 'Your account is not activated!', source: 'activation' });
        }

        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ message: 'Password is incorrect!', source: 'password' });
                }

                addToken(user, res);
            })
            .catch(err => res.status(500).json({ message: err }));
    });
};

exports.register = (req, res) => {
    try {
        credentialsValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    const user = new User(req.body);

    const activationEmail = buildActivationEmail(user);

    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            sendActivationEmail(user, activationEmail, res);
        })
        .catch(err => res.status(500).json({ message: err }));
};

exports.activateAccount = (req, res) => {
    const { activationToken } = req.body;

    if (!activationToken) {
        return res.status(403).json('You are not authorized to activate this account!');
    }

    jwt.verify(activationToken, process.env.EMAIL_VALIDATION_KEY, (err) => {
        if (err) {
            return res.status(401).json('The activation token is invalid or has expired!');
        }

        User.findOne({ activationToken })
            .then(user => {
                if (!user) {
                    return res.status(400).json('This account is active or the token is invalid!');
                }

                user.activationToken = '';
                user.save().then(() => res.json('Account successfully activated!'))
                    .catch(err => res.status(500).json(err));
            });
    });
};

exports.resendActivationEmail = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found!', source: 'email' });
            }

            const activationEmail = buildActivationEmail(user);
            sendActivationEmail(user, activationEmail, res);
        })
        .catch(err => res.status(500).json({ message: err, source: 'email' }));
};

exports.logout = (req, res) => {
    res.clearCookie('t');
    res.send('Logout was successful.');
};

exports.forgotPassword = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Email address not found!', source: 'email' });
            }

            const token = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });

            const data = {
                from: 'reChord <noreply@rechord.org>',
                to: req.body.email,
                subject: 'Reset Your reChord Password',
                html: `
                    <h3>Please click on the following link to reset your reChord password:</h3>
                    <a href="${process.env.CLIENT_URL}/reset/${token}">reset password</a>
                `,
            };

            user.updateOne({ resetToken: token })
                .then(() => {
                    mg.messages().send(data)
                        .then(() => res.json('A password reset link has been sent to your email address!'))
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        });
};

exports.resetPassword = (req, res) => {
    const { resetToken, password } = req.body;

    if (!resetToken) {
        return res.status(403).json({ message: 'You are not authorized to reset the password!', source: 'password' });
    }

    jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY, (err) => {
        if (err) {
            return res.status(401).json({ message: 'The reset token is invalid or has expired!', source: 'password' });
        }

        User.findOne({ resetToken })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ message: 'User with this token was not found!', source: 'password' });
                }

                user.resetToken = '';
                bcrypt.hash(password, 10)
                    .then(hash => {
                        user.password = hash;
                        user.save().then(() => res.json('Your password has been successfully reset!'));
                    })
                    .catch(err => res.status(500).json({ message: err }));
            });
    });
};