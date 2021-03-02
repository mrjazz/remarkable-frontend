import {searchCancel} from './search/actions';
import {sidebarClose} from './sidebar/actions';

export function gotoUrl(url, dispatch, history, searchResult, searchText) {
    let newUrl = url;
    if (searchResult && searchText) {
        newUrl += '?highlight=' + searchText;
    }    
    history.push(newUrl);
    dispatch(sidebarClose());
    dispatch(searchCancel());
}