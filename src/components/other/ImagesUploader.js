import { v4 } from "uuid";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

import {
	addImage,
	deleteGalleryImage,
	dispatchGetAllGalleryImages,
} from "../../adminPanel/adminPanel.actions";

import { STORAGE } from "../../firebase";
import { DATA_STATE, NOTIFICATION_TYPES } from "../../helpers/app.constants";

function ImagesUploader() {
	const dispatch = useDispatch();
	const [images, setImages] = useState([]);

	useEffect(() => {
		dispatch(dispatchGetAllGalleryImages()).then((data) => {
			const galleryImagesArray = data.galleryImages;
			setImages(galleryImagesArray);
		});
	}, [dispatch]);

	const getImageNameFromURL = (url) => {
		const start = url.lastIndexOf("%2F") + 3;
		const endJPG = url.lastIndexOf(".jpg");
		const endPNG = url.lastIndexOf(".png");
		const end = Math.max(endJPG, endPNG) + 4;
		const imageName = url.substring(start, end);
		return imageName;
	};

	const handleAddImage = async (event) => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		//dont add more than 5
		if (images.length >= 5) {
			const notificationPayload = {
				text: "Ne možete dodati više od 5 slika!",
				type: NOTIFICATION_TYPES.ERROR,
			};
			dispatch(displayNotification(notificationPayload));
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			return;
		}
		//get file, generate string
		const file = event.target.files[0];
		const fileName = file.name;
		const imageString = `${fileName}-${v4()}`;
		// const imageString = v4();
		//save to firebase, get name
		try {
			const storageRef = ref(STORAGE, `images/${imageString}`);
			await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(storageRef);
			const name = getImageNameFromURL(imageString);
			//save to backend
			dispatch(addImage(name, downloadURL))
				.then(() => {
					dispatch(dispatchGetAllGalleryImages()).then((data) => {
						const galleryImagesArray = data.galleryImages;
						setImages(galleryImagesArray);
					});
					const notificationPayload = {
						text: "Image added!",
						type: NOTIFICATION_TYPES.SUCCESS,
					};
					dispatch(displayNotification(notificationPayload));
				})
				.catch((error) => {
					const notificationPayload = {
						text: error.response.data.error,
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				});
		} catch (error) {
			console.error("Error while uploading image:", error);
		}
		event.target.value = null;
	};

	const handleDeleteImage = (image) => {
		dispatch(deleteGalleryImage(image._id))
			.then(() => {
				const notificationPayload = {
					text: "Image deleted",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));

				dispatch(dispatchGetAllGalleryImages()).then((data) => {
					const galleryImagesArray = data.galleryImages;
					setImages(galleryImagesArray);
				});
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error while deleting image!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",

			}}
		>
			<div style={{ minHeight:"60vh", }}>
				{images.map((image, index) => (
					<div
						key={index}
						style={{
							height: "90px",
							borderBottom: "1px solid grey",
							padding: "7px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							
						}}
					>
						<img
							src={image.imageURL}
							alt={`Uploaded ${index}`}
							style={{ width: "110px", height: "98%" }}
						/>
						<p style={{ color: "black" }}>{image.name}</p>
						<Button
							variant="contained"
							component="label"
							sx={{ height: "40px", width: "100px" }}
							onClick={() => handleDeleteImage(image)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
				}}
			>
				<Button
					sx={{ width: "100%", borderRadius: "0", marginBottom:"0px" }}
					variant="contained"
					component="label"
				>
					<input
						hidden
						accept="image/*"
						type="file"
						multiple={false}
						onChange={(e) => handleAddImage(e)}
					/>
					Add image
				</Button>
			</div>
		</div>
	);
}

export default ImagesUploader;
