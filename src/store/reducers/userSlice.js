import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isLoggedIn: false,
		wishlist: [],
		token: null,
	},
	reducers: {
		login(state, action) {
			const user = action.payload.user;
			state.isLoggedIn = true;
			state.user = user;
			state.wishlist = user.wishlist;
			// state.wishlist = action.payload.user?.wishlist || [];
		},
		logout(state, action) {
			state.isLoggedIn = false;
			state.user = null; // Set user to null
		},
		setWishList: (state, action) => {
			state.wishlist = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload.token;
		},
		addOrRemoveFromWishList: (state, action) => {
			if (state.wishlist.includes(action.payload)) {
				const newState = state.wishlist.filter(
					(productId) => productId !== action.payload,
				);
				state.wishlist = newState;
			} else {
				state.wishlist.push(action.payload);
			}
		},
	},
});

export const { login, logout, setWishList, addOrRemoveFromWishList, setToken } =
	userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectToken = (state) => state.user.token;
export const selectUserData = (state) => state.user;
export const selectWishList = (state) => state.user.wishlist;
export const selectUserId = (state) =>
	state.user.user ? state.user.user._id : null;
export const selectUserIfAdmin = (state) => {
	if (state.user.user && state.user.user.email === "admin") {
		return true;
	} else {
		return false;
	}
};

export default userSlice.reducer;
