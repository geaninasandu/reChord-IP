const axios = require('axios');

exports.searchAlbums = (req, res) => {
    axios.get('https://api.deezer.com/search/album', {
        params: {
            q: req.body.album,
        },
    })
        .then(response => {
            if (response.data.total === 0) {
                return res.status(404).json('Album not found!');
            }

            const albumData = response.data.data;

            return res.json(albumData.map(album => ({
                deezerID: album.id,
                title: album.title,
                artist: album.artist.name,
                cover: album.cover_big,
            })));
        })
        .catch(err => res.status(400).json(err));
};

exports.searchAlbumByID = (req, res) => {
    axios.get('https://api.deezer.com/album/' + req.params.id)
        .then(response => {
            const albumData = response.data;

            if (!albumData.title) {
                return res.status(404).json('Album not found!');
            }

            return res.json({
                deezerID: albumData.id,
                title: albumData.title,
                artist: albumData.artist.name,
                cover: albumData.cover_big,
                duration: albumData.duration,
                year: albumData.release_date.slice(0, 4),
                trackList: albumData.tracks.data.map((track, index) => ({
                    index: index + 1,
                    title: track.title,
                    duration: track.duration,
                })),
            });
        })
        .catch(err => {
            res.status(404).json(err);
        });
};
