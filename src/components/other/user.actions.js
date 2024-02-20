import axios from "axios";

import { DATA_STATE, SERVER_URL } from "../../helpers/app.constants";

import { setDataState } from "../../store/reducers/notificationSlice";

export const getPromoCode = (email) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}user/getpromocode`, { email })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const checkPromoCode = (code) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}user/checkpromocode`, { code })
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};
