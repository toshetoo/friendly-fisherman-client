
import React from 'react';
import './UserProfile.scss';
import { Media } from 'reactstrap';
import UsersService from './../../../core/services/users.service';
export class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            re_password: '',
            email: ''
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
        UsersService.save(this.state).then(() => {
            this.props.history.push('/home');
        });
    }

    render() {
        return (
            <div className="profile-holder">
                <div className="header">
                    <h5>Profile</h5>
                    <div className="divider"></div>
                    <div className="row mt-4">
                        <div className="col-2">
                            <Media>
                                <Media left href="#">
                                    <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
                                </Media>
                            </Media>
                        </div> 
                        <div className="col-10">
                            <form>
                            <div className="row mb-2">
                                    <div className="col-6">
                                        <input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                    <div className="col-6">
                                        <input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                    <div className="col-6">
                                        <input type="password" name="re_password" id="rePassword" placeholder="Re-type password" onChange={this.onChange.bind(this)} required/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}