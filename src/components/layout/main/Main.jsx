import React from 'react';
import { PostsHolder } from '../../content/posts/list/PostsHolder';
import { CategoriesList } from './../../content/categories/list/CategoriesList';

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
                    </div>
                </div>
            </div>
        );
    }
}