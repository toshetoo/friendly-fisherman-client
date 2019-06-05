import React from 'react';
import './NewsList.scss';
import { NewsItem } from '../list-item/NewsItem';

export class NewsList extends React.Component {

    render() {
        return(
            <div className="news-holder">
                <h3 className="header">News</h3>
                <div className="divider"></div>
                <NewsItem />
                <div className="divider"></div>
                <NewsItem />
                <div className="divider"></div>
                <NewsItem />
                <div className="divider"></div>
                <NewsItem />
                <div className="divider"></div>
                <NewsItem />
            </div>
        );
    }
}