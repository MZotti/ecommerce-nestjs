import { combineReducers } from "redux";

import customerReducer from './customer/reducer'
import cartReducer from './cart/reducer'
import ordersReducer from './orders/reducer'
import addressesReducer from './addresses/reducer'
import paymentCardsReducer from './paymentCards/reducer'

const storeReducer = combineReducers({
    customer: customerReducer,
    cart: cartReducer,
    orders: ordersReducer,
    addresses: addressesReducer,
    paymentCards: paymentCardsReducer
});

export default storeReducer