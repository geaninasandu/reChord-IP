import axios from 'axios';
import { action, thunk } from 'easy-peasy';
import { includes, lowerCase } from 'lodash';

const config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
};

const update = (currentAlbum, album) => {
    if (currentAlbum.deezerID === album.deezerID) {
        currentAlbum = { ...album };
    }

    return currentAlbum;
};

const searchQuery = (album, searchString) => {
    const titleArtist = lowerCase(album.title + ' ' + album.artist);
    const artistTitle = lowerCase(album.artist + ' ' + album.title);

    return includes(titleArtist, searchString) || includes(artistTitle, searchString);
};

export default {
    albums: [],
    searchResults: [],
    searchString: '',
    foundAlbums: [],

    fetchAlbums: thunk((actions, { user, token }) => {
        return axios.get(`/api/users/${user._id}/albums`, config(token))
            .then(response => actions.setAlbums(response.data));
    }),

    searchAlbum: thunk((actions, { album, user, token }) => {
        return axios.post('/api/search', { album: album }, config(token))
            .then(response => actions.setSearchResults(response.data))
            .catch(() => actions.setSearchResults([]));
    }),

    addAlbum: thunk((actions, { deezerID, user, token }) => {
        return axios.get(`/api/search/${deezerID}`, config(token))
            .then(response => {
                actions.add(response.data);
                axios.post(`/api/users/${user._id}/albums`, response.data, config(token))
                    .catch(err => {
                        throw err;
                    });
            })
            .catch(err => {
                throw err;
            });
    }),

    removeAlbum: thunk((actions, { deezerID, user, token }) => {
        return axios.delete(`/api/users/${user._id}/albums/${deezerID}`, config(token))
            .then(() => actions.delete(deezerID))
            .catch(err => {
                throw err;
            });
    }),

    updateAlbum: thunk((actions, { album, user, token }) => {
        return axios.put(`/api/users/${user._id}/albums/${album.deezerID}`, album, config(token))
            .then(() => actions.update(album))
            .catch(err => {
                throw err;
            });
    }),

    setAlbums: action((state, albums) => {
        state.albums = albums;
    }),

    setSearchResults: action((state, albums) => {
        state.searchResults = albums;
    }),

    add: action((state, album) => {
        state.albums = [ album, ...state.albums ];
    }),

    delete: action((state, deezerID) => {
        state.albums = state.albums.filter(album => album.deezerID !== deezerID);
    }),

    update: action((state, album) => {
        state.albums = state.albums.map(currentAlbum => update(currentAlbum, album));
    }),

    setSearchString: action((state, searchString) => {
        state.searchString = lowerCase(searchString);
    }),

    findAlbum: action((state) => {
        state.foundAlbums = state.albums.filter(album => searchQuery(album, state.searchString));
    }),
};

