import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

import { SERVER_URL, DATA_STATE, NOTIFICATION_TYPES } from "../app.constants";

function useGetAllGalleryImages() {
	const dispatch = useDispatch();
	const [allImages, setAllImages] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${SERVER_URL}admin/getgalleryimages`);

				setAllImages(response.data);
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

		fetchUsers();
	}, [dispatch]);

	return allImages;
}

export default useGetAllGalleryImages;
