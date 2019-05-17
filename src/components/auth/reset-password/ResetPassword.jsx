import React from 'react';
import { Button } from 'reactstrap';
import AuthService from '../../../core/services/auth.service';
import queryString from 'query-string';

export class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: undefined,
            passwordToken: undefined,
            password: undefined,
            rePassword: undefined,
            error: undefined,
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

        if (this.state.password !== this.state.rePassword) {
            this.setState({ error: 'The passwords do not match.' });
            return;
        }

        const values = queryString.parse(this.props.location.search)
        let passwordToken = values.token;

        let email = this.state.email;
        let password = this.state.password;
        let rePassword = this.state.rePassword;

        AuthService.resetPassword(passwordToken, email, password, rePassword).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                setTimeout(() => {
                    this.props.history.push('/home');
                }, 3000)
            }
        });
    }

    render() {
        return (
            <div className="container login-component-container">
                <div className="login-holder">
                    <div className="logo-holder-login d-flex justify-content-center">
                        <a href="/home">
                            <img src="./images/logo.jpg" alt="logo" />
                        </a>
                    </div>
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.error}</span>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-12">
                                <input type="text" name="email" id="email" placeholder="email" onChange={this.onChange.bind(this)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange.bind(this)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="password" name="rePassword" id="rePassword" placeholder="rePassword" onChange={this.onChange.bind(this)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button type="submit" color="primary">Reset</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}