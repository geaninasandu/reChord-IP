const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    deezerID: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    trackList: {
        type: [ {
            index: Number,
            title: String,
            duration: String,
        } ],
        default: [],
    },
    listened: {
        type: Boolean,
        required: true,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
});

module.exports = AlbumSchema;
