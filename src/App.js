import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Header } from './components/header/Header';
import { Main } from './components/layout/main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">        
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
