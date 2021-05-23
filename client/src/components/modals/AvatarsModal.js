import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Modal } from 'antd';
import '../../styles/settings.scss';
import { isAuthenticated, updateAuth } from '../../auth';
import { useHistory } from 'react-router-dom';

const AvatarsModal = (props) => {
    const { user, token } = isAuthenticated();
    const history = useHistory();

    const [ selected, setSelected ] = useState(user.avatar);

    const avatars = [ 'bear', 'cat', 'elephant', 'giraffe', 'horse', 'koala', 'lion', 'panda', 'panther',
        'rhinoceros', 'tiger', 'zebra' ];

    const updateAvatar = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        axios.patch(`/api/users/${user._id}`, { avatar: selected }, config)
            .then(response => {
                if (response.status === 200) {
                    updateAuth(selected, () => history.go(0));
                }
            });
    };

    return (
        <Modal title="Change avatar" visible={props.modalVisibility} onCancel={props.toggleModalVisibility}
               width="30rem" okText="Update Avatar" onOk={updateAvatar}>
            <div id="avatars">
                {
                    avatars.map(avatar =>
                        <Avatar key={avatar} size={96} src={require(`../../assets/images/avatars/${avatar}.svg`)}
                                className={[ 'avatar-img', avatar === selected && 'selected-avatar' ].join(' ')}
                                onClick={async () => await setSelected(avatar)}
                        />,
                    )
                }
            </div>
        </Modal>
    );
};

export default AvatarsModal;