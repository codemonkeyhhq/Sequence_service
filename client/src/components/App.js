import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dashboard from './Dashboard';
import Header from './Header';
class App extends Component {
  componentDidMount() {
      this.props.viewIssue();
      this.props.viewSite();
      this.props.viewPanel();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
          <h3>Issue Manager</h3>
          <Header/>
          <Dashboard/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
