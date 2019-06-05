import React, { Component } from 'react';
import Event from '../single/Event';
import EventService from '../../../../core/services/event.service';

class EventsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        EventService.getAll().then((response) => {
            this.setState({ events: response.data.items })
        })
    }

    render() {
        const events = this.state.events.map(event => {
            return <Event key={event.id} event={event} />
        })

        return (
            <div className="events-holder">
                {events}
            </div>
        );
    }
}

export default EventsList;