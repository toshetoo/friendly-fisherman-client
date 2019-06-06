import React from 'react';

export class EventItem extends React.Component {

    render() {
        return (
            <li className="d-flex"><a href="#">{this.props.event.title}</a></li>
        );
    }
}