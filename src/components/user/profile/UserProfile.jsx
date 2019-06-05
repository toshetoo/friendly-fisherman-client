
import React from 'react';
import './UserProfile.scss';
import UsersService from './../../../core/services/users.service';
export class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            id: ''
        };
    }

    componentDidMount() {
        UsersService.getById().then((data) => {
            this.setState({...data.item});
        });
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
                            <div className="profile-image image-holder">
                                <img src="/images/placeholder-face-big.png" alt="profile-img" />
                            </div>
                        </div> 
                        <div className="col-10">
                            <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="row mb-2">
                                    <div className="col-6">
                                        <input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange.bind(this)} value={this.state.username} required/>
                                    </div>
                                    <div className="col-6">
                                        <input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange.bind(this)} value={this.state.email} required/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange.bind(this)} value={this.state.firstName} required/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange.bind(this)} value={this.state.lastName} required/>
                                    </div>
                                </div>
                                <div className="row">                                    
                                    <div className="offset-6 col-6 text-right">
                                        <button type="submit" className="btn btn-primary">Save</button>
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