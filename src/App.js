import React from 'react';
import logo from './logo.svg';
import {action, observable} from "mobx";
import { observer } from "mobx-react"
import './App.css';

@observer
class App extends React.Component {
    @observable price = 0;
    @action
    onClickHandler = () => this.price++;
    render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                {this.price} <code>src/App.js</code> and save to reload.
            </p>
            <a
                onClick={this.onClickHandler}
                className="App-link"
                // href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

export default App;
