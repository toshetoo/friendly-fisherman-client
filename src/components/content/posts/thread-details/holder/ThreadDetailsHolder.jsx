import React from 'react';
import { ThreadDetails } from './../single/ThreadDetails';
import PostsService from '../../../../../core/services/posts.service';
import BaseService from './../../../../../core/services/base-api.service';

export class ThreadDetailsHolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: {},
            replies: []
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) { 
            PostsService.getById(this.props.match.params.id).then((response) => {
                const { replies, ...thread } = response.item;
                this.setState({
                     thread, replies: replies || []
                }, () => this.markThreadAsSeen());
            });
        }       
    }

    markThreadAsSeen() {
        const data = {
            threadReplyId: this.state.thread.id,
            userId: BaseService.getLoggedUserId()
        }
        PostsService.markAsSeen(data).then(() => {

        });
    }

    onLikeClicked = (id) => {
        const data = {
            userId: BaseService.getLoggedUserId(),
            threadReplyId: id,
            isLiked: 1
        };

        PostsService.likeReply(data).then(() => {
            this.setState({

            })
        });
    }

    onDislikeClicked = (id) => {
        const data = {
            userId: BaseService.getLoggedUserId(),
            threadReplyId: id,
            isLiked: 0
        };

        PostsService.likeReply(data).then(() => {
            this.setState({
                
            })
        });
    }

    render() {
        let { thread, replies } = this.state;

        replies = replies.map(r => {
            return <ThreadDetails key={r.id} thread={r} onDislikeClicked={this.onDislikeClicked} onLikeClicked={this.onLikeClicked}/>
        });


        return (
            <div className="thread-details-holder">
                <ThreadDetails thread={thread} onDislikeClicked={this.onDislikeClicked} onLikeClicked={this.onLikeClicked}/>
                {replies}
            </div>
        );
    }
}