import { createSlice } from "@reduxjs/toolkit";

import { DATA_STATE, NOTIFICATION_TYPES } from "../../helpers/app.constants";

const initialState = {
	dataState: DATA_STATE.DATA_STATE_OK,
	notificationText: "",
	notificationType: NOTIFICATION_TYPES.STANDARD,
	displayNotification: false,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setDataState: (state, action) => {
			state.dataState = action.payload;
		},
		displayNotification: (state, action) => {
			state.displayNotification = true;
			if (action.payload) {
				state.notificationText = action.payload.text
					? action.payload.text
					: null;
				state.notificationType = action.payload.type
					? action.payload.type
					: NOTIFICATION_TYPES.STANDARD;
			}
		},
		removeNotification: (state) => {
			state.displayNotification = false;
		},
		setNotificationText: (state, action) => {
			state.notificationText = action.payload;
		},
	},
});

export const {
	setDataState,
	removeNotification,
	displayNotification,
	setNotificationText,
} = notificationSlice.actions;

export const selectDataState = (state) => state.notification.dataState;
export const selectNotificationText = (state) =>
	state.notification.notificationText;
export const selectDisplayNotification = (state) =>
	state.notification.displayNotification;
export const selectNotificationType = (state) =>
	state.notification.notificationType;

export default notificationSlice.reducer;
