import { combineReducers } from "redux";

import customerReducer from './customer/reducer'
import cartReducer from './cart/reducer'

const storeReducer = combineReducers({
    customer: customerReducer,
    cart: cartReducer
});

export default storeReducer