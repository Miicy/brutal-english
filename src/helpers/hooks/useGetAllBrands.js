import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

import { DATA_STATE, NOTIFICATION_TYPES, SERVER_URL } from "../app.constants";

const useGetAllBrands = () => {
	const dispatch = useDispatch();
	const [brands, setBrands] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchBrands = async () => {
			try {
				const response = await axios.get(`${SERVER_URL}product/getallbrands`);

				setBrands(response.data);
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

		fetchBrands();
	}, [dispatch]);

	return brands;
};

export default useGetAllBrands;
