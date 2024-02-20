import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
	setDataState,
	displayNotification,
} from "../../../store/reducers/notificationSlice";

import {
	SERVER_URL,
	DATA_STATE,
	NOTIFICATION_TYPES,
} from "../../../helpers/app.constants";

const useGetProducts = (order) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchProducts = async () => {
			if (order) {
				try {
					const response = await axios.post(
						`${SERVER_URL}product/getproducts`,
						{
							ids: order.products.map((product) => product.productID),
						},
					);
					setProducts(response.data.products);
				} catch (error) {
					const notificationPayload = {
						text: "An error occurred!",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				} finally {
					dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				}
			}
		};

		fetchProducts();
	}, [dispatch, order]);

	return products;
};

export default useGetProducts;
