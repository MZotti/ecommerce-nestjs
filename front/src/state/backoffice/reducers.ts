import { combineReducers } from "redux";

import productsReducer from './products/reducer'
import ordersReducer from './orders/reducer'
import customersReducer from './customers/reducer'
import usersReducer from './users/reducer'
import reportsReducer from './reports/reducer'

const backofficeReducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    users: usersReducer,
    reports: reportsReducer
});

export default backofficeReducer