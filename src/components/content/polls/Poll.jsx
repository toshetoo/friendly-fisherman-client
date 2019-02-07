import React from 'react';
import { Progress, Button } from 'reactstrap';
import './Poll.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export class Poll extends React.Component {
    
    
    render() {
        return (
            <div className="poll-holder">
                <h3>Poll of the Week</h3>
                <div className="divider"></div>
                
                <div className="responses">
                    <p>Which game you are playing this week?</p>
                    <div className="answer">
                        <Progress color='success' value={10}> Call of Duty </Progress> <Button color="primary"><FontAwesomeIcon icon={faCheck} /></Button>
                    </div>

                    <div className="answer">
                        <Progress value={30} color='info'> World of Warcraft </Progress> <Button color="secondary"><FontAwesomeIcon icon={faCheck} /></Button>
                    </div>

                    <div className="answer">
                        <Progress value={50} color='danger'> GTA V </Progress> <Button color="secondary"><FontAwesomeIcon icon={faCheck} /></Button>
                    </div>
                </div>
            </div>
        );
    }
}