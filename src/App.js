import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Header } from './components/layout/header/Header';
import { Footer } from './components/layout/footer/Footer';
import { Main } from './components/layout/main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">        
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
