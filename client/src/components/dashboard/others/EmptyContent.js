import React, { useState } from 'react';
import { Button, Empty } from 'antd';
import SearchModal from '../../modals/SearchModal';

const EmptyContent = () => {

    const [ modalVisibility, setModalVisibility ] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    return (
        <Empty imageStyle={{ height: '50%' }} description={
            <span>
               Your library is currently empty.<br />
               <Button type="link" onClick={toggleModalVisibility}>Add your first album!</Button>
           </span>
        }>
            <SearchModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </Empty>
    );
};

export default EmptyContent;