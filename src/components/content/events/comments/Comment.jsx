import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledTooltip } from 'reactstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EventService from '../../../../core/services/event.service';
import * as moment from 'moment';
import './Comment.scss';
import BaseService from '../../../../core/services/base-api.service';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    onDeleteClicked() {
        EventService.deleteComment(this.props.comment.id).then((response) => {
            this.props.refresh();
        });
    }

    render() {
        let { creatorProfileImagePath } = this.props.comment;
        if (!creatorProfileImagePath) {
            creatorProfileImagePath = '/images/placeholder-face-big.png';
        }

        return (
            <div className="thread-details-single">
                <div className="row">
                    <div className="col-12">
                        <div className="post">
                            <div className="row pb-2">
                                <div className="col-3">
                                    <div className="image-holder d-flex justify-content-center">
                                        <img src={creatorProfileImagePath} alt="profile-img" />
                                    </div>
                                    <div className="badges">
                                        <span>{this.props.comment.creatorName}</span>
                                        <span>{moment(this.props.comment.createdOn).format('YYYY-MM-DD HH:MM')}</span>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-12 text-right" hidden={this.props.comment.creatorId !== BaseService.getLoggedUserId()}>
                                            <span className="mr-2">
                                                <FontAwesomeIcon icon={faTrash} id={"delete-" + this.props.comment.id} className="cursor-pointer text-danger" onClick={this.onDeleteClicked.bind(this)} />
                                                <UncontrolledTooltip placement="top" target={"delete-" + this.props.comment.id}>
                                                    Delete
                                                </UncontrolledTooltip>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="description text-muted" dangerouslySetInnerHTML={{ __html: this.props.comment.content }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}