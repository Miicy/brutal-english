import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../../helpers/app.constants";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import CustomField from "../other/CustomField";
import { useTheme } from "@emotion/react";
import CustomLoginButton from "../other/CustomButton";
import {
	displayNotification,
	setDataState,
} from "../../store/reducers/notificationSlice";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/material";
import { isDesktop, isMobile } from "react-device-detect";

function Login({
	width,
	size,
	error,
	margin,
	setIsProfileIconClicked,
	isAdmin = false,
}) {
	const dispatch = useDispatch();

	//navigate
	const navigate = useNavigate();

	const hadleClickRegister = () => {
		navigate("/register");
	};

	// Validation schema using Yup
	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Nevažeći email").required("Email je obavezan"),
		password: Yup.string()
			// .min(4, "Lozinka mora biti duža od 4 karaktera!")
			.required("Lozinka je obavezna"),
	});

	//login
	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values, { setErrors }) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			let response;
			if (!isAdmin) {
				response = await axios.post(`${SERVER_URL}user/login`, values);
			} else {
				response = await axios.post(`${SERVER_URL}user/loginadmin`, values);
			}
			const token = response.data;
			dispatch(setToken(token));
			try {
				let userResponse;

				if (!isAdmin) {
					userResponse = await axios.post(
						`${SERVER_URL}user/getuserdata`,
						token,
					);
				} else {
					userResponse = await axios.post(
						`${SERVER_URL}user/getadminuserdata`,
						token,
					);
				}

				dispatch(login(userResponse.data));
				const notificationPayload = {
					text: "Login successful!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				if (isMobile) {
					navigate("/");
				}
				if (isAdmin) {
					navigate("/admin/admin-panel");
				}
			} catch (error) {
				if (error.response && error.response.data.error === "Invalid token") {
					const notificationPayload = {
						text: "Server error!",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				}
			}
		} catch (error) {
			if (error.response && error.response.data.error === "User not found") {
				setErrors({
					email: "User not found",
				});
			} else if (
				error.response &&
				error.response.data.error === "Invalid password"
			) {
				setErrors({
					password: "Netačna lozinka",
				});
			} else if (
				error.response &&
				error.response.data.error === "Internal server error"
			) {
				const notificationPayload = {
					text: "Server error!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			}
		}
		dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
	};

	//styles

	const theme = useTheme();

	const centeringStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const pStyles = {
		fontSize: isDesktop ? "1.2em" : "2em",
		color: isAdmin ? "black" : theme.palette.white.main,
		width: isDesktop ? "100%" : "fit-content",
		marginLeft: !isAdmin && "5px",
		display: isAdmin && "flex",
		justifyContent: isAdmin && "center",
		fontWeight: isAdmin ? "bold" : null,
	};

	const loginContainer = {
		...centeringStyle,
		flexDirection: "column",
		width: "100%",
		height: isDesktop ? "100%" : "fit-content",
		padding: isDesktop ? "5px" : "40px",
		backgroundColor: isMobile && theme.palette.primaryLighter.main,
	};

	const closeIconStyles = {
		color: theme.palette.white.main,
		transition: "color 0.3s",
		cursor: "pointer",
		":hover": {
			color: theme.palette.secondary.main,
		},
	};

	const registerSuggestionStyles = {
		...closeIconStyles,
		fontSize: "0.75em",
		margin: "20px 0 10px 0",
		color: theme.palette.white.main,
		transition: "color 0.3s",
		cursor: "pointer",
		textDecoration: "underline",
	};

	const loginTitleCloseStyles = {
		...centeringStyle,
		width: isDesktop ? "95%" : "85%",
		margin: "5px 0 30px 0",
		justifyContent: isDesktop ? "space-between" : "center",
	};

	return isDesktop ? (
		<ClickAwayListener
			onClickAway={() => {
				!isAdmin && setIsProfileIconClicked(false);
			}}
		>
			<div style={loginContainer}>
				<div style={loginTitleCloseStyles}>
					<div style={pStyles}>{isAdmin ? "Admin Login" : "Login"}</div>
					{!isAdmin && (
						<CloseIcon
							onClick={() => setIsProfileIconClicked(false)}
							sx={closeIconStyles}
						/>
					)}
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={isAdmin === true ? null : validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik) => (
						<Form>
							<CustomField
								name="email"
								label="Email"
								size={size}
								error={error}
								margin={margin}
								password={false}
								width={width}
							/>
							<CustomField
								name="password"
								label="Password"
								size={size}
								error={error}
								margin={margin}
								password={true}
							/>
							<div style={centeringStyle}>
								<CustomLoginButton
									disabled={!formik.values.email || !formik.values.password}
									onClick={formik.handleSubmit}
									isAdmin={isAdmin}
								/>
							</div>
						</Form>
					)}
				</Formik>
				{!isAdmin && (
					<div
						style={registerSuggestionStyles}
						className="hover-style"
						onClick={hadleClickRegister}
					>
						You don't have an account? Register.
					</div>
				)}
			</div>
		</ClickAwayListener>
	) : (
		<div style={loginContainer}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formik) => (
					<Form style={{ width: "60%" }}>
						<CustomField
							name="email"
							label="Email"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							sx={{ paddingBottom: "30px" }}
						/>
						<CustomField
							name="password"
							label="Password"
							size={size}
							error={error}
							margin={margin}
							password={true}
							sx={{ paddingBottom: "30px" }}
						/>
						<div style={centeringStyle}>
							<CustomLoginButton
								disabled={!formik.values.email || !formik.values.password}
								onClick={formik.handleSubmit}
							/>
						</div>
					</Form>
				)}
			</Formik>
			<div
				style={registerSuggestionStyles}
				className="hover-style"
				onClick={hadleClickRegister}
			>
				You don't have an account? Register.
			</div>
		</div>
	);
}
export default Login;
