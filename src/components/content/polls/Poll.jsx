import React from 'react';
import { Progress, Button } from 'reactstrap';
import './Poll.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export class Poll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.answers || !this.props.question) return null;

        const answers = this.props.answers.map(ans => {
            return (
                <div className="answer">
                    <Progress color='success' value={ans.percentage}> {ans.content} </Progress> <Button color="primary"><FontAwesomeIcon icon={faCheck} /></Button>
                </div>
            )
        })

        return (
            <div className="responses">
                <p>{this.props.question}</p>
                {answers}
            </div>
        );
    }
}