import React from 'react';
import './UserCard.scss';
import history from './../../../../core/history/History';
import { NO_IMAGE_URL, API_BASE } from './../../../../core/services/Constants';

export default class UserCard extends React.Component {
    
    navigateToProfile() {
        history.push(`/admin/users/profile/${this.props.user.id}`);
    }

    render() {
        const imageSrc = () => {
            if (this.props.user.imagePath) {
                return API_BASE + this.props.user.imagePath;
            } else {
                return NO_IMAGE_URL;
            }
        }

        return (
            <div className="user-card">
                <div className="row">
                    <div className="col-12 image-holder">
                        <img className="mt-2 mb-2" src={imageSrc()} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        {this.props.user.firstName} {this.props.user.lastName}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12 text-center">
                        {this.props.user.email}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary" onClick={this.navigateToProfile.bind(this)}>View profile</button>
                    </div>
                </div>
            </div>
        );
    }
}