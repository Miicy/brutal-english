import React from "react";
import { ClickAwayListener } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { NOTIFICATION_TYPES, DATA_STATE } from "../../helpers/app.constants";
import {
	displayNotification,
	setDataState,
} from "../../store/reducers/notificationSlice";

function ProfileModal({ setIsProfileIconClicked }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//style
	const theme = useTheme();
	const centeringStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const ProfileModalContainer = {
		...centeringStyle,
		flexDirection: "column",
		width: "100%",
		height: "200px",
		justifyContent: "space-between",
		transition: "color 0.3s",
		color: theme.palette.white.main,
		padding: "10px",
	};

	const ProfileModalSignOutContainer = {
		width: "95%",
		cursor: "pointer",
		// backgroundColor: "green",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "10px",
	};

	//logout

	const handleSignOutClick = async () => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			await dispatch(logout());
			const notificationPayload = {
				text: "Uspešno ste se odjavili!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
		} catch (error) {
			const notificationPayload = {
				text: "Došlo je do greške pri odjavljivanju!",
				type: NOTIFICATION_TYPES.ERROR,
			};
			dispatch(displayNotification(notificationPayload));
		}
		dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
	};

	return (
		<ClickAwayListener onClickAway={() => setIsProfileIconClicked(false)}>
			<div style={ProfileModalContainer}>
			<div
					style={ProfileModalSignOutContainer}
					className="hover-style"
					onClick={()=> navigate("/profile")}
				>
					Profile
				</div>
			<div
					style={ProfileModalSignOutContainer}
					className="hover-style"
					onClick={()=> navigate("/wishlist")}
				>
					Whishlist
				</div>

				<div
					style={ProfileModalSignOutContainer}
					className="hover-style"
					onClick={()=> navigate("/orders")}
				>
					Order
				</div>
				<div
					style={ProfileModalSignOutContainer}
					className="hover-style"
					onClick={handleSignOutClick}
				>
					<LogoutIcon />
					Logout
				</div>
			</div>
		</ClickAwayListener>
	);
}

export default ProfileModal;
