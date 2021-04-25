const mongoose = require('mongoose');
const AlbumSchema = require('./Album.js');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    albums: {
        type: [ AlbumSchema ],
        default: [],
        required: true,
    },
    resetToken: {
        type: String,
        default: '',
    },
    activationToken: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
