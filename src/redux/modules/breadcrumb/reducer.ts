import { BreadcrumbState } from '@/redux/interface/index'
import { SET_BREADCRUMB_LIST } from '@/redux/mution-types'
import produce from 'immer'
import { AnyAction } from 'redux'


const breadcrumbState: BreadcrumbState = {
    breadcrumbList: {}
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
    produce(state, draftState => {
        switch (action.type) {
            case SET_BREADCRUMB_LIST:
                draftState.breadcrumbList = action.breadcrumbList;
                break
            default:
                return draftState

        }
    })


export default breadcrumb