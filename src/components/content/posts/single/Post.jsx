import React from 'react';
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export class Post extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="post">
                        <div className="row pb-2">
                            <div className="col-2 pl-0">
                                <div className="image-holder d-flex justify-content-center">
                                    <img src="./images/avatar.jpg" alt="avatar" />
                                </div>
                                <div className="badges">

                                </div>
                            </div>
                            <div className="col-8 pl-0 pr-0">
                                <h5 className="mt-3">
                                    <Link to="/thread/10">10 Kids Unaware of Their Halloween Costume</Link>
                                </h5>
                                <p className="description text-muted">
                                    It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.
                                                </p>
                            </div>
                            <div className="col-2 pl-0">
                                <div className="reply-count">
                                    <div className="commentbg">
                                        560
                                        <div className="mark"></div>
                                    </div>
                                </div>
                                <div className="views text-muted">
                                    <FontAwesomeIcon icon={faEye} /> <span>32,323</span>
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

