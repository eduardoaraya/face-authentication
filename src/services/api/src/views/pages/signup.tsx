import React, { ReactElement } from 'react';
import Template from "../template";
import Input from '../components/input';

const Signup = ({ }): ReactElement => {
    return (
        <Template>
            <div className="container">
                <div className="title-header">
                    <h1 className="title">Signup</h1>
                    <form action="" className="form-element">
                        <div className="input-area">
                            <label className="label-element" htmlFor="image">Select a picture:</label>
                            <Input type="file" id="image" required name="image" />
                        </div>
                        <div className="input-area">
                            <label className="label-element" htmlFor="email">E-mail:</label>
                            <Input type="email" id="email" required name="email" placeholder="E-mail" />
                        </div>
                        <div className="form-footer">
                            <a className="btn" href="/">Back</a>
                            <button className="btn primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

export default Signup;