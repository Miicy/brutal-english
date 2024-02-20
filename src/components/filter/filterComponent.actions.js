import axios from "axios";

import {
	SERVER_URL,
	DATA_STATE,
	NOTIFICATION_TYPES,
} from "../../helpers/app.constants";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";
export const filterProducts = (filter) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
  
	return new Promise((resolve, reject) => {
	  axios
		.post(`${SERVER_URL}product/filterproducts`, filter)
		.then((response) => {
		  const filteredProducts = response.data.products.filter(
			(product) => !product.outOfStock
		  );
		  resolve({ ...response.data, products: filteredProducts }); 
		})
		.catch((error) => {
		  const notificationPayload = {
			text: "Error occured!",
			type: NOTIFICATION_TYPES.ERROR,
		  };
		  dispatch(displayNotification(notificationPayload));
		  reject(error);
		})
		.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
  };
