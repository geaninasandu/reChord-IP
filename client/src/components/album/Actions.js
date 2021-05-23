import React from 'react';
import {
    CustomerServiceOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    PlusCircleOutlined,
    StarFilled,
    StarOutlined,
} from '@ant-design/icons';
import ActionButton from './ActionButton';
import { useStoreActions } from 'easy-peasy';
import { message, Modal, Popover, Rate } from 'antd';

const { confirm } = Modal;

const executeAction = (action, text) => {
    action.then(() => message.success(text)).catch(() => message.error('Oops! Something went wrong!'));
};

const showConfirm = (deezerID, removeAlbum, user, token) => {
    confirm({
        title: 'Are you sure you want to remove this album from your library?',
        icon: <ExclamationCircleOutlined />,
        maskClosable: true,
        okText: 'Yes',
        onOk() {
            executeAction(removeAlbum({ deezerID, user, token }), 'Successfully removed album from the library!');
        },
    });
};

export const AddAction = (props) => {
    const addAlbum = useStoreActions(actions => actions.addAlbum);

    return (
        <ActionButton title="Add to library" icon={<PlusCircleOutlined style={{ margin: '0.2rem' }} />}
                      text="Add to library"
                      onClick={() => executeAction(addAlbum({
                              deezerID: props.album.deezerID,
                              user: props.user,
                              token: props.token,
                          }),
                          'Successfully added album to the library!')} />
    );
};

export const MarkAsListenedAction = (props) => {
    const updateAlbum = useStoreActions(actions => actions.updateAlbum);

    return (
        <ActionButton title="Mark as listened" icon={<CustomerServiceOutlined />} onClick={() => {
            const album = { ...props.album };
            album.listened = true;
            executeAction(updateAlbum({
                album,
                user: props.user,
                token: props.token,
            }), 'Successfully marked album as listened!');
        }} />
    );
};

export const RateAction = (props) => {
    const updateAlbum = useStoreActions(actions => actions.updateAlbum);

    return (
        <Popover trigger="click" content={
            <Rate allowHalf defaultValue={props.album.rating} onChange={(value) => {
                const album = { ...props.album };
                album.rating = value;
                executeAction(updateAlbum({
                    album,
                    user: props.user,
                    token: props.token,
                }), 'Successfully rated album!');
            }} />
        }>
            <ActionButton title="Rate" text={props.text} icon={props.album.rating ?
                <StarFilled style={{ color: '#25bdbc' }} /> :
                <StarOutlined />}
            />
        </Popover>
    );
};

export const AboutAction = (props) => {
    return (
        <ActionButton title="About" icon={<InfoCircleOutlined />} onClick={props.toggleModalVisibility} />
    );
};

export const RemoveAction = (props) => {
    const removeAlbum = useStoreActions(actions => actions.removeAlbum);

    return (
        <ActionButton title="Remove from library" icon={<DeleteOutlined />}
                      onClick={() => showConfirm(props.album.deezerID, removeAlbum, props.user, props.token)} />
    );
};