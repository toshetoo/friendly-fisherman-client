import React from 'react';
import { Redirect } from 'react-router-dom'

export default class ProtectedRoute extends React.Component {

    render() {
        // TODO change this when we have auth
        if(true) {
            return <this.props.component {...this.props} />
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
              }} />
        }
    }
}