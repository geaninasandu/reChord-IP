import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { CustomerServiceOutlined, FireOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';

const SidebarMenu = (props) => {

    const getPageKey = () => {
        const pageURL = window.location.href;
        const pageKey = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return pageKey === 'dashboard' ? 'playlist' : pageKey;
    };

    const [ selected, setSelected ] = useState(getPageKey());

    useEffect(() => {
        setSelected(getPageKey());
    }, []);

    const manageSelection = ({ key }) => {
        setSelected(key);
    };

    return (
        <Menu mode="inline" defaultSelectedKeys={[ selected ]} onSelect={manageSelection}>
            <Menu.Item key="playlist" icon={<PlayCircleOutlined />}>
                <Link to="/dashboard/playlist" />
                Playlist
            </Menu.Item>

            <Menu.Item key="new" icon={<FireOutlined />}>
                <Link to="/dashboard/new" />
                New
            </Menu.Item>

            <Menu.Item key="listened" icon={<CustomerServiceOutlined />}>
                <Link to="/dashboard/listened" />
                Listened
            </Menu.Item>

            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to="/dashboard/settings" />
                Settings
            </Menu.Item>
        </Menu>
    );
};

export default SidebarMenu;