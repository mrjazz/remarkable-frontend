import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import {Link, useHistory} from 'react-router-dom';

import Menu from './pages/home/Menu';
import BurgerIcon from './components/Icons/BurgerIcon';
import ArrowIcon from './components/Icons/ArrowIcon';
import LogoIcon from './components/Icons/LogoIcon';

import SearchInput from "./pages/home/SearchInput";
import {uiUpdate} from './store/wiki/actions';
import {sidebarClose, sidebarOpen} from './store/sidebar/actions';

import {urlRepo} from "./config";
import {isMobileView} from './lib/WikiUtils';
import './Layout.css';


const URL_REPOSITORY = urlRepo();

const MobileButton = (props) => {
  if (props.sideBarOpen) {
    return <ArrowIcon onClick={() => props.dispatch(sidebarClose())} className="btn" />;
  }
  
  return <BurgerIcon onClick={() => props.dispatch(sidebarOpen())} className="btn" />;
}

const Sidebar = ({sideBarOpen, isMobile}) => {
  if (sideBarOpen || !isMobile) {
    return <div className="sidebar">
      <SearchInput/>
      <Menu/>
    </div>;
  }
  
  return null;
}

const flatTree = (items) => {
  let result = [];
  items.map((i) => {    
    if (i.items && i.items.length > 0) {            
      result = result.concat(flatTree(i.items));
    } else {
      result.push(i.path);
    }
  })
  return result;
}

export default function Layout({children}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const pages = useSelector(state => state.menu.pages);
  const isMobile = useSelector(state => state.wiki.mobile);
  const isSideBarOpen = useSelector(state => state.sidebar.sideBarOpen);
  const curUrl = useSelector(state => state.menu.url);
  
  const updateUiState = () => dispatch(uiUpdate(isMobileView()));

  useEffect(() => {    
    window.onresize = () => updateUiState();  
  });

  const doEdit = () => {
    const url = URL_REPOSITORY + curUrl;
    document.location = url;
  }

  const doRandom = () => {
    // dispatch(randomArticleLoad());
    const allPages = flatTree(pages);
    const url = allPages[Math.round(Math.random() * (allPages.length-1))]
    history.push(url);
  };

  return <>
    <header className="header">
      <div className="menu__left">
        {isMobile ? 
          <MobileButton dispatch={dispatch} sideBarOpen={isSideBarOpen}/> : 
          <a href="/"><LogoIcon className="logo"/></a>}
      </div>
      <div className="menu__right">
        <Link to="/recent">Recent</Link> <a href="#" onClick={doRandom}>Random</a>
        {URL_REPOSITORY ? <button onClick={doEdit}>Edit</button> : ''}
      </div>
    </header>
    <div className="wrapper">
      <div className="main">
        <Sidebar
          sideBarOpen={isSideBarOpen}
          isMobile={isMobile}
        />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
    <footer className="footer"/>
  </>;
};