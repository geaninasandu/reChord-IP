import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Divider, Form, Input, message } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import PasswordField from '../authentication/inputs/PasswordField';
import { isAuthenticated } from '../../auth';
import SubmitButton from '../authentication/inputs/SubmitButton';
import AvatarsModal from '../modals/AvatarsModal';
import '../../styles/settings.scss';

const Settings = () => {
    const { user, token } = isAuthenticated();
    const [ form ] = Form.useForm();

    const [ modalVisibility, setModalVisibility ] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const [ error, setError ] = useState({
        message: '',
        source: '',
    });

    const changePassword = (values) => {
        const data = {
            email: user.email,
            password: values.password,
            newPassword: values.newPassword,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        axios.post(`/api/users/${user._id}/change-password`, data, config)
            .then(response => {
                if (response.status === 200) {
                    message.success('Password has been successfully updated!');
                    form.resetFields();
                }
            })
            .catch(err => {
                setError(err.response.data);
            });
    };

    return (
        <div id="content" className="box-shadow">
            <div id="settings">
                <Divider>Avatar</Divider>

                <div id="avatar-container">

                    <Avatar id="avatar" size={160}
                            src={require(`../../assets/images/avatars/${user.avatar}.svg`)} />

                    <div id="change-avatar">
                        <Button type="primary" size="large" shape="round" onClick={toggleModalVisibility}>
                            Change
                        </Button>
                        <p>You can only choose one of the 12 default avatar images.</p>
                    </div>
                </div>

                <Divider>Credentials</Divider>

                <div id="credentials">
                    <label>Email:</label>
                    <Input size="large" value={user.email} disabled={true}
                           prefix={<MailOutlined className="site-form-item-icon" />} />

                    <label>Full Name:</label>
                    <Input size="large" value={user.fullName} disabled={true}
                           prefix={<UserOutlined className="site-form-item-icon" />} />
                </div>

                <Divider>Change Password</Divider>

                <div id="change-password">
                    <Form form={form} onFinish={changePassword}>
                        <PasswordField className="password" formType="login" placeholder="Current Password"
                                       error={error} name="password" />

                        <PasswordField className="password" formType="register" placeholder="New Password"
                                       error={{ message: '', source: '' }} name="newPassword" />

                        <SubmitButton type="submit" title="Change Password" />
                    </Form>
                </div>
            </div>

            <AvatarsModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </div>
    );
};

export default Settings;