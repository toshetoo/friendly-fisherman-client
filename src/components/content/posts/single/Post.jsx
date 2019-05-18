import React from 'react';
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="post">
                        <div className="row pb-2">
                            <div className="col-2 pl-0">
                                <div className="image-holder d-flex justify-content-center">
                                    <img src="/images/avatar.jpg" alt="avatar" />
                                </div>
                                <div className="badges">

                                </div>
                            </div>
                            <div className="col-8 pl-0 pr-0">
                                <h5 className="mt-3">
                                    <Link to={`/thread/${this.props.post.id}}`}>{this.props.post.title}</Link>
                                </h5>
                                <p className="description text-muted">
                                    {this.props.post.description}
                                </p>
                            </div>
                            <div className="col-2 pl-0">
                                <div className="reply-count">
                                    <div className="commentbg">
                                        {/* {this.props.post.replies.count} */}
                                        400
                                    <div className="mark"></div>
                                    </div>
                                </div>
                                <div className="views text-muted">
                                    <FontAwesomeIcon icon={faEye} /> <span>{this.props.post.seenCount}</span>
                                </div>
                                <div className="created-on">
                                    <FontAwesomeIcon icon={faClock} /> <span>24 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

