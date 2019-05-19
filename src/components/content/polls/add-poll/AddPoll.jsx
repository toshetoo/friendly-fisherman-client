import React from 'react';
import './AddPoll.scss';
import { Button } from 'reactstrap';
import PollsService from '../../../../core/services/polls.service';
import UsersService from './../../../../core/services/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import history from './../../../../core/history/History';
import * as moment from 'moment';

export class AddPoll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            question: '',
            createdOn: '',
            endOn: '',
            createdBy: UsersService.getLoggedUserId(),
            answers: [],
            isPollOfTheWeek: false
        };
    }

    componentDidMount() {
        if (this.props.computedMatch.params.id) {
            PollsService.getById(this.props.computedMatch.params.id).then((resp) => {
                const item = resp.item;
                this.setState({
                    id: item.id,
                    question: item.question,
                    createdOn: item.createdOn,
                    endOn: item.endOn,
                    createdBy: item.createdBy,
                    answers: item.answers || [],
                    isPollOfTheWeek: item.isPollOfTheWeek
                });
            })
        }
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addAnswer() {
        const answers = this.state.answers;
        answers.push({ content: '' });
        this.setState({
            answers: answers
        });
    }

    removeAnswer(index) {
        const answers = this.state.answers;
        answers.splice(index, 1);

        this.setState({
            answers: answers
        })
    }

    onSubmit(event) {
        event.preventDefault();
        PollsService.save(this.state).then((response) => {
            if (response.data.error) {
                this.setState({
                    errors: response.data.error
                });
            } else {
                history.push('/polls-list');
            }
        });
    }

    onAnswerChange(i, e) {
        const answers = this.state.answers;
        answers[i].content = e.target.value;

        this.setState({
            answers: answers
        })
    }

    render() {
        let { createdOn, endOn } = this.state;
        createdOn = moment(createdOn).format('YYYY-MM-DD');
        endOn = moment(endOn).format('YYYY-MM-DD');

        const answers = [];
        for (let i = 0; i < this.state.answers.length; i++) {
            const element = this.state.answers[i].content;
            
            answers.push(
                <div className="row mt-3 ml-1" key={i}>
                    <div className="col-12 d-flex align-items-center">
                        <input type="text" name={i} id={'answer_' + i} placeholder={'Answer ' + (i + 1)} onChange={(e) => this.onAnswerChange(i, e)} value={element} required/>
                        <span className="cursor-pointer ml-2" onClick={() => this.removeAnswer(i)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                    </div>                        
                </div>                
            )
        }

        return (
            <div className="container poll-creation-container">
                <div className="form-holder">
                    <div className="errors text-center">
                        <span className="text-danger">{this.state.errors}</span>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4 className="mt-3">{this.props.computedMatch.params.id ? 'Edit' : 'Add'} poll</h4>
                        </div>                       
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="text" name="question" 
                                id="question" 
                                laceholder="Question" 
                                onChange={this.onChange.bind(this)} 
                                value={this.state.question}
                                required/>
                            </div>                        
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="date" 
                                name="createdOn" 
                                id="createdOn" 
                                placeholder="Start on" 
                                onChange={this.onChange.bind(this)}
                                value={createdOn}
                                required />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <input type="date" 
                                name="endOn" 
                                id="endOn" 
                                placeholder="End on" 
                                onChange={this.onChange.bind(this)}
                                value={endOn}
                                required />
                            </div>
                        </div>
                        {answers}
                        <div className="row mt-3">
                            <div className="col-6">
                                <Button color="primary" onClick={this.addAnswer.bind(this)}>Add answer</Button>
                            </div>  
                            <div className="col-6">
                                <Button type="submit" color="primary">Save</Button>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>            
        );
    }
}