import { AnyAction } from 'redux';
import { TabsState } from '@/redux/interface';
import product from 'immer';
import * as types from '@/redux/mution-types'
import { HOME_URL } from '@/config/config';
const TabsState: TabsState = {
    tabsActive: '',
    tabsList: []
}

const tabs = (state: TabsState = TabsState, action: AnyAction) =>
    product(state, draftState => {
        switch (action.type) {
            case types.SET_TABS_ACTIVE:
                draftState.tabsActive = action.tabsActive;
                break;
            case types.SET_TABS_LIST:
                draftState.tabsList = action.tabsList;
                break;
            default:
                return draftState;
        }

    })
export default tabs;