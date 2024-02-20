import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

import { SERVER_URL, DATA_STATE, NOTIFICATION_TYPES } from "../app.constants";
import { setAllProducts } from "../../store/reducers/productSlice";

const useGetAllProducts = (discount) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchAllProducts = async () => {
			try {
				if (discount) {
					const response = await axios.get(
						`${SERVER_URL}product/getalldiscountproducts`,
					);
					setProducts(response.data.products);
				} else {
					const response = await axios.get(
						`${SERVER_URL}product/getallproducts`,
					);
					setProducts(response.data.products);
					dispatch(setAllProducts(response.data.products));
				}
			} catch (error) {
				const notificationPayload = {
					text: "Došlo je do greške!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			} finally {
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			}
		};

		fetchAllProducts();
	}, [dispatch, discount]);

	return products;
};

export default useGetAllProducts;
