
import React from 'react';
import './PostsHolder.scss';
import { Post } from '../single/Post';

export class PostsHolder extends React.Component {

    render() {
        return (
            <div className="posts-holder">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}