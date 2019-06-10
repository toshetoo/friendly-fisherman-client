import React from 'react';
import './FeedbackList.scss';
import FeedbackCard from './../feedback-card/FeedbackCard';

export default class FeedbackList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=1'
            },
            {
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=2'
            },
            {
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=3'
            },
            {
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=4'
            },
            {
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=5'
            },
            {
                title: "Feedback 1",
                sentOn: "21st of March @ 8:29 PM",
                image: 'https://picsum.photos/200/300?random=6'
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