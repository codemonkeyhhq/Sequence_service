import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Dashboard extends Component {
    renderList() {
       if(this.props.issue_list.response) {
      return this.props.issue_list.response.map(issue => {
        return (
          <div className="card darken-1" key={issue.idIssue}>
              <p>
                {issue.Comment+" "+issue.Panel+" "+issue.Brand+" "+issue.SiteName+" "+issue.Model}
              </p>

            <div className="card-action">
            </div>
          </div>
        );
    });}
    }
  render() {
    
    return (
      <div className="container">
        <BrowserRouter>
          <div>
        {this.renderList()}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps({issue_list}){
    return {issue_list };
}
export default connect(mapStateToProps)(Dashboard);
