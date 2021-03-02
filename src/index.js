import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {initStore} from "./store/store.js";
import App from "./App";


const rootElement = document.getElementById("app");
ReactDOM.render(
  <Provider store={initStore()}>    
    <App />    
  </Provider>,
  rootElement
);
