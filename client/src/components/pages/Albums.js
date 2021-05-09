import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Spin } from 'antd';
import AlbumCard from '../album/AlbumCard';
import EmptyContent from '../dashboard/others/EmptyContent';
import { isEqual } from 'lodash';
import { isAuthenticated } from '../../auth';

const Albums = (props) => {
    const { user, token } = isAuthenticated();

    const fetchAlbums = useStoreActions(actions => actions.fetchAlbums);
    const albums = useStoreState(state => {
            switch (props.content) {
                case 'playlist':
                    return state.albums.filter(album => !album.listened);

                case 'new':
                    return state.albums.filter(album => Number(album.year) === new Date().getFullYear() && !album.listened);

                case 'listened':
                    return state.albums.filter(album => album.listened);

                case 'search':
                    return state.foundAlbums;

                default:
                    return state.albums;
            }
        },
        (prev, next) => isEqual(prev, next),
    );

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetchAlbums({ user, token }).then(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    return (
        <div id="content" className="box-shadow">
            {
                loading ?
                    <Spin size="large" /> :

                    !albums.length ?
                        <EmptyContent /> :

                        <div className="albums">
                            <div className="albums-container">
                                {
                                    albums.map(album =>
                                        <AlbumCard key={album.deezerID} album={album} loading={true}
                                                   listened={album.listened} />,
                                    )
                                }
                            </div>
                        </div>
            }
        </div>
    );
};

export default Albums;