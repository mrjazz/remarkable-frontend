import * as types from './types';


const traverse = (items, fn) => {
    return items.map((i) => {
      fn(i);
      if (i.items) {
        i.items = traverse(i.items, fn);
      }
      return i;
    });
}

function initialState() {
    return {
        pages: null,
        url : '',
        html: '',
        pagesVisited: [],
        wikilinks: [],
        isWikilinksOpen: false
    };
}

function fileName(path) {
    const parts = path.split('/');
    return parts[parts.length - 1];
}

function addFileNames(items) {
    return traverse(items, (i) => {
        i.fileName = fileName(i.path);
    })
}

export default function reducer(state = initialState(), action) {
    // console.log('menu', action);
    switch (action.type) {
        case types.WIKILINKS_OPEN:
            return {...state, isWikilinksOpen: true};
        case types.WIKILINKS_CLOSE:
            return {...state, isWikilinksOpen: false};
        case types.LOAD_ARTICLE_START:
            return {...state, loading: true};
        case types.LOAD_ARTICLE_FINISH:
            const url = action.url ? action.url : state.url;
            return {...state, url: url, loading: false, html: action.html, wikilinks: action.wikilinks};
        case types.MENU_OPEN:
            return {...state, pages: traverse(state.pages, (i) => {
                i.path == action.path ? i.open = true : '';
            })};
        case types.MENU_CLOSE:
            return {...state, pages: traverse(state.pages, (i) => {
                i.path == action.path ? i.open = false : '';
            })};
        case types.LOAD_ARTICLES:
            return {...state, pages: addFileNames(action.pages)};
        default:
            return state;
    }
}