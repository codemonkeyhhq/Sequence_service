import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={selectedSite:0,selectedPanel:0,newComment:''};

    }
    renderSiteList() {
       if(this.props.site_list.response) {
           return (
               this.props.site_list.response.map((site) => <option key={site.idSite} value={site.idSite}>{site.SiteName}</option>)
            )
        }
    }
    changeSite(event){
        console.log(event.target.value)
         this.setState({selectedSite: event.target.value})
    }
    renderPanelList(){
        if(this.props.panel_list.response) {
            return (
                this.props.panel_list.response.map((panel) => <option key={panel.idPanel} value={panel.idPanel}>{panel.idPanel+" "+panel.Model}</option>)
             )
         }
    }
    changePanel(event){
        console.log(event.target.value)
        this.setState({selectedPanel: event.target.value})
    }
    changeText(event){
        console.log(event.target.value)
        this.setState({newComment:event.target.value})
    }
    renderIssueList(){
        if(this.props.issue_list.response) {
            return this.props.issue_list.response.map((issue)=>{return parseInt(issue.idIssue)})

         }
    }
    SubmitIssue(){
        var list=this.renderIssueList();
        var id=Math.max(...list)+1
        this.props.addIssue({"issue":{"id":id,"site":this.state.selectedSite,"panel":this.state.selectedPanel,"comment":this.state.newComment}}).then(this.refresh())
    }
    refresh(){
        this.props.viewIssue()
    }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <select value={this.state.selectedSite} onChange={(e) => {this.changeSite(e)}}>
                {this.renderSiteList()}
            </select>
            <select value={this.state.selectedPanel} onChange={(e) => {this.changePanel(e)}}>
                {this.renderPanelList()}
            </select>
            <form>
                <label>Comment :
                    <input type="text" value={this.state.newComment} onChange={(e)=>{this.changeText(e)}}/>
                </label>
            </form>
            <button onClick={(e)=>{this.SubmitIssue(e)}}>
                Submit Issue
            </button>
            <button onClick={(e)=>{this.refresh(e)}}>
                Refresh List
            </button>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps({site_list,panel_list,issue_list}){
    return {site_list,panel_list,issue_list};
}
export default connect(mapStateToProps,actions)(Header);
