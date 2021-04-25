import React from 'react';
import '../../styles/landingPage.scss';
import { Button } from 'antd';

const LandingPage = () => {
    return (
        <div id="background">
            <div id="landing-container">
                <div id="nav-bar" className="container-margin">
                    <img id="logo" src={require('../../assets/images/logos/logo-white.svg')} alt="logo.svg" />

                    <div id="links">
                        <Button className="nav-link" type="link" onClick={() => window.location.href = '/register'}>
                            Sign Up
                        </Button>

                        <Button className="nav-link" type="link" onClick={() => window.location.href = '/login'}>
                            Login
                        </Button>
                    </div>
                </div>

                <div id="landing-content">
                    <div id="description" className="container-margin">
                        <h1 id="heading">Create your own music watchlist</h1>
                        <h3 id="about">Keep track of your latest musical discoveries, save albums for future
                            listening and explore the latest music releases.</h3>

                        <div id="buttons">
                            <Button shape="round" size="large" onClick={() => window.location.href = '/register'}>
                                Sign Up
                            </Button>

                            <Button shape="round" size="large" onClick={() => window.location.href = '/login'}>
                                Login
                            </Button>
                        </div>
                    </div>

                    <img id="illustration" src={require('../../assets/images/landing-page.svg')}
                         alt="landing-page.svg" />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;