import axios from "axios";

import {
	DATA_STATE,
	SERVER_URL,
	NOTIFICATION_TYPES,
} from "../../helpers/app.constants";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

export const addOrRemoveFromWishListServer = (id, userId) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve) => {
		axios
			.post(`${SERVER_URL}product/addorremovefromwishlist`, {
				productId: id,
				userId: userId,
			})
			.then((response) => {
				const notificationPayload = {
					text: response.data.message,
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				resolve(response.data);
			})
			.catch(() => {
				const notificationPayload = {
					text: "Došlo je do greške!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const filterProductsByName = (filter) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/filterproductsbyname`, filter)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				const notificationPayload = {
					text: "Došlo je do greške!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};
