import React from 'react';
import { Divider, Layout } from 'antd';
import '../../../../styles/dashboard.scss';
import SidebarMenu from './SidebarMenu';

const { Sider } = Layout;

const Sidebar = (props) => {

    return (
        <Sider id="sidebar" className="box-shadow" theme="light" width="15%" collapsible collapsed={props.collapsed}
               onCollapse={props.toggleCollapse}>

            <div className="logo centered">
                <img src={props.collapsed ?
                    require('../../../../assets/images/logos/logo-symbol.svg') :
                    require('../../../../assets/images/logos/logo-black.svg')
                } alt="logo.svg" />
            </div>

            <Divider style={{ margin: 0 }} />

            <SidebarMenu />
        </Sider>
    );
};

export default Sidebar;