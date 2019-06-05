import React from 'react';
import UsersService from './../../../../core/services/users.service';
import UserCard from './../card/UserCard';

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UsersService.getAll().then((resp) => {
            this.setState({
                users: resp.data.items
            });
        });
    }

    render() {
        if (!this.state.users) {
            return <div className="empty">No users!</div>;
        }


        const cards = this.state.users.map(u => {
            return <div className="col-4"><UserCard key={u.id} user={u} /></div>;
        })

        return (
            <div className="users-list">
                <div className="row">
                    {cards}
                </div>
            </div>
        );
    }
}