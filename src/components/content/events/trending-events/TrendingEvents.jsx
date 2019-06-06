import React from 'react';
import './TrendingEvents.scss';
import history from './../../../../core/history/History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import UsersService from '../../../../core/services/users.service';
import EventService from './../../../../core/services/event.service';
import { EventItem } from './../event-list-item/EventItem';

export class TrendingEvents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentDidMount() {        
        EventService.getTrendingEvents().then((response) => {
            this.setState({
                events: response.data.items || []
            });            
        });
    }

    refreshEvents() {
        this.setState({
            isLoading: true
        }, () => {
            EventService.getTrendingEvents().then((response) => {
                this.setState({
                    events: response.data.items || [],
                    isLoading: false
                })
            })
        })       
    }

    onList() {
        history.push('/events');
    }

    render() {
        let events = <div>No trending events!</div>;

        if (this.state.events.length > 0) {
            events = this.state.events.map(c => {
                return (
                    <EventItem key={c.id} event={c}/>
                )
            }); 
        }              

        return (
            <div className="events-holder">
                <div className="header-holder d-flex">
                    <span className="heading">
                        Trending Events
                        <FontAwesomeIcon icon={faSyncAlt}
                            onClick={() => this.refreshEvents()} 
                            id="refresh-events" 
                            className={"ml-2 cursor-pointer " + (this.state.isLoading ? 'fa-spin' : '')}>
                        </FontAwesomeIcon>
                        <UncontrolledTooltip placement="top" target="refresh-events">
                                Refresh
                        </UncontrolledTooltip>
                    </span>
                    {
                        UsersService.isCurrentUserAdmin()
                        ?  <span className="cursor-pointer list-btn" onClick={this.onList.bind(this)}>View all</span>
                        : ''
                    }
                </div> 
                <div className="divider"></div>
                <ul className="cats">
                    {events}
                </ul>                
            </div>
        );
    }
}