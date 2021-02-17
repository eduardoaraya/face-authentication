import React, { ReactElement } from 'react';
import Template from "../template";

const Home = ({ }): ReactElement => {
    return (
        <Template bodyClass="home-page">
            <div className="container">
                <div className="title-header">
                    <span className="version">version: {process.env.APP_VERSION}</span>
                    <h1 className="title">Welcome to {process.env.APP_NAME}</h1>
                </div>
                <div className="actions">
                    <a className="btn" href='/signin'>Signin</a>
                    <a className="btn" href='/signup'>Signup</a>
                </div>
            </div>
        </Template>
    );
}

export default Home;