import React from 'react';
import './Login.scss';
import { Button } from 'reactstrap';

export class Login extends React.Component {

    render() {
        return (
            <div className="container login-component-container">
                <div className="login-holder">
                    <div class="logo-holder-login d-flex justify-content-center">
                        <a href="/home">
                            <img src="./images/logo.jpg" alt="logo" />
                        </a>
                    </div>
                    <form>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" name="username" id="username" placeholder="Username" />
                            </div>                        
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="password" name="password" id="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button color="primary">Login</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}