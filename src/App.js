import React, { Component } from 'react';
import './App.css';
import IdeasContainer from './components/IdeasContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Idea Board</h1>
        </header>
        <IdeasContainer />
      </div>
    );
  }
}

export default App;
