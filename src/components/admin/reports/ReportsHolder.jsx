import React from 'react';
import ThreadsPerDay from './threads-per-day/ThreadsPerDay';
import './ReportsHolder.scss';

export default class ReportsHolder extends React.Component {

    render() {
        return (
            <div className="reports-holder">
                <ThreadsPerDay />
            </div>
        );
    }
}