import * as types from "./types";
import { urlApi } from "../../config";
import requestParams from "../../lib/UrlParser";

export function menuClose(path) {
  return { type: types.MENU_CLOSE, path };
}

export function menuOpen(path) {
  return { type: types.MENU_OPEN, path };
}

export function wikilinksOpen() {
  return { type: types.WIKILINKS_OPEN };
}

export function wikilinksClose() {
  return { type: types.WIKILINKS_CLOSE };
}

export function articleLoad(url) {
  const getParams = requestParams();
  // Content-Type:application/json
  return (dispatch) => {
    dispatch({ type: types.LOAD_ARTICLE_START, url });
    const highlightParam = getParams.highlight
      ? "?highlight=" + getParams.highlight
      : "";

    const requestUrl = urlApi() + url + highlightParam;
    const params = {
      'headers': {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };
    
    fetch(requestUrl, params)
      .then((response) => response.json())
      .then((t) => {
        dispatch({
          type: types.LOAD_ARTICLE_FINISH,
          html: t.html,
          wikilinks: t.wikilinks,
          url: url,
        });
      })
      .catch(console.log);
  };
}

export function articlesLoad() {
  return (dispatch) =>
    fetch(urlApi() + "articles.json")
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: types.LOAD_ARTICLES,
          pages: json,
        })
      );
}
