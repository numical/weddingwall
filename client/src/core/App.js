import React, { Component } from 'react';
import './App.css';
import './global.css';

const methods = ['renderError'];

class App extends Component {
  constructor (props) {
    super(props);
    methods.forEach((method) => this[method] = this[method].bind(this));
    this.state = { error: null };
  }

  componentDidCatch (error, info) {
    console.log(`App error caught: ${error} : ${info}`);
    this.setState({ error });
  }

  renderError () {
    return (
      <div className='App-error-container'>
        <div className='App-error-title'>Sad face :-(</div>
        <div className='App-error-msg'>Oh dear, your Deedit app has errored.</div>
        <div className='App-error-msg'>We are sorry.</div>
        <div className='App-error-msg'>Please refresh your browser tab to try again.</div>
      </div>
    );
  }

  render () {
    const { Pages } = this.props;
    const { error } = this.state;
    return (error) ? this.renderError() : (<Pages />);
  }
}

export default App;
