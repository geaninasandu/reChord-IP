import React, { useState } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.less';
import '../../styles/albumCard.scss';
import InfoModal from '../modals/InfoModal';
import { AboutAction, AddAction, MarkAsListenedAction, RateAction, RemoveAction } from './Actions';
import { isAuthenticated } from '../../auth';

const truncate = (str, maxLength) => {
    return (str.length > maxLength) ? str.substr(0, maxLength - 1) + '...' : str;
};

const AlbumCard = (props) => {

    const { user, token } = isAuthenticated();
    const [ modalVisibility, setModalVisibility ] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const actions = () => {
        if (props.search)
            return [ <AddAction album={props.album} user={user} token={token} /> ];

        return [
            !props.listened ?
                <MarkAsListenedAction album={props.album} user={user} token={token} /> :
                <RateAction album={props.album} text={props.album.rating} user={user} token={token} />,

            <AboutAction toggleModalVisibility={toggleModalVisibility} />,
            <RemoveAction album={props.album} user={user} token={token} />,
        ];
    };

    return (
        <div>
            <Card hoverable className="album-card" bodyStyle={{ padding: 0 }}
                  cover={
                      <div className="album-cover">
                          <div className="album-info">
                              <h1 className="album-title">{truncate(props.album.title, 40)}</h1>
                              <h3 className="album-artist">{truncate(props.album.artist, 35)}</h3>
                          </div>
                          <div className="gradient">
                              <img className="cover-image" src={props.album.cover} alt={props.album.title} />
                          </div>
                      </div>
                  }

                  actions={actions()}>
            </Card>

            <InfoModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility}
                       album={props.album} />
        </div>
    );
};

export default AlbumCard;