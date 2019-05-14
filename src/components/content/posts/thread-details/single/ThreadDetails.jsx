import React from 'react';
import './ThreadDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faClock } from '@fortawesome/free-solid-svg-icons';

export class ThreadDetails extends React.Component {
    render() {
        return (
            <div className="thread-details-single">
                 <div className="row">
                <div className="col-12">
                    <div className="post">
                        <div className="row pb-2">
                            <div className="col-2">
                                <div className="image-holder d-flex justify-content-center">
                                    <img src="/images/avatar.jpg" alt="profile-img" />
                                </div>
                                <div className="badges">

                                </div>
                            </div>
                            <div className="col-10">
                                <h5 className="mt-3">
                                    <span>10 Kids Unaware of Their Halloween Costume</span>
                                </h5>
                                <p className="description text-muted">
                                    It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.
                                    It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.
                                    It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.It's one thing to subject yourself to a Halloween costume mishap because, hey, that's your prerogative.
                                </p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="row">
                            <div className="offset-2 col-10 postfooter">
                                <div className="likeblock">
                                        <span className="up mr-2"><FontAwesomeIcon icon={faThumbsUp}/> 25</span>
                                        <span className="down ml-2 mr-2"><FontAwesomeIcon icon={faThumbsDown}/> 3</span>
                                </div>
                                <div className="prev">                                        
                                    <span><FontAwesomeIcon icon={faReply} /></span>
                                </div>
                                <div className="posted ml-2"><FontAwesomeIcon icon={faClock} /> Posted on : 20 Nov @ 9:30am</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}