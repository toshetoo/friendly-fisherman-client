import React from 'react';
import { Redirect } from 'react-router-dom'
import UsersService from './../services/users.service';

export default class ProtectedRoute extends React.Component {

    render() {
        if(UsersService.getLoggedUser()) {
            return <this.props.component {...this.props} />
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
              }} />
        }
    }
}