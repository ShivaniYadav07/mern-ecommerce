import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
}
);

let initialState ={
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : [],
    },
};

const middleware = [thunk];

let store;

if (process.env.NODE_ENV === "development") {
  // Development environment with Redux DevTools
  store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  // Production environment without Redux DevTools
  store = createStore(reducer, initialState, applyMiddleware(...middleware));
}
export default store;