import React, { Component } from 'react';
import { API_BASE, NO_IMAGE_URL } from '../../../../core/services/Constants';
import history from '../../../../core/history/History';
import * as moment from 'moment';

import './Event.scss';

class Event extends Component {
    render() {
        const startDateMonth = () => {
            var startDate = new Date(this.props.event.startDate);
            return startDate.toLocaleString('en-us', { month: 'short' });
        }

        const startDateDay = () => {
            var startDate = new Date(this.props.event.startDate);
            return startDate.toLocaleString('en-us', { day: '2-digit' });
        }

        const eventStatus = () => {
            switch (this.props.event.eventStatus) {
                case 0:
                    return "pending";
                case 1:
                    return "active";
                case 2:
                    return "completed";
                default:
                    break;
            }
        }

        const imageSrc = () => {
            if (this.props.event.imageCover !== undefined) {
                return API_BASE + this.props.event.imageCover;
            } else {
                return NO_IMAGE_URL;
            }
        }

        return (
            <div className="row event" onClick={() => history.push(`/preview-event/${this.props.event.id}`)}>
                <div className={"col-5 date"}>
                    <span className={`month ${eventStatus()}`}>{startDateMonth()}</span>
                    <span className="day">{startDateDay()}</span>
                    <span className="end-date">{moment(this.props.event.endDate).format('YYYY-MM-DD')}</span>
                </div>
                <div className="col-7">
                    <div className="event-title">
                        <span>{this.props.event.title}</span>
                    </div>
                    <div className="image-cover">
                        <img src={imageSrc()} alt="Event cover"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Event;