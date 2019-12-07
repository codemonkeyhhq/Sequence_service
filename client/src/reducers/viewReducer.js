import {VIEW_ISSUE}from '../actions/types';
export default function(state=[],action){
    switch(action.type){
        case VIEW_ISSUE:
            return action.payload ||false;
        default:
            return state;
    }
}
