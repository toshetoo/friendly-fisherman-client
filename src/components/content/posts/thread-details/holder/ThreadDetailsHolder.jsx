import React from 'react';
import { ThreadDetails } from './../single/ThreadDetails';

export class ThreadDetailsHolder extends React.Component {
    render() {
        return (
            <div className="thread-details-holder">
                <ThreadDetails />
                <ThreadDetails />
                <ThreadDetails />
                <ThreadDetails />
            </div>
        );
    }
}