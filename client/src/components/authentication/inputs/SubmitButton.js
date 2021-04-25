import React from 'react';
import { Button, Form } from 'antd';

const SubmitButton = (props) => {
    return (
        <Form.Item style={{ marginTop: '0.7rem', height: '5vh'}}>
            <Button {...props} style={{ width: '100%' }} size="large" type="primary" htmlType="submit">
                {props.title}
            </Button>
        </Form.Item>
    );
};

export default SubmitButton;
