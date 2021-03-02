import * as types from './types';


function initialState() {
    return {        
        searchResult: [],
        searchText: ''        
    };
}
  
export default function reducer(state = initialState(), action) {
    // console.log(action.type);
    switch (action.type) {       
        case types.SEARCH_CANCEL:
            return {...state, searchResult: null, searchText: ''};
        case types.SEARCH_START:
            return {...state, searchText: action.searchText};
        case types.SEARCH_FINISH:
            return {...state, searchResult: action.result};        
        default:
            return state;
    }
}