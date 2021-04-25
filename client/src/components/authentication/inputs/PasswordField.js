import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';

const PasswordField = (props) => {

    const [ validationState, setValidationState ] = useState({
        validateStatus: undefined,
        help: null,
    });

    useEffect(() => {
        if (props.error.source === 'password') {
            setValidationState({ validateStatus: 'error', help: props.error.message });
        }
    }, [ props.error.source, props.error.message ]);

    const removeValidationState = () => {
        setValidationState({
            validateStatus: undefined,
            help: null,
        });
    };

    const requiredRule = {
        required: true,
        message: 'Please insert your password!',
    };

    const patternRule = {
        pattern: new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|' +
            '((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
        ),
        message: 'The password must be at least 6 characters long and contain a combination of letters, ' +
            'numbers and special characters!',
    };

    return (
        <Form.Item
            style={props.formType === 'login' && { marginBottom: '1vh' }}
            name={props.name ? props.name : 'password'}
            hasFeedback={props.formType === 'register'}
            rules={props.formType === 'register' ? [ requiredRule, patternRule ] : [ requiredRule ]}
            validateStatus={validationState.validateStatus}
            help={validationState.help}
        >
            <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={props.placeholder ? props.placeholder : ' Password'}
                iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={removeValidationState}
            />
        </Form.Item>
    );
};

export default PasswordField;