import React, { FunctionComponent, ReactElement } from 'react';
import Template from "../template";

const Home: FunctionComponent = (): ReactElement => {
    return (
        <Template>
            <h1>Welcome to face authentication</h1>
            <a href='/sign'>Sign</a>
            <a href='/signup'>Signup</a>
        </Template>
    );
}

export default Home;