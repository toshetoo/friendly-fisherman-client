import React from 'react';
import './ActiveThreads.scss';
import { Link } from 'react-router-dom';

export class ActiveThreads extends React.Component {

    render() {
        return(
            <div className="threads-holder">
                <h3 className="header">Active Threads</h3>
                <div className="divider"></div>
                <div className="thread">
                    <Link to="/thread/10">This Dock Turns Your iPhone Into a Bedside Lamp</Link>
                </div>
                <div className="divider"></div>
                <div className="thread">
                    <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                </div>
                <div className="divider"></div>
                <div className="thread">
                    <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                </div>
                <div className="divider"></div>
                <div className="thread">
                    <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                </div>
                <div className="divider"></div>
                <div className="thread">
                    <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                </div>
            </div>
        );
    }
}