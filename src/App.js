import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Header } from './components/layout/header/Header';
import { Footer } from './components/layout/footer/Footer';
import { Main } from './components/layout/main/Main';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Login } from './components/auth/login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">        
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Main} />
        </Switch>        
        <Footer />
      </div>
    );
  }
}

export default App;
