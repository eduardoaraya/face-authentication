import React, { ReactElement } from 'react';
import Template from "../template";

const Home = ({ }): ReactElement => {
    return (
        <Template>
            <div className="container">
                <div className="title-header">
                    <h1 className="title">Welcome to {process.env.APP_NAME}</h1>
                    <span className="version">version: {process.env.APP_VERSION}</span>
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