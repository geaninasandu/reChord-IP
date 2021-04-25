import React, { useState } from 'react';
import { Form, message, Modal } from 'antd';
import axios from 'axios';
import EmailField from './inputs/EmailField';
import SubmitButton from './inputs/SubmitButton';

const ForgotPasswordModal = (props) => {

    const [ error, setError ] = useState({
        message: '',
        source: '',
    });

    const [ loading, setLoading ] = useState(false);

    const requestPasswordReset = (values) => {
        const { email } = values;

        setLoading(true);

        axios.post('/api/auth/forgot', { email }, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.status === 200) {
                    message.success('You will soon receive an email containing the reset instructions!');
                    setLoading(false);
                    props.toggleModalVisibility();
                }
            })
            .catch(err => {
                setError(err.response.data);
            });
    };

    return (
        <Modal title="Forgot password" visible={props.modalVisibility} footer={null} width="30%"
               onCancel={props.toggleModalVisibility} bodyStyle={{ minHeight: '20%' }}>
            <p style={{ color: '#666666', fontSize: '0.8rem' }}>Insert your email address below and we will send you an
                email with the instructions on how to reset your password.</p>

            <div style={{ margin: '2rem auto' }}>
                <Form onFinish={requestPasswordReset}>
                    <EmailField formType="login" error={error} />
                    <SubmitButton title="Send Email" loading={loading} />
                </Form>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;