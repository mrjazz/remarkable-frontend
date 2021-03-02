import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {menuClose, menuOpen} from '../../store/menu/actions';
import MenuItemLink from '../../components/menu/MenuItemLink';
import {gotoUrl} from '../../store/actions';
import './Menu.css';


let counter = 1;

const IconOpen = () => <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>;
const IconClosed = () => <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>;
const MenuIcon = ({open}) => open ? <IconOpen/> : <IconClosed/>;

const Folder = ({item, folderHandler}) => {
    const {name, open} = item;
    return <span className="folder" onClick={()=>folderHandler(item)}>
        <MenuIcon open={open}/>{name}
    </span>;
}

const MenuItem = (n, clickHandler, folderHandler) => {
    return <li key={counter++}>
        {n.items ?
            <Folder item={n} folderHandler={folderHandler}/> :
            <MenuItemLink onClick={() => clickHandler(n.path)} node={n}/>}
        {n.items && n.open && MenuItems(n.items, clickHandler, folderHandler)}
    </li>;
}

// render not files then directories
const MenuItems = (articles, clickHandler, folderHandler) => {    
    return <ul className="menu">
        {articles.filter(n => !n.items).map(n => MenuItem(n, clickHandler, folderHandler))}
        {articles.filter(n => n.items).map(n => MenuItem(n, clickHandler, folderHandler))}
    </ul>;
}

const filterSearchResult = (items, searchResult) => {
    const result = [];
    items.forEach(m => {
        const item = {
            test: 'passed',
            name: m.name,
            path: m.path,
            open: m.open == undefined ? true : m.open // open tree in search result by default
        }

        if (m.items) {
            const nested = filterSearchResult(m.items, searchResult);
            if (nested.length > 0) {
                item['items'] = nested;
            }
        }
        
        if(searchResult.includes(m.path) || item.items) {
            result.push(item);
        }
    });
    return result;
}

const Menu = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.menu.pages);
    const searchResult = useSelector(state => state.search.searchResult);
    const searchText = useSelector(state => state.search.searchText);
    const history = useHistory();
    
    if (!items) {
        return <p>Loading...</p>
    }
    
    const clickHandler = (url) => {
        gotoUrl(url, dispatch, history, searchResult, searchText);
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });        

        // let gotoUrl = '/page' + url;
        // if (searchResult) {
        //     gotoUrl += '?highlight=' + searchText;
        // }
        // console.log(gotoUrl);
        // history.push(gotoUrl);
        // dispatch(sidebarClose());
        // dispatch(searchCancel());
    };

    const folderHandler = (item) => {
        dispatch(item.open ? menuClose(item.path) : menuOpen(item.path));
    }

    return MenuItems(
        searchResult && searchResult.length > 0 ?
            filterSearchResult(items, searchResult.map(r => r.path)) :
                items,
        clickHandler,
        folderHandler
    );
}

export default Menu;