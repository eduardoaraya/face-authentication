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
                            <label htmlFor="image"></label>
                            <Input type="file" id="image" required name="image" />
                        </div>
                        <div className="input-area">
                            <label htmlFor="email"></label>
                            <Input type="email" id="email" required name="email" placeholder="E-mail" />
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

export default Signup;