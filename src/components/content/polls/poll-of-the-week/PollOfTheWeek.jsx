import React from 'react';
import './PollOfTheWeek.scss';
import { Poll } from './../Poll';
import history from './../../../../core/history/History';
import PollsService from '../../../../core/services/polls.service';

export class PollOfTheWeek extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            poll: undefined
        };
    }

    componentDidMount() {
        PollsService.getPollOfTheWeek().then((data) => {
            this.setState({
                poll: data.data.item
            })
        })
    }

    onList() {
        history.push('/polls-list');
    }
    
    render() {
        let poll = <div>No poll of the week!</div>;

        if (this.state.poll) {
            poll = <Poll question={this.state.poll.question} answers={this.state.poll.answers}/>;
        }

        return (
            <div className="poll-holder">
                <div className="header-holder d-flex">
                    <span className="heading">Poll of the Week</span><span className="cursor-pointer list-btn" onClick={this.onList.bind(this)}>List</span>
                </div>                
                <div className="divider"></div>          

                {poll}
            </div>
        );
    }
}