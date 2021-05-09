import React from 'react';
import {Layout} from 'antd';
import ContentHeader from './ContentHeader';
import Albums from '../../../pages/Albums';
import {useStoreState} from 'easy-peasy';
import EmptyContent from "../../others/EmptyContent";

const {Content} = Layout;

const ContentContainer = (props) => {

    const searchString = useStoreState(state => state.searchString);

    return (
        <Content id="content-container">
            <ContentHeader title={searchString === '' ? props.title : 'Search'}/>

            {
                searchString !== '' ?
                    <Albums content="search"/> :

                    <div id="content-div">
                        {props.title === 'Playlist' && <Albums content="playlist"/>}
                        {props.title === 'New' && <Albums content="new"/>}
                        {props.title === 'Listened' && <Albums content="listened"/>}
                        {props.title === 'Settings' && <EmptyContent/>}
                    </div>
            }
        </Content>
    );
};

export default ContentContainer;