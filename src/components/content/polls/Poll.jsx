import React from 'react';
import { Progress, Button } from 'reactstrap';
import './Poll.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PollsService from '../../../core/services/polls.service';
import BaseService from './../../../core/services/base-api.service';

export class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            votedAnswerId: null,
            isLoggedIn: BaseService.getLoggedUserId() !== null
        };
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            PollsService.getVotedAnswerForPoll(this.props.poll.id).then((response) => {
                this.setState({
                    votedAnswerId: response.data.item ? response.data.item.answerId : undefined
                });
            });
        }        
    }

    onAnswerClick(ans) {
        if (!this.state.isLoggedIn) return;


        PollsService.addVote(ans.pollId, ans.id).then(() => {
            this.setState({
                votedAnswerId: ans.id
            });

            this.props.refreshPoll();
        });
    }

    render() {
        if (!this.props.poll.answers || !this.props.poll.question) return null;

        const answers = this.props.poll.answers.map(ans => {
            return (
                <div className="answer" key={ans.id}>
                    <Progress color='success' value={ans.percentage}> {ans.content} </Progress> 
                    <Button color={(this.state.votedAnswerId === ans.id) ? 'primary' : 'secondary'}
                    onClick={() => this.onAnswerClick(ans)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>
            )
        })

        return (
            <div className="responses">
                <p>{this.props.poll.question}</p>
                {answers}
            </div>
        );
    }
}