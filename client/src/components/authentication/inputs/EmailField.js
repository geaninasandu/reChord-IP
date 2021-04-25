import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const EmailField = (props) => {

    const [ validationState, setValidationState ] = useState({
        validateStatus: undefined,
        help: null,
    });

    useEffect(() => {
        if (props.error.source === 'email') {
            setValidationState({ validateStatus: 'error', help: props.error.message });
        }

        if (props.error.source === 'activation') {
            setValidationState({
                validateStatus: 'error',

                help: <span>Your account hasn't been activated! Please confirm your email address
                    or <Button type="link" onClick={props.resend}>
                        <u>request another confirmation link</u>.
                    </Button>
                </span>,
            });
        }
        //eslint-disable-next-line
    }, [ props.error.source, props.error.message ]);

    const removeValidationState = () => {
        setValidationState({
            validateStatus: undefined,
            help: null,
        });
    };

    const requiredRule = {
        required: true,
        message: 'Please insert your email!',
    };

    const patternRule = {
        type: 'email',
        message: 'The input is not a valid email address!',
    };

    return (
        <Form.Item
            name="email"
            hasFeedback={props.formType === 'register'}
            rules={[ requiredRule, patternRule ]}
            validateStatus={validationState.validateStatus}
            help={validationState.help}>
            <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder=" Email"
                   onChange={removeValidationState} />
        </Form.Item>
    );
};

export default EmailField;