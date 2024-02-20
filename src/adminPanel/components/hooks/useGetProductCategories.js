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

const useGetProductCategories = () => {
	const dispatch = useDispatch();
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					`${SERVER_URL}product/getallcategories`,
				);

				setCategories(response.data);
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

		fetchCategories();
	}, [dispatch]);

	return { categories };
};

export default useGetProductCategories;
