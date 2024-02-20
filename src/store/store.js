import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import cartReducer from "./reducers/cartSlice";
import notificationReducer from "./reducers/notificationSlice";
import productReducer from "./reducers/productSlice";

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	notification: notificationReducer,
	product: productReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
