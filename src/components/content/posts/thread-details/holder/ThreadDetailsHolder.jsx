import React from 'react';
import { ThreadDetails } from './../single/ThreadDetails';
import PostsService from '../../../../../core/services/posts.service';
import BaseService from './../../../../../core/services/base-api.service';
import CreateReply from './../../create-reply/CreateReply';

export class ThreadDetailsHolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thread: {},
            replies: [],
            showReplyForm: false
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) { 
            this.getThread();
        }       
    }

    getThread = () => {
        PostsService.getById(this.props.match.params.id).then((response) => {
            const { replies, ...thread } = response.item;
            this.setState({
                 thread, replies: replies || [],
                 showReplyForm: false
            }, () => this.markThreadAsSeen());
        });
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

        PostsService.likeReply(data).then((resp) => {
            this.updateLikes(id, resp);
        });
    }

    onDislikeClicked = (id) => {
        const data = {
            userId: BaseService.getLoggedUserId(),
            threadReplyId: id,
            isLiked: 0
        };

        PostsService.likeReply(data).then((resp) => {
            this.updateLikes(id, resp);
        });
    }

    onReplyClicked = () => {
        this.setState({
            showReplyForm: true
        });
    }

    onDeleteReplyClicked = (id) => {
        PostsService.deleteReply(id).then(() => {
            this.getThread();
        });
    }

    onDeleteThreadClicked = (id) => {
        PostsService.delete(id).then(() => {
            this.getThread();
        });
    }
    
    updateLikes(id, resp) {
        const thread = this.state.thread;
        const replies = this.state.replies;
        const curr = thread.id === id ? thread : replies.find(r => r.id === id);
        curr.likes = resp.data.item.likes[1];
        curr.dislikes = resp.data.item.likes[0];
        curr.userLike = resp.data.item.userLike;
        this.setState({
            thread, replies
        });
    }

    render() {
        let { thread, replies } = this.state;

        replies = replies.map(r => {
            return <ThreadDetails key={r.id} thread={r} 
            onDislikeClicked={this.onDislikeClicked} 
            onLikeClicked={this.onLikeClicked}
            onDeleteClicked={this.onDeleteReplyClicked}/>
        });


        return (
            <div className="thread-details-holder">
                <ThreadDetails thread={thread} 
                onDislikeClicked={this.onDislikeClicked} 
                onLikeClicked={this.onLikeClicked} 
                onReplyClicked={this.onReplyClicked}
                shouldHaveReply={true}
                onDeleteClicked={this.onDeleteThreadClicked}/>
                {this.state.showReplyForm ? <CreateReply threadId={this.state.thread.id} refresh={this.getThread} /> : ''}
                {replies}
            </div>
        );
    }
}