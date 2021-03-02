import React, {useEffect} from "react";
import AppRouter from './AppRouter';
import { hot } from 'react-hot-loader/root';


function App() {  
  return <>
    <AppRouter/>
  </>
}

export default hot(App);
