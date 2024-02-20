import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { selectWishList } from "../../store/reducers/userSlice";
import { selectAllProducts } from "../../store/reducers/productSlice";

const useGetProductsFromWishlist = () => {
	const wishlist = useSelector(selectWishList);
	const products = useSelector(selectAllProducts);

	const [wishlistProducts, setWishlistProducts] = useState([]);

	useEffect(() => {
		if (wishlist && products) {
			const arrayOfProducts = wishlist.map((wishlistId) =>
				products.find((product) => product._id === wishlistId),
			);
			setWishlistProducts(arrayOfProducts);
		}
	}, [wishlist, products]);

	return wishlistProducts;
};

export default useGetProductsFromWishlist;
