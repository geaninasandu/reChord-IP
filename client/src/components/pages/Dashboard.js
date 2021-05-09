import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ContentContainer from '../dashboard/layout/content/ContentContainer';
import DashboardHeader from '../dashboard/layout/header/DashboardHeader';
import Sidebar from '../dashboard/layout/sidebar/Sidebar';

const Dashboard = () => {

    const [ collapsed, setCollapsed ] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Router>
            <Layout>
                <Sidebar toggleCollapse={toggleCollapse} collapsed={collapsed} />

                <Layout id="layout">
                    <DashboardHeader toggleCollapse={toggleCollapse} collapsed={collapsed} />

                    <Route exact path="/dashboard"
                           render={(props) => <ContentContainer {...props} title="Playlist" />} />
                    <Route exact path="/dashboard/playlist"
                           render={(props) => <ContentContainer {...props} title="Playlist" />} />
                    <Route exact path="/dashboard/new"
                           render={(props) => <ContentContainer {...props} title="New" />} />
                    <Route exact path="/dashboard/listened"
                           render={(props) => <ContentContainer {...props} title="Listened" />} />
                    <Route exact path="/dashboard/settings"
                           render={(props) => <ContentContainer {...props} title="Settings" />} />
                </Layout>
            </Layout>
        </Router>
    );
};

export default Dashboard;