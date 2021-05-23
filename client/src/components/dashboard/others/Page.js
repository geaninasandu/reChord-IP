import React from 'react';
import { Pagination } from 'antd';

const Page = (props) => {
    return (
        <Pagination
            total={props.total}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            defaultPageSize={props.postsPerPage}
            defaultCurrent={props.currentPage}
            onChange={props.changePage}
        />
    );
};

export default Page;