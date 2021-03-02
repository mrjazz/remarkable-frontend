import * as types from './types';
import {isMobileView} from '../../lib/WikiUtils';


function initialState() {
    return {        
        mobile: isMobileView()
    };
}
  
export default function reducer(state = initialState(), action) {
    // console.log(action.type);
    switch (action.type) {                
        case types.UI:
            return {...state, mobile: action.mobile};
        default:
            return state;
    }
}