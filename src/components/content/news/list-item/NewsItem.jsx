import React from 'react';
import './NewsItem.scss';
import { Link } from 'react-router-dom';

export class NewsItem extends React.Component {

    render() {
        return (
            <div className="news-item">
                <div className="row">
                    <div className="col-12">
                        <Link to="/news/10">Sign up for the contest on 17 July. Only 15 spots are left.</Link>
                    </div>                    
                </div>
                <div className="row">
                        <div className="col-12 text-right text-secondary">
                            <small>Published on: 21st of March</small>
                        </div>
                    </div>
            </div>
        );
    }
}