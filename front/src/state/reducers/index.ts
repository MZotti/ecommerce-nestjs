import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authReducer'
import userReducer from './userReducer'
import customerReducer from './customerReducer'
import productReducer from './productReducer'
import orderReducer from './orderReducer'
import cartReducer from './cartReducer'
import notificationReducer from './notificationReducer'
import reportReducer from './reportReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    customers: customerReducer,
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,
    notifications: notificationReducer,
    reports: reportReducer,
})

export default rootReducer

export type State = ReturnType<typeof rootReducer>
