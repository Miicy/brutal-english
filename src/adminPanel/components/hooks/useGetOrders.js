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

const useGetOrders = () => {
	const dispatch = useDispatch();
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchOrders = async () => {
			try {
				const response = await axios.get(`${SERVER_URL}admin/fetchallorders`);
				setOrders(response.data);
			} catch (error) {
				const notificationPayload = {
					text: "An error occurred!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			} finally {
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			}
		};

		fetchOrders();
	}, [dispatch]);

	return orders;
};

export default useGetOrders;
