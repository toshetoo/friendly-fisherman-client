import React from 'react';
import { PostsHolder } from '../../content/posts/list/PostsHolder';
import { CategoriesList } from './../../content/categories/list/CategoriesList';
import { Poll } from './../../content/polls/Poll';
import { ActiveThreads } from '../../content/posts/active-threads/ActiveThreads';

export class Main extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <PostsHolder />
                    </div>
                    <div className="col-4">
                        <CategoriesList />
                        <Poll />
                        <ActiveThreads />
                    </div>
                </div>
            </div>
        );
    }
}