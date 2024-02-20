import { useTheme } from "@emotion/react";
import Login from "../auth/Login";
import "../../App.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/reducers/userSlice";
import ProfileModal from "./ProfileModal";

function ModalLogin({ setIsProfileIconClicked }) {
	const theme = useTheme();
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const loginModalStyles = {
		position: "absolute",
		backgroundColor: theme.palette.primary.opacity96,
		width: isLoggedIn ? "200px" : "300px",
		height: "fit-content",
		overflowY: "auto",
		zIndex: 20,
		right: isLoggedIn ? 50 : 5,
		top: 80,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		animation: "appearAnimation 0.2s ease-in 0s 1 normal forwards",
		borderRadius: "5px",
		border: `1.5px solid  ${theme.palette.secondary.main}`,
	};

	return (
		<div style={loginModalStyles}>
			{isLoggedIn ? (
				<ProfileModal setIsProfileIconClicked={setIsProfileIconClicked} />
			) : (
				<Login
					width={"100%"}
					size={"small"}
					error={true}
					margin={"5px 0 5px 0"}
					setIsProfileIconClicked={setIsProfileIconClicked}
				/>
			)}
		</div>
	);
}

export default ModalLogin;
