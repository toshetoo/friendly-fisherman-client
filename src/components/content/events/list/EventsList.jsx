import React, { Component } from 'react';
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

        renderEvent = (event) => {
            return (
                <div>
                    <div>Title</div>
                    <div>Description</div>
                    <div>Cover</div>
                    <div>Event Status</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                </div>
            )
        }

        renderEvents = (events) => {
            return events.map((event) => { return renderEvent(event) });
        }

        return (
            renderEvents(this.state.events)
        );
    }
}

export default EventsList;