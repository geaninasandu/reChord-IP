import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './models/model';
import Authentication from './components/authentication/Authentication';
import Dashboard from './components/pages/Dashboard';
import LandingPage from './components/pages/LandingPage';
import PrivateRoute from './auth/PrivateRoute';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import ResetPassword from './components/authentication/ResetPassword';
import ActivateAccount from './components/authentication/ActivateAccount';

const store = createStore(model);

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

                <StoreProvider store={store}>
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                    <PrivateRoute path="/dashboard/:content" component={Dashboard} />
                </StoreProvider>
            </Switch>
        </Router>
    );
};

export default App;
