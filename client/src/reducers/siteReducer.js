import {VIEW_SITE}from '../actions/types';
export default function(state=[],action){
    switch(action.type){
        case VIEW_SITE:
            return action.payload ||false;
        default:
            return state;
    }
}
