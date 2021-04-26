import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Authentication from './components/authentication/Authentication';
import LandingPage from './components/pages/LandingPage';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import ResetPassword from './components/authentication/ResetPassword';
import ActivateAccount from './components/authentication/ActivateAccount';

const App = () => {
    return (
        <Router>
            <Switch>
                <AuthenticatedRoute path="/" exact component={LandingPage} />
                <AuthenticatedRoute path="/register" exact
                                    component={(props) => <Authentication {...props} form="register" />} />
                <AuthenticatedRoute path="/login" exact
                                    component={(props) => <Authentication {...props} form="login" />} />

                <AuthenticatedRoute path="/activate/:activationToken" component={ActivateAccount} />

                <AuthenticatedRoute path="/reset/:resetToken" component={ResetPassword} />
            </Switch>
        </Router>
    );
};

export default App;
