import React, { useState } from 'react';
import { Form, Tabs } from 'antd';
import '../../styles/authentication.scss';
import AuthenticationForm from './AuthenticationForm';

const { TabPane } = Tabs;

const Authentication = (props) => {
    const [ activeTab, setActiveTab ] = useState(props.form);
    const [ registrationForm ] = Form.useForm();
    const [ loginForm ] = Form.useForm();

    const resetFields = () => {
        registrationForm.resetFields();
        loginForm.resetFields();
    };

    const toggleActiveTab = (event) => {
        event.preventDefault();
        const { name } = event.target;
        setActiveTab(name);
        resetFields();

    };

    const changeActiveTab = (key) => {
        setActiveTab(key);
        resetFields();
    };

    return (
        <div id="background">
            <div id="container">
                <div id="illustration-container">
                    <img id="illustration" src={require('../../assets/images/login-illustration.svg')}
                         alt="login-illustration" />
                </div>

                <div id="authentication-container">
                    <img id="logo" src={require('../../assets/images/logos/logo-black.svg')} alt="logo.svg" />

                    <div id="tabs">
                        <Tabs size="large" activeKey={activeTab} onTabClick={changeActiveTab} centered animated>
                            <TabPane name="register" tab="Register" key="register">
                                <div className="form">
                                    <h1 className="form-title">Create Account</h1>
                                    <AuthenticationForm type="register" title="Sign Up" url="/api/auth/register"
                                                        form={registrationForm} />
                                    Already have an account?
                                    <button className="toggleTabButton" name="login" onClick={toggleActiveTab}>
                                        Sign in!
                                    </button>
                                </div>
                            </TabPane>

                            <TabPane name="login" tab="Login" key="login">
                                <div className="form">
                                    <h1 className="form-title">Login</h1>
                                    <AuthenticationForm type="login" title="Sign In" url="/api/auth/login"
                                                        form={loginForm} />
                                    Don't have an account?
                                    <button className="toggleTabButton" name="register" onClick={toggleActiveTab}>
                                        Sign up!
                                    </button>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;
