import * as types from './types';

export function sidebarClose() {
    return {type: types.SIDEBAR_CLOSE};
}

export function sidebarOpen() {
    return {type: types.SIDEBAR_OPEN};
}
