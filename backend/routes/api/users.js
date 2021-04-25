const express = require('express');
const controller = require('../../controllers/users');
const auth = require('../../middleware/auth');

const router = express.Router();

router.route('/')
    .get(controller.getUsers);

router.route('/:userID')
    .get(controller.getUserByID)
    .patch(auth, controller.updateUser)
    .delete(controller.deleteUser);

router.route('/:userID/change-password')
    .post(auth, controller.changePassword);

router.route('/:userID/albums')
    .get(auth, controller.getUserAlbums)
    .post(auth, controller.addAlbum);

router.route('/:userID/albums/:albumID')
    .get(auth, controller.getAlbumByID)
    .put(auth, controller.updateAlbum)
    .delete(auth, controller.deleteAlbum);

module.exports = router;
