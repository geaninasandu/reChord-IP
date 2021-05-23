import React from 'react';
import { Layout } from 'antd';
import ContentHeader from './ContentHeader';
import Albums from '../../../pages/Albums';
import Settings from '../../../pages/Settings';
import { useStoreState } from 'easy-peasy';

const { Content } = Layout;

const ContentContainer = (props) => {

    const searchString = useStoreState(state => state.searchString);

    return (
        <Content id="content-container">
            <ContentHeader title={searchString === '' ? props.title : 'Search'} />

            {
                searchString !== '' ?
                    <Albums content="search" /> :

                    <div id="content-div">
                        {props.title === 'Playlist' && <Albums content="playlist" />}
                        {props.title === 'New' && <Albums content="new" />}
                        {props.title === 'Listened' && <Albums content="listened" />}
                        {props.title === 'Settings' && <Settings />}
                    </div>
            }
        </Content>
    );
};

export default ContentContainer;