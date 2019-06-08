import React from 'react';
import './NewsDetails.scss';

export default class NewsDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            news: {
                title: 'Sign up for the contest on 17 July. Only 15 spots are left.',
                content: `1. THE COMMON SENSE RULE: The BronzeBack Classic is about getting people-powered water crafts out in the name of fun and competition!  Our goal as host is to work hard to ensure a fair and balanced playing field. With that being said, if any of the rules need altering to ensure the safety of all participates we reserve the right to alter them at any time, without formal notice. To stay up to date with rules, prizes and general information please reference CWOutfitting.com and our Facebook page.


                2. WHO CAN ENTER: Anyone with or without (we rent them) a canoe, kayak or SUP board and wants to experience some awesome fishing, scenery, and camaraderie. This excludes any use of a trolling motor and any other mechanical motor.
                
                
                3. REGISTRATION AND FEES: We wanted to provide a low cost tournament with extra special service, food, prizes, and fishing action.  Price includes entry fee, shuttling of people and equipment, staff to assist with getting on and off the river, participation gift, cash prizes and merchandise prizes for at least 4-6 places, door prizes, awards ceremony with a great meal, and equipment rentals available if you pay the extra amount.  Our goal is for all participants to take home prizes.
                
                See tournament web page for costs including early bird registration cost and deadline.
                
                Angler without canoe or kayak = rentals available at discounted price.  See tournament web page.
                
                We have various types of fishing kayaks and canoes.
                Special requests can be accommodated based on inventory and availability.
                Availability of equipment is limited and will be reserved first come first serve.
                Payment can be made on the CWOutfitting.com web site by credit card or in person at our shop with credit card, check or cash at any time before the Friday night pre-registration meeting. 
                
                The tournament is limited to 42 shuttle participants and 50 total participants.
                You must pick your wave starting time & type of rental water craft before the Friday Evening Pre-Tournament meeting.`,
                publishedOn: '21st of March'
            }
        };
    }

    componentDidMount() {
        if (this.props.computedMatch.params.id) { 
            // get news by id
        }
    }

    render() {
        return (
            <div className="news-details-holder">
                <div className="row p-3">
                    <div className="col-8">
                        <h4>{this.state.news.title}</h4>
                    </div>
                    <div className="col-4 text-right">
                        <small>{this.state.news.publishedOn}</small>
                    </div>
                </div>
                <hr/>
                <div className="row p-4">
                    <div className="col-12">
                        <p>{this.state.news.content}</p>
                    </div>
                </div>            
            </div>
        );
    }
}