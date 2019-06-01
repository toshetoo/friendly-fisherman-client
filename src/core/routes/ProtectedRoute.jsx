import React from 'react';
import { Redirect } from 'react-router-dom'
import UsersService from './../services/users.service';

export default class ProtectedRoute extends React.Component {

    render() {
        let { requireAdmin } = this.props;
        if (requireAdmin === undefined) requireAdmin = false;

        if(UsersService.getLoggedUser() && ( !requireAdmin ||  requireAdmin === UsersService.getLoggedUserObject().isAdmin)) {
            return <this.props.component {...this.props} />
        } else {
            if (requireAdmin && UsersService.getLoggedUser()) {
                return <Redirect to={{
                    pathname: '/home',
                    state: { from: this.props.location }
                  }} />
            }

            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
              }} />
        }
    }
}