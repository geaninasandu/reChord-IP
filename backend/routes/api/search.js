const express = require('express');
const auth = require('../../middleware/auth');
const { searchAlbums, searchAlbumByID } = require('../../controllers/search');

const router = express.Router();

router.post('/', auth, searchAlbums);
router.get('/:id', auth, searchAlbumByID);

module.exports = router;
