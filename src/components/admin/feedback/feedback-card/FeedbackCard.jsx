import React from 'react';
import './FeedbackCard.scss';

export default class FeedbackCard extends React.Component { 

    render() {
        return (
            <div className="feedback-card offset-1 col-3 text-center">
                <div className="row mb-2">
                    <div className="col-12">
                        <div className="image-holder">
                            <img src={this.props.item.image} alt="feedback-img"/>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <h5 className="font-weight-bold">{this.props.item.title}</h5>
                        <span className="text-muted">Received {this.props.item.sentOn}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-left">
                        <small className="cursor-pointer">VIEW FEEDBACK</small>
                    </div>
                </div>
            </div>
        );
    }
}