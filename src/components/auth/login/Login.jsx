import React from 'react';
import './Login.scss';
import { Button } from 'reactstrap';
import AuthService from '../../../core/services/auth.service';
import { Link } from 'react-router-dom';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: ''
        };
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        AuthService.login(this.state).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                this.props.setLoggedInFn(true);
                this.props.history.push('/home');
            }
        });
    }

    render() {
        return (
            <div className="container login-component-container">
                <div className="login-holder">
                    <div className="logo-holder-login d-flex justify-content-center">
                        <a href="/home">
                            <img src="/images/logo.jpg" alt="logo" />
                        </a>
                    </div>
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.errors}</span>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange.bind(this)} required/>
                            </div>                        
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange.bind(this)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button type="submit" color="primary">Login</Button>
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Link to="/register">Don't have an account?</Link>
                            </div>                            
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Link to="/forgotten-password">Forgot your password?</Link>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}