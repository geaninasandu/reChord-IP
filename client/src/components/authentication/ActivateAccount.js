import React, { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

const ActivateAccount = () => {

    const { activationToken } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.post('/api/auth/activate', { activationToken })
            .then(response => {
                if (response.status === 200) {
                    message.success('Account successfully activated!');
                    history.push('/login');
                }
            })
            .catch(err => {
                history.push('/register');
                message.error(err.response.data);
            });
    });

    return (
        <div />
    );
};

export default ActivateAccount;