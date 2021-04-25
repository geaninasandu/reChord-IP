import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Checkbox, Form, message } from 'antd';
import { shuffle } from 'lodash';
import { authenticate } from '../../auth';
import EmailField from './inputs/EmailField';
import PasswordField from './inputs/PasswordField';
import FullNameField from './inputs/FullNameField';
import SubmitButton from './inputs/SubmitButton';
import ForgotPasswordModal from './ForgotPasswordModal';

const AuthenticationForm = (props) => {

    const history = useHistory();

    const [ modalVisibility, setModalVisibility ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState({
        message: '',
        source: '',
    });

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const avatars = [ 'bear', 'cat', 'elephant', 'giraffe', 'horse', 'koala', 'lion', 'panda', 'panther',
        'rhinoceros', 'tiger', 'zebra' ];

    const auth = (values) => {
        setLoading(true);

        if (props.type === 'register') {
            values.avatar = shuffle(avatars)[0];
        }

        const data = JSON.stringify(values);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post(props.url, data, config)
            .then(response => {
                if (response.status === 200) {
                    if (props.type === 'login') {
                        response.data.remember = values.remember;

                        return authenticate(response.data, () => history.push('/dashboard'));
                    }

                    props.form.resetFields();
                    message.success('An activation link has been sent to your email address!');
                    setLoading(false);
                }
            })
            .catch(err => handleError(err));
    };

    const resendActivationLink = () => {
        setLoading(true);

        axios.post('/api/auth/resend', { email: props.form.getFieldValue('email') })
            .then(response => {
                if (response.status === 200) {
                    message.success('An activation link has been sent to your email address!');
                    setLoading(false);
                }
            })
            .catch(err => handleError(err));
    };

    const handleError = (err) => {
        props.form.resetFields([ 'password' ]);
        setLoading(false);
        setError(err.response.data);
    };

    return (
        <Form name={props.type} initialValues={{ remember: true }} onFinish={auth} form={props.form}>
            {props.type === 'register' && <FullNameField error={error} />}
            <EmailField error={error} formType={props.type} resend={resendActivationLink} />
            <PasswordField error={error} formType={props.type} />
            {
                props.type === 'login' &&
                <div id="login-actions">
                    <Form.Item name='remember' valuePropName='checked' style={{ margin: 0 }}>
                        <Checkbox>Keep me signed in</Checkbox>
                    </Form.Item>

                    <Button className="forgot" type="link" size="small" onClick={toggleModalVisibility}>
                        Forgot password?
                    </Button>
                </div>
            }

            <SubmitButton title={props.title} loading={loading} />

            <ForgotPasswordModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </Form>
    );
};

export default AuthenticationForm;