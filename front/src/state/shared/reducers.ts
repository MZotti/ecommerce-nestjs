import { combineReducers } from "redux";

import authReducer from './auth/reducer'
import notificationReducer from './notifications/reducer'

const sharedReducer = combineReducers({
    auth: authReducer,
    notificationReducer: notificationReducer,
});

export default sharedReducer