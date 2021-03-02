import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import CancelIcon from '../../components/Icons/CancelIcon';
import SearchIcon from '../../components/Icons/SearchIcon';
import './SearchInput.css';
import {searchCancel, search} from '../../store/search/actions';
import {sidebarClose} from '../../store/sidebar/actions';


export default function SearchInput() {    
    const dispatch = useDispatch();
    const history = useHistory();
    const inputRef = useRef(); 
    const searchText = useSelector(state => state.search.searchText);    

    useEffect(() => {
        // clean up search field if we don't search anymore
        if (searchText == '') {
            inputRef.current.value = '';
        }
    });

    const doCancel = () => dispatch(searchCancel());    

    const doSearch = (searchText) => {        
        if (searchText.trim() === '') {
            doCancel();
            return;
        }
        
        if (searchText.trim().length < 3) {
            return;
        }

        history.push('/search/' + searchText);
    };

    const onKeyDown = (e) => {
        if (e.key == 'Enter') {            
            doSearch(e.target.value);
        }            
    }
    // <CancelIcon className="iconBtn" onClick={doCancel}/>        
    return <div className="searchInput">
        <input
            ref={inputRef}
            type="text"                        
            onKeyDown={onKeyDown}
            placeholder="Search"
            />
        <SearchIcon className="iconBtn" onClick={() => doSearch(inputRef.current.value)}/>
    </div>;
}
