export const getCategoryNameFromId = (categories, id) =>
	categories.find((category) => category._id === id).name;

export const getBrandNameFromId = (brands, id) =>
	brands.find((brand) => brand._id === id)?.name || "BEZ BRENDA";

export const getItemCountForCheckout = (items) => {
	let count = 0;
	items.forEach((item) => {
		count += item.count;
	});
	return count;
};
