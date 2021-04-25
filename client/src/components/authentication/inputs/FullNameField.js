import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const FullNameField = (props) => {

    const [ validationState, setValidationState ] = useState({
        validateStatus: undefined,
        help: null,
    });

    useEffect(() => {
        if (props.error.source === 'fullName') {
            setValidationState({ validateStatus: 'error', help: props.error.message });
        }
    }, [ props.error.source, props.error.message ]);

    const removeValidationState = () => {
        setValidationState({
            validateStatus: undefined,
            help: null,
        });
    };

    return (
        <Form.Item
            name="fullName"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please insert your full name!',
                },
                {
                    pattern: new RegExp('^[a-zA-Z -]{3,30}$'),
                    message: 'The name should only contain letters, spaces and dashes.',
                },
            ]}
            validateStatus={validationState.validateStatus}
            help={validationState.help}
        >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />}
                   placeholder=" Full Name" onChange={removeValidationState} {...props} />
        </Form.Item>
    );
};

export default FullNameField;