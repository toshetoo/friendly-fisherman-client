import React from 'react';
import { PostsHolder } from '../../content/posts/list/PostsHolder';
import { ActiveThreads } from '../../content/posts/active-threads/ActiveThreads';
import { UserProfile } from '../../user/profile/UserProfile';
import { Switch, Route, Redirect } from "react-router-dom";
import { ThreadDetailsHolder } from './../../content/posts/thread-details/holder/ThreadDetailsHolder';
import { ConfirmAccount } from './../../auth/confirm/ConfirmAccount';
import ProtectedRoute from './../../../core/routes/ProtectedRoute';
import { ResetPassword } from '../../auth/reset-password/ResetPassword';
import { PollOfTheWeek } from './../../content/polls/poll-of-the-week/PollOfTheWeek';
import { Messages } from '../../user/messages/Messages';
import { NewMessage } from './../../user/messages/NewMessage';
import { TrendingCategories } from '../../content/categories/trending-categories/TrendingCategories';
import CreatePost from '../../content/posts/create-topic/CreatePost';
import { NewsList } from '../../content/news/list/NewsList';
import NewsDetails from './../../content/news/news-details/NewsDetails';
import FeedbackForm from './../feedback/FeedbackForm';

export class Main extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8">
                        <Switch>
                            <Route exact path="/home" component={PostsHolder} />
                            <Route exact path="/thread/:id" component={ThreadDetailsHolder} />
                            <Route exact path="/auth/confirm" component={ConfirmAccount} />
                            <Route exact path="/auth/reset-password" component={ResetPassword} />

                            <ProtectedRoute exact path="/messages/:selectedTab?" component={Messages} />
                            <ProtectedRoute exact path="/new-message" component={NewMessage} />
                            <ProtectedRoute exact path="/profile" component={UserProfile} />

                            <ProtectedRoute exact path="/create-topic" component={CreatePost} />

                            <ProtectedRoute exact path="/news/:id" component={NewsDetails} />
                            <ProtectedRoute exact path="/feedback" component={FeedbackForm} />


                            <Redirect from="/" to="/home" />
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-4">                        
                        <NewsList />
                        <TrendingCategories />
                        <PollOfTheWeek />
                    </div>
                </div>
            </div>
        );
    }
}