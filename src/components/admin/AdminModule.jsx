import React from 'react';
import ProtectedRoute from './../../core/routes/ProtectedRoute';
import { Switch } from 'react-router-dom';
import UsersList from './users/list/UsersList';
import UserAdminProfile from './users/admin-profile/UserAdminProfile';
import { AdminSidebar } from './navigation/AdminSidebar';
import { PollsList } from './../content/polls/polls-list/PollsList';
import { AddPoll } from './../content/polls/add-poll/AddPoll';
import { CategoriesList } from './../content/categories/list/CategoriesList';
import { AddCategory } from './../content/categories/add-category/AddCaregory';

export default class AdminModule extends React.Component {
    render() {
        return (
            <div className="admin-module container">
                <div className="row">
                    <div className="col-12 col-sm-8">
                        <Switch>
                            <ProtectedRoute exact path="/admin/users-list" component={UsersList} />      
                            <ProtectedRoute exact path="/admin/users/profile/:id" component={UserAdminProfile} /> 
                            
                            <ProtectedRoute exact path="/admin/polls-list" component={PollsList} />
                            <ProtectedRoute exact path="/admin/add-poll" component={AddPoll} />
                            <ProtectedRoute exact path="/admin/add-poll/:id" component={AddPoll} />
                            <ProtectedRoute exact path="/admin/categories-list" component={CategoriesList} />
                            <ProtectedRoute exact path="/admin/add-category" component={AddCategory} />
                            <ProtectedRoute exact path="/admin/add-category/:id" component={AddCategory} />                 
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-4">
                        <AdminSidebar />
                    </div>
                </div>                
            </div>
        );
    }
}