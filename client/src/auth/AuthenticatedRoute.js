import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './index';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
    )} />
);

export default AuthenticatedRoute;