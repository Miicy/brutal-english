import axios from "axios";

import {
	SERVER_URL,
	DATA_STATE,
	NOTIFICATION_TYPES,
} from "../helpers/app.constants";

import {
	setDataState,
	displayNotification,
} from "../store/reducers/notificationSlice";

export const addProduct = (product) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve) => {
		axios
			.post(`${SERVER_URL}product/addproduct`, product)
			.then(() => {
				const notificationPayload = {
					text: "Product added!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				resolve();
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error occured!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const editProduct =
	(productId, updatedProductData) => async (dispatch) => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		axios
			.put(`${SERVER_URL}product/editproduct`, {
				productId,
				updatedProductData,
			})
			.then(() => {
				const notificationPayload = {
					text: "Product updated!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error occured!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	};

export const getProduct = (id) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/getproduct`, { id })
			.then((response) => {
				resolve(response.data);
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

export const deleteProduct = (id) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/removeproduct`, { productId: id })
			.then((response) => {
				const notificationPayload = {
					text: "Product deleted!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				resolve(response.data);
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

export const deleteProductImage = (id, field) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/removeproductimage`, {
				id: id,
				imageType: field,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const editBrandName = (brandId, newName) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/editbrand`, { brandId, newName })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const editCategoryName = (categoryId, newName) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/editcategory`, { categoryId, newName })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const dispatchGetAllBrands = () => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.get(`${SERVER_URL}product/getallbrands`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const dispatchGetAllCategories = () => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.get(`${SERVER_URL}product/getallcategories`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const addBrand = (name) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/addbrand`, { name })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const deleteBrand = (brandId) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/deletebrand`, { brandId })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const addCategory = (name) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/addcategory`, { name })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const deleteCategory = (categoryId) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/deletecategory`, { categoryId })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const markOrderAsShipped =
	(orderId, receiptNumber) => async (dispatch) => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		return new Promise((resolve, reject) => {
			axios
				.post(`${SERVER_URL}admin/setorderasshipped`, {
					orderId,
					receiptNumber,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				})
				.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
		});
	};

export const dispatchFetchOrder = (id) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}admin/fetchorder`, {
				id,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const deleteOrder = (id) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}order/deleteorder`, {
				orderId: id,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const addPromoCodeAdmin = (newCode) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}user/createpromocodeadmin`, {
				code: newCode.code,
				duration: newCode.duration,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const fetchPromoCodesAdmin = () => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.get(`${SERVER_URL}user/fetchpromocodesadmin`)
			.then((response) => {
				resolve(response.data.promoCodes);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const deletePromoCodeAdmin = (code) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}user/deletepromocodeadmin`, {
				code,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const updateProductStock = (productId, outOfStock) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}product/updateproductstock`, {
				productId,
				outOfStock,
			})
			.then((response) => {
				resolve(response.data.message);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const dispatchGetAllGalleryImages = () => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.get(`${SERVER_URL}admin/getgalleryimages`)
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const addImage = (name, imageURL) => async (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}admin/addgalleryimage`, { name, imageURL })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};

export const deleteGalleryImage = (id) => (dispatch) => {
	dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

	return new Promise((resolve, reject) => {
		axios
			.post(`${SERVER_URL}admin/deletegalleryimage`, { imageId: id })
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
	});
};
