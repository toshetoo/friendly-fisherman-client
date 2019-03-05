import React from 'react';
import './Register.scss';
import { Button } from 'reactstrap';
import AuthService from './../../../core/services/auth.service';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
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
        AuthService.register(this.state).then((response) => {
            if(response.data.errors) {
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
            <div className="container register-component-container mt-4">
                <div className="register-holder">
                    <div className="logo-holder-register d-flex justify-content-center">
                        <a href="/home">
                            <img src="./images/logo.jpg" alt="logo" />
                        </a>
                    </div>
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.errors}</span>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange.bind(this)} required/>
                            </div>
                        </div>
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
                                <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange.bind(this)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange.bind(this)} required/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <Button type="submit" color="primary">Register</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>   
        );
    }
}