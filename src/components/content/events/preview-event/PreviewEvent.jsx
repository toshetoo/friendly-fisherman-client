import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EventService from '../../../../core/services/event.service';
import { GOOGLE_MAP_API_KEY, NO_IMAGE_URL, API_BASE } from '../../../../core/services/Constants';
import './PreviewEvent.scss';
import Comment from '../comments/Comment';
import * as moment from 'moment';
import NewComment from '../comment/NewComment';
import BaseService from '../../../../core/services/base-api.service';

class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            comments: [],
            participant: {},
            participants: 0,
            showCommentForm: false,
            dropdownOpen: false,
        }
    }

    componentDidMount() {
        EventService.getById(this.props.computedMatch.params.id).then((response) => {
            let event = response.item;
            event.lat = parseFloat(event.lat);
            event.lng = parseFloat(event.lng);

            this.setState({ event });
        });

        EventService.getComments(this.props.computedMatch.params.id).then((response) => {
            this.setState({ comments: response.data.items });
        });

        EventService.getParticipant(this.props.computedMatch.params.id, BaseService.getLoggedUserId()).then((response) => {
            this.setState({ participant: response.data.item });
        });

        EventService.getParticipants(this.props.computedMatch.params.id).then((response) => {
            this.setState({ participants: response.data.items.length });
        })
    }

    getComments() {
        EventService.getComments(this.props.computedMatch.params.id).then((response) => {
            this.setState({ comments: response.data.items, showCommentForm: false });
        })
    }

    setParticipation(status) {
        let participant = {
            userId: BaseService.getLoggedUserId(),
            eventId: this.props.computedMatch.params.id,
            participantStatus: status,
        }

        EventService.addParticipant(participant).then((response) => {
            EventService.getParticipants(this.props.computedMatch.params.id).then((response) => {
                this.setState({ participants: response.data.items.length });
            })

            this.setState({ participant: response.data.item });
        })
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const renderParticipationDropdown = (participant) => {
            let selectedParticipationType = "Not going";

            if (participant != null) {
                switch (participant.participantStatus) {
                    case 0:
                        selectedParticipationType = "Going";
                        break;
                    case 1:
                        selectedParticipationType = "Interested";
                        break;
                    default:
                        selectedParticipationType = "Not going";
                        break;
                }
            }


            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)} style={{ display: 'inline' }}>
                    <DropdownToggle caret>
                        {selectedParticipationType}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setParticipation(0)}>Going</DropdownItem>
                        <DropdownItem onClick={() => this.setParticipation(1)}>Interested</DropdownItem>
                        <DropdownItem onClick={() => this.setParticipation(2)}>Not Going</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
        }

        const renderImage = () => {
            let imageCover = this.state.event.imageCover;

            if (imageCover) {
                return API_BASE + imageCover;
            } else {
                return NO_IMAGE_URL;
            }
        }

        const renderComments = (comments) => {
            if (comments && comments.length > 0)
                return comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} refresh={this.getComments.bind(this)} />
                });
        }

        return (
            <div>
                <div className="form-holder">
                    <div className="row">
                        <div className="col-12 mt-2">
                            <img className="preview-image-cover" src={renderImage()} alt="Event cover" />
                        </div>
                    </div>
                    <div className="row mt-2 event-map">
                        <Map
                            style={{ maxWidth: '100%', maxHeight: '250px' }}
                            google={this.props.google}
                            zoom={15}
                            center={{
                                lat: this.state.event.lat,
                                lng: this.state.event.lng
                            }}
                        >
                            <Marker
                                title={'Event location'}
                                position={{ lat: parseFloat(this.state.event.lat), lng: parseFloat(this.state.event.lng) }} />
                        </Map>
                    </div>
                    <div className="row event-details">
                        <div className="col-12">
                            <span>{this.state.event.title}</span>
                        </div>
                    </div>
                    <div className="row event-details"  style={{textAlign: 'center', fontSize: '16px'}}>
                        <div className="col-3">
                            <span>From: {moment(this.state.event.startDate).format('YYYY-MM-DD')}</span>
                        </div>

                        <div className="col-3">
                            <span>To: {moment(this.state.event.endDate).format('YYYY-MM-DD')}</span>
                        </div>
                        <div className="col-3">
                            <span>Participation: {renderParticipationDropdown(this.state.participant)}</span>
                        </div>
                        <div className="col-3">
                            <span>Total participants: {this.state.participants}</span>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 vh-20">
                            <p className="description text-muted" dangerouslySetInnerHTML={{ __html: this.state.event.description }}></p>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={() => this.setState((prevState) => { return { showCommentForm: !prevState.showCommentForm } })}>New Comment</button>
                </div>

                <div>
                    {this.state.showCommentForm ? <NewComment eventId={this.props.computedMatch.params.id} refresh={this.getComments.bind(this)} /> : ''}
                    {renderComments(this.state.comments)}
                </div>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAP_API_KEY)
})(AddEvent)