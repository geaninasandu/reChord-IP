import React from 'react';
import { Avatar, Button, Cascader, Layout } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { isAuthenticated, signOut } from '../../../../auth';

const { Header } = Layout;

const options = [
    {
        value: 'settings',
        label: <div style={{ fontSize: '1rem', margin: '0.3rem 1.3rem 0.3rem 0.2rem' }}>
            <SettingOutlined style={{ marginRight: '0.7rem' }} />
            Settings
        </div>,
    },
    {
        value: 'logout',
        label: <div style={{ fontSize: '1rem', margin: '0.3rem 1.3rem 0.3rem 0.2rem' }}>
            <LogoutOutlined style={{ marginRight: '0.7rem' }} />
            Logout
        </div>,
    },
];

const DashboardHeader = (props) => {

    const { user } = isAuthenticated();

    const handleChange = (value) => {
        if (value[0] === 'logout') {
            signOut(() => window.location.href = '/login');
        }

        window.location.href = '/dashboard/settings';
    };

    return (
        <Header id="header" className="box-shadow space-between">
            <div id="header-left">
                {
                    React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        { className: 'trigger', onClick: props.toggleCollapse },
                    )
                }
            </div>

            <div id="header-right">
                <Cascader options={options} onChange={handleChange}>
                    <div className="user centered">
                        <Avatar src={require(`../../../../assets/images/avatars/${user.avatar}.svg`)} />
                        <Button style={{ fontSize: '1.2rem' }} type="link" size="large">{user.fullName}</Button>
                    </div>
                </Cascader>
            </div>
        </Header>
    );
};

export default DashboardHeader;