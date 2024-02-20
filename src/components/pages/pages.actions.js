import axios from "axios";

import { DATA_STATE, SERVER_URL } from "../../helpers/app.constants";
import { setDataState } from "../../store/reducers/notificationSlice";

export const getPagetext = (page) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}admin/gettextpage`, { page })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const getUserOrders = (userId) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}order/fetchorders`, { userId })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const updateUserData = (values) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}user/updateuser`, values)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};
