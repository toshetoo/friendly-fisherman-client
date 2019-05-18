
import React from 'react';
import './PostsHolder.scss';
import { Post } from '../single/Post';
import PostsService from '../../../../core/services/posts.service';

export class PostsHolder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        PostsService.getAll().then(response => {
            this.setState({ posts: response.data.items });
        });
    }

    render() {
        const posts = this.state.posts.map(post => {
            return <Post post={post}/>
        })

        return (
            <div className="posts-holder">
                <Post post={{}}/>
                {posts}
            </div>
        );
    }
}