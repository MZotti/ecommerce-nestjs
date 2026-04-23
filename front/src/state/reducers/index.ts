import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import reportReducer from './reportReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    notifications: notificationReducer,
    reports: reportReducer,
})

export default rootReducer

export type State = ReturnType<typeof rootReducer>
