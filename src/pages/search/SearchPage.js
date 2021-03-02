import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchResult from '../../components/Search/SearchResult';
import {search, searchCancel} from '../../store/search/actions';
import {sidebarClose} from '../../store/sidebar/actions';
import {useHistory, useParams} from 'react-router-dom';


const SearchResults = ({searchResult, redirect}) => {      
  if (!searchResult || searchResult.length <= 0) {
    return <p>Nothing found</p>
  }

  // console.log(searchResult);
  return searchResult.map((r, i) => <SearchResult className="searchResult" key={i} result={r} redirect={redirect}/>);
}

export default function SearchPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchText = useSelector(state => state.search.searchText);
  const searchResult = useSelector(state => state.search.searchResult);
  const sideBarOpen = useSelector(state => state.sidebar.sideBarOpen);
  const params = useParams();

  useEffect(() => {
    dispatch(search(params[0]));    
    sideBarOpen && dispatch(sidebarClose());    
  }, [params]);  

  const redirect = (t) => {    
    const url = t + "?highlight=" + searchText;    
    // console.log(url);
    // dispatch(articleLoad(url));    
    dispatch(sidebarClose());
    dispatch(searchCancel());
    history.push(url);
  } 

  return <>
      <h1>Search "{searchText}"</h1>
      {searchResult ? <SearchResults searchResult={searchResult} redirect={redirect}/> : <p>Loading...</p>}
  </>;
}