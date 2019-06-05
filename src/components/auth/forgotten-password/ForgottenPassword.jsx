import React from 'react';
import './ForgottenPassword.scss';
import { Button } from 'reactstrap';
import AuthService from '../../../core/services/auth.service';

export class ForgottenPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
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
        AuthService.forgottenPassword(this.state.email).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                this.props.history.push('/home');
            }
        });
    }

    render() {
        return (
            <div className="container forgotten-password-container">
                <div className="forgotten-password-holder">
                    <div className="logo-holder-login d-flex justify-content-center">
                        <a href="/home">
                            <img src="/images/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div>
                        <p><strong >Forgot your password?</strong>
                        </p><p>
                        </p><p>Enter your email address below and we'll send you instructions on how to change your password.</p>
                    </div>
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.errors}</span>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" name="email" id="email" placeholder="Email" onChange={this.onChange.bind(this)} required/>
                            </div>                        
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button type="submit" color="primary">Reset my password</Button>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}