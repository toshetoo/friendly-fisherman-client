
import React from 'react';
import './UserProfile.scss';
import { Media } from 'reactstrap';
export class UserProfile extends React.Component {

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
                                        <input type="text" name="firstName" id="firstName" placeholder="First Name" />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="password" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <div className="col-6">
                                        <input type="password" name="re_password" id="rePassword" placeholder="Re-type password" />
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