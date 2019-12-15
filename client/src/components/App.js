import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dashboard from './Dashboard';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//root component. css elements import in ../index.js includes maerial-ui and stylesheets
class App extends Component {r
    test(){
        //to do: redirect to login page
        console.log("redirect");
    }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">NCBI Image</Typography>
            <Link color="inherit" onClick={(e)=>{this.test()}}>
                Login
            </Link>
          </Breadcrumbs>
          <Dashboard/>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
