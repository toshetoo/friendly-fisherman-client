import React from 'react';
import './FeedbackList.scss';
import FeedbackCard from './../feedback-card/FeedbackCard';

export default class FeedbackList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{
                title: "User: George21 is publishing...",
                sentOn: "1st of June @ 10:35 PM",
                image: 'https://picsum.photos/200/150?random=1'
            },
            {
                title: "Can I be part of the adminis...",
                sentOn: "29th of May @ 8:29 PM",
                image: 'https://picsum.photos/200/150?random=2'
            },
            {
                title: "You have a mistake in event...",
                sentOn: "25th of May @ 5:43 PM",
                image: 'https://picsum.photos/200/150?random=3'
            },
            {
                title: "Can you please unban, I have...",
                sentOn: "7th of May @ 2:01 AM",
                image: 'https://picsum.photos/200/150?random=4'
            },
            {
                title: "I want to report a bug in the...",
                sentOn: "30th of March @ 1:53 PM",
                image: 'https://picsum.photos/200/150?random=5'
            },
            {
                title: "How can I reset my password...",
                sentOn: "21st of March @ 10:00 AM",
                image: 'https://picsum.photos/200/150?random=6'
            }]
        }
    }

    componentDidMount() {
        // get feedback
    }

    render() {
        
        const items = this.state.items.map(i => {
            return <FeedbackCard item={i} />
        });

        return (
            <div className="feedback-list">
                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}