import React from 'react';
import { PostsHolder } from '../../content/posts/list/PostsHolder';
import { CategoriesList } from './../../content/categories/list/CategoriesList';
import { ActiveThreads } from '../../content/posts/active-threads/ActiveThreads';
import { UserProfile } from '../../user/profile/UserProfile';
import { Switch, Route, Redirect } from "react-router-dom";
import { ThreadDetailsHolder } from './../../content/posts/thread-details/holder/ThreadDetailsHolder';
import { ConfirmAccount } from './../../auth/confirm/ConfirmAccount';
import ProtectedRoute from './../../../core/routes/ProtectedRoute';
import { ResetPassword } from '../../auth/reset-password/ResetPassword';
import { PollOfTheWeek } from './../../content/polls/poll-of-the-week/PollOfTheWeek';
import { PollsList } from './../../content/polls/polls-list/PollsList';
import { AddPoll } from './../../content/polls/add-poll/AddPoll';
import { Messages } from '../../user/messages/Messages';
import { NewMessage } from './../../user/messages/NewMessage';
import { TrendingCategories } from '../../content/categories/trending-categories/TrendingCategories';
import { AddCategory } from './../../content/categories/add-category/AddCaregory';
import CreatePost from '../../content/posts/create-topic/CreatePost';

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
                            <ProtectedRoute exact path="/polls-list" component={PollsList} />
                            <ProtectedRoute exact path="/add-poll" component={AddPoll} />
                            <ProtectedRoute exact path="/add-poll/:id" component={AddPoll} />
                            <ProtectedRoute exact path="/categories-list" component={CategoriesList} />
                            <ProtectedRoute exact path="/add-category" component={AddCategory} />
                            <ProtectedRoute exact path="/add-category/:id" component={AddCategory} />

                            <ProtectedRoute exact path="/create-topic" component={CreatePost} />
                            <ProtectedRoute exact path="/events" component={CreatePost} />


                            <Redirect from="/" to="/home" />
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-4">
                        <TrendingCategories />
                        <PollOfTheWeek />
                        <ActiveThreads />
                    </div>
                </div>
            </div>
        );
    }
}