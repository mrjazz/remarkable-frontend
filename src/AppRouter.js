import React, {Children, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Layout from './Layout';
import SearchPage from "./pages/search/SearchPage";
import ArticlePage from "./pages/article/ArticlePage";
import RecentPage from "./pages/recent/RecentPage";
import RandomPage from "./pages/random/RandomPage";
import {articlesLoad} from './store/menu/actions';


function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(articlesLoad());    
  });
  
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/search/*"><SearchPage/></Route>
          <Route path="/recent"><RecentPage/></Route>
          <Route path="/random"><RandomPage/></Route>                  
          <Route path="/*"><ArticlePage/></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRouter;
