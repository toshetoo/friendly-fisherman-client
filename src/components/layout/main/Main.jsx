import React from 'react';
import { PostsHolder } from '../../content/posts/list/PostsHolder';
import { CategoriesList } from './../../content/categories/list/CategoriesList';
import { Poll } from './../../content/polls/Poll';
import { ActiveThreads } from '../../content/posts/active-threads/ActiveThreads';
import { UserProfile } from '../../user/profile/UserProfile';
import { Switch, Route, Redirect } from "react-router-dom";
import { ThreadDetailsHolder } from './../../content/posts/thread-details/holder/ThreadDetailsHolder';

export class Main extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8">
                        <Switch> 
                            <Route exact path="/home" component={PostsHolder} />
                            <Route exact path="/profile" component={UserProfile} />
                            <Route exact path="/thread/:id" component={ThreadDetailsHolder} />


                            <Redirect from="/" to="/home" />
                        </Switch>
                    </div>
                    <div className="col-12 col-sm-4">
                        <CategoriesList />
                        <Poll />
                        <ActiveThreads />
                    </div>
                </div>
            </div>
        );
    }
}