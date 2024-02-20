import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allProducts: [],
	discountProducts: [],
	newProducts: [],
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setAllProducts: (state, action) => {
			state.allProducts = action.payload;
		},
		sortAllProducts: (state, action) => {
			state.allProducts = action.payload;
			state.discountProducts = action.payload.filter(
				(product) => product.discountAmount > 0,
			);
			state.newProducts = action.payload.filter(
				(product) => product.newProduct,
			);
		},
	},
});

export const { setAllProducts, sortAllProducts } = productSlice.actions;

export const selectAllProducts = (state) => state.product.allProducts;
export const selectNewProducts = (state) => state.product.newProducts;
export const selectDiscountProducts = (state) => state.product.discountProducts;
export const selectProductById = (state, productId) => {
	return state.product.allProducts.find((product) => product._id === productId);
};

export default productSlice.reducer;
