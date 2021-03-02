import React, {useEffect} from "react";
import {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {articleLoad, wikilinksOpen, wikilinksClose} from '../../store/menu/actions';
import ReferencesIcon from '../../components/Icons/ReferencesIcon';
import MenuItemLink from '../../components/menu/MenuItemLink';
import {gotoUrl} from '../../store/actions';
import './ArticlePage.css';


const topArticle = (items) => {
    const topLevelItems = items ? items.filter(i => !i.items) : [];
    const index = topLevelItems.filter(i => {
        return ['readme.md', 'index.md'].indexOf(i.name.toLowerCase()) != -1
    });    
    return index[0] ? index[0].name : false;
}

const References = ({references, history, dispatch, isWikilinksOpen}) => {
    if (isWikilinksOpen) {
        return <>
            <div className="refTitle">Backlinks <ReferencesIcon className="refBtn" onClick={e => dispatch(wikilinksClose())}/></div>
            <ul>
                {references.map((i, key) => <li key={key}><MenuItemLink node={i} onClick={() => gotoUrl(i.link, dispatch, history)}/></li>)}
            </ul>
        </>
    }
    return <ReferencesIcon className="refBtn" onClick={e => dispatch(wikilinksOpen())}/>
}

const ArticlePage = () => {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const items = useSelector(state => state.menu.pages);
    const html = useSelector(state => state.menu.html);
    const isWikilinksOpen = useSelector(state => state.menu.isWikilinksOpen);
    const wikilinks = useSelector(state => state.menu.wikilinks);
    const [curArticle, setCurArticle] = useState(false);

    useEffect(() => {
        if (params && params[0]) {
            setCurArticle(params[0]);
        } else {
            setCurArticle(topArticle(items)); // by default
        }
    }, [params, items]);

    useEffect(() => {
        const elm = document.getElementById('f1');
        if (elm) {
            const y = elm.getBoundingClientRect().top + window.scrollY - 70; // the magic number because of header height
            window.scroll({
                top: y,
                behavior: 'smooth'
            });
        }
    })

    useEffect(() => {
        //console.log('load', curArticle);
        curArticle && dispatch(articleLoad(curArticle))
    }, [curArticle]);

    const clickHandler = (e) => {
        if (e.target.tagName === 'A') {
            const href = e.target.getAttribute('href');
            if (href.substr(0, 1) == '#') {
                return;
            } else if (href.substr(0, 4) == 'http') {
                document.location = href;
            } else {
                history.push(href);
                e.preventDefault();
            }
        }
    };

    return <div className="article">
        <div onClick={clickHandler} className="markdown" dangerouslySetInnerHTML={{ __html: html }}></div>
        {wikilinks.length > 0 && <div className="refs">
            <References references={wikilinks} dispatch={dispatch} history={history} isWikilinksOpen={isWikilinksOpen}/>
        </div>}
    </div>;
};

export default ArticlePage;
