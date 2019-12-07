import axios from 'axios';
import {ADD_ISSUE} from './types';
import {VIEW_ISSUE} from './types';
import {VIEW_SITE} from './types';
import {VIEW_PANEL}from './types';
export const addIssue = (values) => async dispatch => {
        const res = await axios.post('/add_issue', values);
        dispatch({ type: ADD_ISSUE, payload: res.data });
        return res.data
};

export const viewIssue=()=>async dispatch=>{
        const res=await axios.get('/issues_list')
        dispatch({type:VIEW_ISSUE,payload:res.data})
        return res.data
};
export const viewSite=()=>async dispatch=>{
        const res=await axios.get('/sites_list')
        dispatch({type:VIEW_SITE,payload:res.data})
        return res.data
};
export const viewPanel=()=>async dispatch=>{
        const res=await axios.get('/panels_list')
        dispatch({type:VIEW_PANEL,payload:res.data})
        return res.data
};
