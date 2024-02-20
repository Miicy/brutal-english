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

const useGetOrder = (id) => {
	const dispatch = useDispatch();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchOrder = async () => {
			if (id)
				try {
					const response = await axios.post(`${SERVER_URL}admin/fetchorder`, {
						id,
					});
					setOrder(response.data);
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

		fetchOrder();
	}, [dispatch, id]);

	return order;
};

export default useGetOrder;
