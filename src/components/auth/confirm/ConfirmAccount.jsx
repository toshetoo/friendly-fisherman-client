import React from 'react';
import { Button } from 'reactstrap';
import AuthService from '../../../core/services/auth.service';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

export class ConfirmAccount extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        let id = values.id;
        let token = values.token;

        AuthService.confirmAccount(id, token).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                setTimeout(() => {
                    this.props.history.push('/home');
                }, 3000)
            }
        });
    }

    render() {
        return (
            <div>
                <span>You have successfully confirmed your account.</span>
              <br />
                <span>You will be redirected to the home page...</span>
            </div>
        );
    }
}