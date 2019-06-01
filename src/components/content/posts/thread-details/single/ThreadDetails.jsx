import React from 'react';
import './ThreadDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faClock } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UsersService from '../../../../../core/services/users.service';

export class ThreadDetails extends React.Component {

    onLikeClicked() {
        this.props.onLikeClicked(this.props.thread.id);
    }

    onDislikeClicked() {
        this.props.onDislikeClicked(this.props.thread.id);
    }

    onReplyClicked() {
        this.props.onReplyClicked();
    }

    onDeleteClicked() {
        this.props.onDeleteClicked(this.props.thread.id);
    }

    getLikeType(type) {
        if (!this.props.thread.userLike)
            return false;

        return this.props.thread.userLike.isLiked === type;
    }

    render() {

        let { authorImageUrl } = this.props.thread;
        if (!authorImageUrl) {
            authorImageUrl = '/images/placeholder-face-big.png';
        }

        const canSeeDeleteBtn = UsersService.isCurrentUserAdmin() || UsersService.getLoggedUserId() === this.props.authorId;

        return (
            <div className="thread-details-single">
                <div className="row">
                    <div className="col-12">
                        <div className="post">
                            <div className="row pb-2">
                                <div className="col-2">
                                    <div className="image-holder d-flex justify-content-center">
                                        <img src={authorImageUrl} alt="profile-img" />
                                    </div>
                                    <div className="badges">

                                    </div>
                                </div>
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-8">
                                            <h5 className="mt-3">
                                                <span>{this.props.thread.title}</span>
                                            </h5>                                    
                                        </div>
                                        {
                                            canSeeDeleteBtn 
                                            ? <div className="col-4 text-right">
                                                <span className="mr-2">
                                                    <FontAwesomeIcon icon={faTrash} id={"delete-" + this.props.thread.id} className="cursor-pointer text-danger" onClick={this.onDeleteClicked.bind(this)} />
                                                    <UncontrolledTooltip placement="top" target={"delete-" + this.props.thread.id}>
                                                        Delete
                                                    </UncontrolledTooltip>
                                                </span>
                                            </div>
                                            : ''
                                        }
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="description text-muted" dangerouslySetInnerHTML={{ __html: this.props.thread.content }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="offset-2 col-10 postfooter">
                                    <div className="likeblock">
                                        <span className={"mr-2 " + (this.getLikeType(1) ? "up" : "")}>
                                            <FontAwesomeIcon icon={faThumbsUp} id="like-btn" className="cursor-pointer" onClick={this.onLikeClicked.bind(this)} /> {this.props.thread.likes ? this.props.thread.likes : 0}
                                            <UncontrolledTooltip placement="top" target="like-btn">
                                                Like
                                            </UncontrolledTooltip>
                                        </span>
                                        <span className={"ml-2 mr-2 " + (this.getLikeType(0) ? "down" : "")}>
                                            <FontAwesomeIcon icon={faThumbsDown} id="dislike-btn" className="cursor-pointer" onClick={this.onDislikeClicked.bind(this)} /> {this.props.thread.dislikes ? this.props.thread.dislikes : 0}
                                            <UncontrolledTooltip placement="top" target="dislike-btn">
                                                Dislike
                                            </UncontrolledTooltip>
                                        </span>
                                    </div>

                                    {this.props.shouldHaveReply ? 
                                        <div className="prev">
                                            <span>
                                                <FontAwesomeIcon id="reply-btn" icon={faReply} className="cursor-pointer" onClick={this.onReplyClicked.bind(this)}/>
                                                <UncontrolledTooltip placement="top" target="reply-btn">
                                                    Add reply
                                            </UncontrolledTooltip>
                                            </span>
                                        </div> 
                                    : ''}                                    
                                    <div className="posted ml-2"><FontAwesomeIcon icon={faClock} /> Posted on : {this.props.thread.createdOn}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}