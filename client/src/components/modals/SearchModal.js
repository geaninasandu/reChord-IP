import React, { useState } from 'react';
import { Empty, Input, Modal, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AlbumCard from '../album/AlbumCard';
import { isAuthenticated } from '../../auth';

const { Search } = Input;

const SearchModal = (props) => {

    const { user, token } = isAuthenticated();

    const [ searched, setSearched ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const searchAlbum = useStoreActions(actions => actions.searchAlbum);
    const searchResults = useStoreState(state => state.searchResults);

    return (
        <Modal title="Add a new album to your library" visible={props.modalVisibility} footer={null} width="50%"
               onCancel={props.toggleModalVisibility} bodyStyle={{ minHeight: '15rem' }}>

            <Search placeholder="Search for album..." allowClear enterButton={true} onSearch={value => {
                setSearched(true);
                searchAlbum({ album: value, user, token }).then(() => setLoading(false));
            }} />

            <div className="search-results">
                {
                    searched ?
                        (
                            loading ?
                                <Spin size="large" /> :

                                (
                                    searchResults.length ?
                                        searchResults.map(album =>
                                            <AlbumCard key={album.deezerID} album={album} loading={true}
                                                       listened={album.listened} search={true}
                                            />,
                                        ) :

                                        <Empty description={'No albums found!'} />
                                )
                        ) :
                        <SearchOutlined className="search-icon" />
                }
            </div>
        </Modal>
    );
};

export default SearchModal;