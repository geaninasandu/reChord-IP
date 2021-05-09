import { Tooltip } from 'antd';
import React from 'react';

const ActionButton = (props) => {
    return (
        <Tooltip title={props.title} placement="bottom" mouseEnterDelay="0.5" color="#25bdbc" {...props}>
            {props.icon} {props.text}
        </Tooltip>
    );
};

export default ActionButton;