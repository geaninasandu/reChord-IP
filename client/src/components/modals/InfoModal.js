import React from 'react';
import { Modal, Tag } from 'antd';
import '../../styles/infoModal.scss';
import TracksTable from '../dashboard/others/TracksTable';
import { MarkAsListenedAction, RateAction, RemoveAction } from '../album/Actions';
import { isAuthenticated } from '../../auth';

const InfoModal = (props) => {

    const { user, token } = isAuthenticated();

    return (
        <Modal title="Album Info" visible={props.modalVisibility} footer={null} width="60%"
               onCancel={props.toggleModalVisibility} bodyStyle={{ minHeight: '50vh' }}>
            <div id="info-container">
                <div id="image-container">
                    <img className="cover-image" src={props.album.cover} alt={props.album.title} />

                    <div className="action-buttons">
                        {
                            !props.album.listened ?
                                <MarkAsListenedAction album={props.album} user={user} token={token} /> :
                                <div className="rating">
                                    <RateAction album={props.album} user={user} token={token} />
                                    <h2>{props.album.rating}</h2>
                                </div>
                        }
                        <RemoveAction album={props.album} user={user} token={token} />
                    </div>
                </div>

                <div id="info-container">
                    <div id="info">
                        <div id="title">
                            <h1>{props.album.title}</h1>
                            <Tag color="#25bdbc">{props.album.year}</Tag>
                        </div>
                        <h3>{props.album.artist}</h3>
                    </div>

                    <TracksTable tracks={props.album.trackList} duration={props.album.duration} />
                </div>
            </div>
        </Modal>
    );
};

export default InfoModal;