import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		itemsCount: 0,
		items: [],
	},
	reducers: {
		incrementItemsCount(state) {
			state.itemsCount += 1;
		},
		addItemToCart(state, action) {
			const { product, selectedFlavor } = action.payload;
		
			const existingItemWithSameFlavor = state.items.find(
				(item) => item.product._id === product._id && item.flavor === selectedFlavor,
			);
		
			if (existingItemWithSameFlavor) {
				existingItemWithSameFlavor.count += 1;
			} else {
				state.items.push({ count: 1, product, flavor: selectedFlavor });
			}
		
			state.itemsCount += 1;
		},

		decrementItemsCount(state) {
			state.itemsCount -= 1;
			if (state.itemsCount < 0) {
				state.itemsCount = 0;
			}
		},
		removeItemsFromCart(state, action) {
			const itemToRemove = action.payload;
			const existingItem = state.items.find(
				(item) => item.product._id === itemToRemove._id,
			);

			if (existingItem) {
				// Item exists in the cart, decrease its count
				existingItem.count -= 1;
				if (existingItem.count === 0) {
					// If count reaches 0, remove the item from the cart
					state.items = state.items.filter(
						(item) => item.product._id !== itemToRemove._id,
					);
				}
				state.itemsCount -= 1;
				if (state.itemsCount < 0) {
					state.itemsCount = 0;
				}
			}
		},
	},
});

export const {
	incrementItemsCount,
	decrementItemsCount,
	addItemToCart,
	removeItemsFromCart,
} = cartSlice.actions;

export const selectItemsCount = (state) => {
	const items = state.cart.items;
	let count = 0;
	items.forEach((item) => {
		count += item.count;
	});
	return count;
};

export const selectTotalCartPrice = (state) => {
	const items = state.cart.items;
	let count = 0;
	items.forEach((item) => {
		count +=
			item.product.price * (1 - item.product.discountAmount / 100) * item.count;
	});
	return Math.ceil(count);
};

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
