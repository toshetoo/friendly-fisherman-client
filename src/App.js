import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Header } from './components/layout/header/Header';
import { Footer } from './components/layout/footer/Footer';
import { Main } from './components/layout/main/Main';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Router } from 'react-router-dom';
import history from './core/history/History';
import UsersService from './core/services/users.service';
import { ForgottenPassword } from './components/auth/forgotten-password/ForgottenPassword';
import AdminModule from './components/admin/AdminModule';
import ProtectedRoute from './core/routes/ProtectedRoute';
import { UserProfile } from './components/user/profile/UserProfile';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: UsersService.getLoggedUser()
    };
  }

  setLoggedIn(hasLogged) {
    this.setState({
      isLoggedIn: hasLogged
    })
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route path="/login" render={() => {
              return <Login setLoggedInFn={this.setLoggedIn.bind(this)} history={history} ></Login>
            }} />
            <Route path="/register" component={Register} />
            <Route path="/forgotten-password" component={ForgottenPassword} />
            <ProtectedRoute exact path="/profile" component={UserProfile} />
            <Route path="/admin" component={AdminModule} />
            <Route path="/" component={Main} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
