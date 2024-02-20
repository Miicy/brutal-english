import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, logout } from "../../../store/reducers/userSlice";
import { NOTIFICATION_TYPES, DATA_STATE } from "../../../helpers/app.constants";
import {
	displayNotification,
	setDataState,
} from "../../../store/reducers/notificationSlice";
import FilterComponentMainPage from "../../filter/FilterComponentMainPage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "../../auth/Login";

function MenuPageMobile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLogged = useSelector(selectIsLoggedIn);
	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//style
	const theme = useTheme();

	const centeringStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	};
	const MenuPageMobileContainerStyles = {
		...centeringStyle,
		backgroundColor: theme.palette.primary.main,
		height: "85vh",
		width: "100%",
		zIndex: 5,
		justifyContent: "flex-start",
		overflowY: "auto",
		overflowX: "hidden",
	};

	const MenuPageMobileBotContainer = {
		...centeringStyle,
		height: "fit-content",
		width: "100%",
		color: theme.palette.white.main,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: theme.palette.primary.main,
	};

	const MenuPageMobileFilterContainer = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: "15px 15px 15px ",
		fontSize: "1.5em",
		width: "90%",
	};

	//hadleClicks
	const loggedIn = useSelector(selectIsLoggedIn);

	const [expandFilters, setexpandFilters] = useState(false);
	const [expandLogin, setExpandLogin] = useState(false);

	const handleExpandFilterClick = () => {
		setexpandFilters(!expandFilters);
	};
	const handleExpandClickLogin = () => {
		setExpandLogin(!expandLogin);
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
		isMobile && (
			<div style={MenuPageMobileContainerStyles}>
				<div
					style={{
						...MenuPageMobileBotContainer,
						borderBottom: expandLogin
							? `1.5px solid ${theme.palette.white.main}`
							: `1.5px solid ${theme.palette.white.opacity20}`,
						marginTop: 55,
					}}
				>
					<div
						style={MenuPageMobileFilterContainer}
						onClick={handleExpandClickLogin}
					>
						{loggedIn ? " Profile" : "Login"}
						{expandLogin ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{isLogged
					? expandLogin && (
							<div
								style={{
									color: "white",
									backgroundColor:
										isMobile && theme.palette.primaryLighter.main,
									width: "100%",
									fontSize: "1.3em",
									fontWeight: "600",
								}}
							>
								<div
									style={{
										height: "70px",
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										marginLeft: "20px",
									}}
									onClick={()=>navigate("/profile")}
								>
									Profil
								</div>
								<div
									style={{
										height: "70px",
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										marginLeft: "20px",
									}}
									onClick={()=>navigate("/orders")}
								>
									Narudžbine
								</div>
								
								<div
									style={{
										height: "70px",
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										marginLeft: "20px",
									}}
									onClick={handleSignOutClick}
								>
									<LogoutIcon sx={{marginRight:"4px"}}/>
									Odjavi se
								</div>
							</div>
					  )
					: expandLogin && <Login />}
				<div
					style={{
						...MenuPageMobileBotContainer,
						borderTop: expandLogin
							? `1.5px solid ${theme.palette.white.main}`
							: null,
						borderBottom: expandFilters
							? `1.5px solid ${theme.palette.white.main}`
							: `1.5px solid ${theme.palette.white.opacity20}`,
					}}
				>
					<div
						style={MenuPageMobileFilterContainer}
						onClick={handleExpandFilterClick}
					>
						Filteri
						{expandFilters ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{expandFilters && <FilterComponentMainPage />}
			</div>
		)
	);
}

export default MenuPageMobile;
