import * as types from './types';


export function uiUpdate(isMobileView) {    
    return {type: types.UI, mobile: isMobileView}
}
