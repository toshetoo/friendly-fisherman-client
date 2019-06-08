import React from 'react';
import { Link } from 'react-router-dom';

export class EventItem extends React.Component {

    render() {
        const eventUrl = `/preview-event/${this.props.event.id}`
        return (
            <li className="d-flex"><Link to={eventUrl}>{this.props.event.title}</Link></li>
        );
    }
}