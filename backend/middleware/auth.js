const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    if (!req.header('Authorization')) {
        res.status(401).json('Authorization denied - JWT token is required.');
    }

    try {
        const token = req.header('Authorization').split(' ')[1];

        req.user = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = auth;