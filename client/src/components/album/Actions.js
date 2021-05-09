import React from 'react';
import {
    CustomerServiceOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    PlusCircleOutlined,
    StarFilled,
    StarOutlined,
} from '@ant-design/icons';
import ActionButton from './ActionButton';
import { useStoreActions } from 'easy-peasy';
import { message, Popover, Rate } from 'antd';

const executeAction = (action, text) => {
    action.then(() => message.success(text)).catch(() => message.error('Oops! Something went wrong!'));
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
    return (
        <ActionButton title="Mark as listened" icon={<CustomerServiceOutlined />} />
    );
};

export const RateAction = (props) => {
    return (
        <Popover trigger="click" content={
            <Rate allowHalf defaultValue={props.album.rating} />
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
        <ActionButton title="About" icon={<InfoCircleOutlined />} />
    );
};

export const RemoveAction = (props) => {
    return (
        <ActionButton title="Remove from library" icon={<DeleteOutlined />} />
    );
};