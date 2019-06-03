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
import ReportsHolder from './reports/ReportsHolder';
import FeedbackList from './feedback/feedback-list/FeedbackList';

export default class AdminModule extends React.Component {
    render() {
        return (
            <div className="admin-module container">
                <div className="row">
                    <div className="col-12 col-sm-10">
                        <Switch>
                            <ProtectedRoute exact path="/admin/users-list" component={UsersList} requireAdmin={true} />      
                            <ProtectedRoute exact path="/admin/users/profile/:id" component={UserAdminProfile} requireAdmin={true} /> 
                            
                            <ProtectedRoute exact path="/admin/polls-list" component={PollsList} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/add-poll" component={AddPoll} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/add-poll/:id" component={AddPoll} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/categories-list" component={CategoriesList} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/add-category" component={AddCategory} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/add-category/:id" component={AddCategory} requireAdmin={true} />
                            <ProtectedRoute exact path="/admin/reports" component={ReportsHolder} requireAdmin={true} /> 
                            <ProtectedRoute exact path="/admin/user-feedback" component={FeedbackList} requireAdmin={true} />                   
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-2">
                        <AdminSidebar />
                    </div>
                </div>                
            </div>
        );
    }
}