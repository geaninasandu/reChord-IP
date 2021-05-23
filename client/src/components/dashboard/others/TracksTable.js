import React from 'react';
import { Table } from 'antd';

const convertDuration = (duration) => (duration - (duration %= 60)) / 60 + (9 < duration ? ':' : ':0') + duration;

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: duration => convertDuration(duration),
    },
];

const TracksTable = (props) => {
    return (
        <Table size="small" pagination={false} columns={columns} dataSource={props.tracks}
               summary={() => (
                   <Table.Summary.Row style={{ backgroundColor: '#fafafa' }}>
                       <Table.Summary.Cell />
                       <Table.Summary.Cell />
                       <Table.Summary.Cell><b>{convertDuration(props.duration)}</b></Table.Summary.Cell>
                   </Table.Summary.Row>
               )} />
    );
};

export default TracksTable;