import * as types from './types';


function initialState() {
    return {        
        sideBarOpen: false
    };
}
  
export default function reducer(state = initialState(), action) {
    // console.log(action.type);
    switch (action.type) {               
        case types.SIDEBAR_CLOSE:
            return {...state, sideBarOpen: false};
        case types.SIDEBAR_OPEN:
            return {...state, sideBarOpen: true};        
        default:
            return state;
    }
}