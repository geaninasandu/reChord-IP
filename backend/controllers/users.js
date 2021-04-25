const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    User.find()
        .sort({ '_id': -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json(err));
};

exports.getUserByID = (req, res) => {
    User.findById(req.params.userID)
        .select('-password')
        .then(user => user ? res.json(user) : res.status(404).json('User not found!'))
        .catch(err => res.status(400).json(err));
};

exports.updateUser = (req, res) => {
    User.updateOne({ _id: req.params.userID }, { $set: req.body })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json(err));
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.userID)
        .then(() => res.json('User deleted successfully!'))
        .catch(err => res.status(404).json(err));
};

exports.changePassword = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ message: 'Password is incorrect!', source: 'password' });
                }

                bcrypt.hash(req.body.newPassword, 10)
                    .then(hash => {
                        user.password = hash;
                        user.save().then(() => res.json('Password has been updated successfully!'))
                            .catch(err => res.status(500).json(err));
                    })
                    .catch(err => res.status(500).json({ message: err }));
            });
    });
};

exports.getUserAlbums = (req, res) => {
    User.findById(req.params.userID)
        .then(user => res.json(user.albums.sort((a, b) => a._id > b._id ? -1 : 1)))
        .catch(err => res.status(404).json(err));
};

exports.addAlbum = (req, res) => {
    const query = { _id: req.params.userID, 'albums.deezerID': { $ne: req.body.deezerID } },
        update = { $push: { albums: req.body } };

    User.updateOne(query, update)
        .then(result => res.json(result))
        .catch(err => res.status(404).json(err));
};

exports.getAlbumByID = (req, res) => {
    User.findOne({ _id: req.params.userID }, { albums: { $elemMatch: { deezerID: req.params.albumID } } })
        .then(result => result.albums.length ? res.json(result.albums[0]) : res.status(404).json('Album not found.'))
        .catch(err => res.status(404).json(err));
};

exports.updateAlbum = (req, res) => {
    User.updateOne({ _id: req.params.userID, albums: { $elemMatch: { deezerID: req.params.albumID } } },
        { $set: { 'albums.$': req.body } })
        .then(() => res.json('Album updated successfully.'))
        .catch(err => res.status(404).json(err));
};

exports.deleteAlbum = (req, res) => {
    User.updateOne({ _id: req.params.userID }, { $pull: { albums: { deezerID: req.params.albumID } } })
        .then(() => res.json('Album deleted successfully.'))
        .catch(err => res.status(404).json(err));
};