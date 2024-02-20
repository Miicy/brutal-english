import React from "react";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";

import {
	removeNotification,
	selectNotificationText,
	selectNotificationType,
	selectDisplayNotification,
} from "../../store/reducers/notificationSlice";

import { NOTIFICATION_TYPES } from "../../helpers/app.constants";

function TransitionUp(props) {
	return <Slide {...props} direction="up" />;
}

function NotificationContainer() {
	const dispatch = useDispatch();
	const displayNotification = useSelector(selectDisplayNotification);
	const notificationText = useSelector(selectNotificationText);
	const notificationType = useSelector(selectNotificationType);

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(removeNotification());
	};

	const handleAlertType = (notificationType) => {
		switch (notificationType) {
			case NOTIFICATION_TYPES.STANDARD:
				return "info";
			case NOTIFICATION_TYPES.SUCCESS:
				return "success";
			case NOTIFICATION_TYPES.ERROR:
				return "error";
			default:
				return "info";
		}
	};

	return (
		<div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100wh"}}>
			<Snackbar
				open={displayNotification}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
				TransitionComponent={TransitionUp}
			>
				<Alert
					onClose={handleClose}
					severity={handleAlertType(notificationType)}
					sx={{ width: "100%" }}
				>
					{notificationText}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default NotificationContainer;
