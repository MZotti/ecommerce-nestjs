import { combineReducers } from '@reduxjs/toolkit'

import backofficeReducer from './backoffice/reducers'
import storeReducer from './storeFront/reducers'
import sharedReducer from './shared/reducers'

const rootReducer = combineReducers({
    shared: sharedReducer,
    backoffice: backofficeReducer,
    store: storeReducer,
})

export default rootReducer

export type State = ReturnType<typeof rootReducer>
