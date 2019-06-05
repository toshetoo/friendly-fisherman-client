import React from 'react';
import './UserAdminProfile.scss';
import UsersService from './../../../../core/services/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCross, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class UserAdminProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        if (this.props.computedMatch.params.id) { 
            UsersService.getById(this.props.computedMatch.params.id).then((resp) => {
                this.setState({
                    user: resp.item
                });
            });
        }
    }

    render() {
        let { authorImageUrl } = this.state.user;
        if (!authorImageUrl) {
            authorImageUrl = '/images/placeholder-face-big.png';
        }


        return (
            <div className="user-admin-profile">
                <div className="row">
                    <div className="col-12 header-row">
                        <span className="ml-3">{this.state.user.firstName}'s Profile</span>
                    </div>
                </div>
                <hr/>
                <div className="row mb-3">
                    <div className="col-4">
                        <div className="image-holder text-center">
                            <img src={authorImageUrl} />
                        </div>
                        
                    <div className="text-center">
                        <button className="btn btn-danger">Ban user</button>
                    </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <span className="prop">Username</span> 
                                <span className="value">{this.state.user.userName}</span>
                            </div>
                            <div className="col-12">
                                <span className="prop">Name</span> 
                                <span className="value">{this.state.user.firstName} {this.state.user.lastName}</span>
                            </div>
                            <div className="col-12">
                                <span className="prop">Email</span> 
                                <span className="value">{this.state.user.email}</span>
                                <span className="ml-2">{this.state.user.emailConfirmed 
                                    ? <FontAwesomeIcon className="text-success" icon={faCheck} /> 
                                    : <FontAwesomeIcon className="text-danger" icon={faTimes} />}</span>
                            </div>
                            <div className="col-12">
                                <span className="prop">Phone Number</span> 
                                <span className="value">{this.state.user.phoneNumber || 'N/A'}</span>
                                <span className="ml-2">{this.state.user.phoneNumber 
                                    ? <FontAwesomeIcon className="text-success" icon={faCheck} /> 
                                    : <FontAwesomeIcon className="text-danger" icon={faTimes} />}</span>
                            </div>
                            <div className="col-12">
                                <span className="prop">2FA enabled</span>                                 
                                <span className="ml-2">{this.state.user.twoFactorEnabled 
                                    ? <FontAwesomeIcon className="text-success" icon={faCheck} /> 
                                    : <FontAwesomeIcon className="text-danger" icon={faTimes} />}</span>
                            </div>
                            <div className="col-12">
                                <span className="prop">Locked</span> 
                                <span className="ml-2">{this.state.user.lockoutEnabled 
                                    ? <FontAwesomeIcon className="text-success" icon={faCheck} /> 
                                    : <FontAwesomeIcon className="text-danger" icon={faTimes} />}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-primary mt-4">See {this.state.user.firstName}'s posts</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}