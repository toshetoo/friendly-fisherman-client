import React from 'react';
import './ActiveThreads.scss';

export class ActiveThreads extends React.Component {

    render() {
        return(
            <div className="threads-holder">
                <h3>Poll of the Week</h3>
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
                <div className="divider"></div>
                <div className="thread">
                    <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                </div>
            </div>
        );
    }
}