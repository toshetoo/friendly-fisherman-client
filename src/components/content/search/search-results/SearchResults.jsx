import React from 'react';
import AdvancedSearch from './../advanced-search/AdvancedSearch';
import PostsService from './../../../../core/services/posts.service';
import { Post } from './../../posts/single/Post';

export default class SearchResults extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isAdvanced: false,
            posts: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.isAdvanced) { 
            this.setState({ isAdvanced: true });
        }

        PostsService.getAll().then(resp => {
            this.setState({
                posts: resp.data.items
            })
        });
    }
    
    render() {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} post={post}/>
        });
         
        return (
            <div className="posts-holder">
                {
                    this.state.isAdvanced
                    ? <div><AdvancedSearch /><hr/></div> 
                    : ''
                }
                
                <div className="row">
                    <div className="col-12">
                        <h3>Search results</h3>
                    </div>
                </div>
                    {posts}
            </div>
        );
    }
}