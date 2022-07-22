import { combineReducers } from 'redux'

import myApp from './myApp'
import policy from './policy'
const reducers = combineReducers({
    myApp,
    policy
})
export default reducers