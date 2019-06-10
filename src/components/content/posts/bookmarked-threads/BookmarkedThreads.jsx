import React from 'react';
import './BookmarkedThreads.scss';
import { Link } from 'react-router-dom';

export class BookmarkedThreads extends React.Component {

    render() {
        return (
            <div className="bookmarked-threads-holder">
                <h3 className="header">Bookmarked Threads</h3>
                <div className="divider"></div>
                <div className="thread-item">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/thread-details/10">Everything about black barbell fishing</Link>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="thread-item">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/thread-details/10">Moderators Needed</Link>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="thread-item">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/thread-details/10">FISHING MANIA</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}