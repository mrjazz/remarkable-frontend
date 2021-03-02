import { combineReducers } from 'redux';
import wiki from './wiki/reducers';
import menu from './menu/reducers';
import search from './search/reducers';
import sidebar from './sidebar/reducers';


export default combineReducers({wiki, menu, search, sidebar});