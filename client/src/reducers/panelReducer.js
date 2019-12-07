import {VIEW_PANEL}from '../actions/types';
export default function(state=[],action){
    switch(action.type){
        case VIEW_PANEL:
            return action.payload ||false;
        default:
            return state;
    }
}
