import * as types from './types';
import { urlApi } from "../../config";


export function searchCancel() {
    return {type: types.SEARCH_CANCEL};
}

export function search(text) {    
    return (dispatch) => {
        dispatch({type: types.SEARCH_START, searchText: text})
        fetch(urlApi() + 'search.json?text=' + text)
            .then(response => response.json())
            .then(result => {                
                dispatch({type: types.SEARCH_FINISH, result: result})
            })
            .catch(console.log);        
    }        
}

// export function searchResult(searchResult, searchText) {
//     return {type: types.SEARCH_RESULT, searchResult, searchText};
// }