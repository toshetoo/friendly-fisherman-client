import React from 'react';
import './ThreadDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faClock } from '@fortawesome/free-solid-svg-icons';

export class ThreadDetails extends React.Component {

    onLikeClicked() {
        this.props.onLikeClicked(this.props.thread.id);
    }

    onDislikeClicked() {
        this.props.onDislikeClicked(this.props.thread.id);
    }

    render() {

        let { authorImageUrl } = this.props.thread;
        if (!authorImageUrl) {
            authorImageUrl = '/images/placeholder-face-big.png';
        }

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
                                <h5 className="mt-3">
                                    <span>{this.props.thread.title}</span>
                                </h5>
                                <p className="description text-muted" dangerouslySetInnerHTML={{ __html: this.props.thread.subtitle }}>
                                </p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="row">
                            <div className="offset-2 col-10 postfooter">
                                <div className="likeblock">
                                        <span className="up mr-2">
                                            <FontAwesomeIcon icon={faThumbsUp} className="cursor-pointer" onClick={this.onLikeClicked.bind(this)}/> {this.props.thread.likes}
                                        </span>
                                        <span className="down ml-2 mr-2">
                                            <FontAwesomeIcon icon={faThumbsDown} className="cursor-pointer" onClick={this.onDislikeClicked.bind(this)}/> {this.props.thread.dislikes}
                                            </span>
                                </div>
                                <div className="prev">                                        
                                    <span><FontAwesomeIcon icon={faReply} className="cursor-pointer"/></span>
                                </div>
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