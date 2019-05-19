import React from 'react';
import './PollOfTheWeek.scss';
import { Poll } from './../Poll';
import history from './../../../../core/history/History';
import PollsService from '../../../../core/services/polls.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { UncontrolledTooltip } from 'reactstrap';

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

    refreshPoll() {
        this.setState({
            isLoading: true
        }, () => {
            PollsService.getPollOfTheWeek().then((data) => {
                this.setState({
                    poll: data.data.item,
                    isLoading: false
                })
            })
        })       
    }
    
    render() {
        let poll = <div>No poll of the week!</div>;

        if (this.state.poll) {
            poll = <Poll poll={this.state.poll} refreshPoll={this.refreshPoll.bind(this)}/>;
        }

        return (
            <div className="poll-holder">
                <div className="header-holder d-flex">
                    <span className="heading">
                        Poll of the Week 
                        <FontAwesomeIcon icon={faSyncAlt}
                            onClick={() => this.refreshPoll()} 
                            id="refresh-poll" 
                            className={"ml-2 cursor-pointer " + (this.state.isLoading ? 'fa-spin' : '')}>
                        </FontAwesomeIcon>
                        <UncontrolledTooltip placement="top" target="refresh-poll">
                                Refresh
                        </UncontrolledTooltip>
                    </span>
                    <span className="cursor-pointer list-btn" onClick={this.onList.bind(this)}>List</span>
                </div>                
                <div className="divider"></div>          

                {poll}
            </div>
        );
    }
}