import {ADD_SEQUENCE}from '../actions/types';
export default function(state=null,action){
    switch(action.type){
        case ADD_SEQUENCE:
            return action.payload ||false;
        default:
            return state;
    }
}
