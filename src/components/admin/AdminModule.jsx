import React from 'react';
import ProtectedRoute from './../../core/routes/ProtectedRoute';
import { Switch } from 'react-router-dom';
import UsersList from './users/list/UsersList';
import UserAdminProfile from './users/admin-profile/UserAdminProfile';
import { ActiveThreads } from './../content/posts/active-threads/ActiveThreads';

export default class AdminModule extends React.Component {
    render() {
        return (
            <div className="admin-module container">
                <div className="row">
                    <div className="col-12 col-sm-8">
                        <Switch>
                            <ProtectedRoute exact path="/admin/users-list" component={UsersList} />      
                            <ProtectedRoute exact path="/admin/users/profile/:id" component={UserAdminProfile} />                  
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-4">
                        <ActiveThreads />
                    </div>
                </div>                
            </div>
        );
    }
}