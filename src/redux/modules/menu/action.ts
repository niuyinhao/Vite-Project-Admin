import * as types from '@/redux/mution-types';
// import { ThemeConfigProp } from '@/redux/interface/index';
export const updateCollapse = (isCollapse: boolean) => ({
    type: types.UPDATE_COLLAPSE,
    isCollapse
});
// * setAssemblySize
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
    type: types.SET_MENU_LIST,
    menuList
});