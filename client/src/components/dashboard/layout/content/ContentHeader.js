import React, { useState } from 'react';
import { Button, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SearchModal from '../../../modals/SearchModal';

const ContentHeader = (props) => {

    const [ modalVisibility, setModalVisibility ] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const routes = [
        {
            path: 'playlist',
            breadcrumbName: 'Dashboard',
        },
        {
            breadcrumbName: props.title,
        },
    ];

    const itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        );
    };

    return (
        <div id="content-header" className="space-between">
            <div id="content-header-left">
                <PageHeader className="site-page-header" title={props.title} breadcrumb={{ routes, itemRender }} />
            </div>

            <div id="content-header-right">
                <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={toggleModalVisibility}>
                    Add album
                </Button>

                <SearchModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
            </div>
        </div>
    );
};

export default ContentHeader;