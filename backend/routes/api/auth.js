const express = require('express');
const auth = require('../../middleware/auth');
const { login, logout, forgotPassword, register, resetPassword, activateAccount, resendActivationEmail } = require('../../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/resend', resendActivationEmail);
router.get('/logout', auth, logout);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

module.exports = router;
