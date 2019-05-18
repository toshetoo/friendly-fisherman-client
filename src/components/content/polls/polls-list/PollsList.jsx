import React from 'react';
import './PollsList.scss';
import PollsService from '../../../../core/services/polls.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faPoll } from '@fortawesome/free-solid-svg-icons';
import history from './../../../../core/history/History';
import UsersService from './../../../../core/services/users.service';
import { UncontrolledTooltip } from 'reactstrap';

export class PollsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            polls: []
        }
    }

    componentDidMount() {
        PollsService.getAll().then((polls) => {
            this.setState({
                polls: polls.data.items
            });
        });

        console.log(this.state.polls);
    }

    onAddPoll() {
        history.push('/add-poll');
    }

    onEditPoll(id) {
        history.push('/add-poll/' + id);
    }

    onDeletePoll(pollId, index) {
        PollsService.delete(pollId).then(() => {
            const polls = this.state.polls;
            const index = polls.findIndex(p => p.id === pollId);
            polls.splice(index, 1);

            this.setState({
                polls: polls
            });
        });
    }

    onMakePollOfTheWeek(pollId) {
        PollsService.makePollOfTheWeek(pollId).then(() => {

        });
    }

    render() {
        const polls = this.state.polls.map(poll => {
            return (
                <div className="list-item">
                    <div className="row">
                        <div className="col-10 p-3">
                            <h4 className="ml-3 cursor-pointer">{poll.question}</h4>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center text-right">
                            <span className="cursor-pointer mr-2"><FontAwesomeIcon icon={faPen} onClick={() => this.onEditPoll(poll.id)} id="edit-btn"/></span>
                            <UncontrolledTooltip placement="top" target="edit-btn">
                                Edit
                            </UncontrolledTooltip>
                            <span className="cursor-pointer mr-2"><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.onDeletePoll(poll.id)} id="delete-btn"/></span>
                            <UncontrolledTooltip placement="top" target="delete-btn">
                                Delete
                            </UncontrolledTooltip>
                            <span className="cursor-pointer"><FontAwesomeIcon icon={faPoll} onClick={() => this.onMakePollOfTheWeek(poll.id)} id="poll-of-the-week"/></span>
                            <UncontrolledTooltip placement="top" target="poll-of-the-week">
                                Make poll of the week
                            </UncontrolledTooltip>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="polls-list">
                <div className="row">
                    <div className="col-12 text-right mb-3">
                        <button className="create-btn btn btn-primary" onClick={this.onAddPoll.bind(this)}>Add Poll</button>
                    </div>
                </div>
                <div className="list-hoder">
                    {polls}
                </div>
            </div>
        );
    }
}