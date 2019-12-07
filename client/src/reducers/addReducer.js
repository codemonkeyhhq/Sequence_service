import {ADD_ISSUE}from '../actions/types';
export default function(state=null,action){
    switch(action.type){
        case ADD_ISSUE:
            return action.payload ||false;
        default:
            return state;
    }
}
