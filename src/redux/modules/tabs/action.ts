import * as types from '@/redux/mution-types';
// import { ThemeConfigProp } from '@/redux/interface/index';
export const setTabsActive = (tabsActive: boolean) => ({
    type: types.SET_TABS_ACTIVE,
    tabsActive
})
// * setAssemblySize
export const setTabsList = (tabsList: Menu.MenuOptions[]) => ({
    type: types.SET_TABS_LIST,
    tabsList
});