import axios from 'axios';
import {ADD_SEQUENCE}from './types'
export const addSequence = (sequence) => async dispatch => {
        const res=axios.post('/add_sequence',sequence);
        dispatch({ type: ADD_SEQUENCE, payload: res.data });
};
