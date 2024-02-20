import { Formik, Form } from "formik";
import { Breadcrumbs } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { isDesktop, isMobile } from "react-device-detect";
import CustomField from "../other/CustomField";
import CustomLoginButton from "../other/CustomButton";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../../helpers/app.constants";
import {
	displayNotification,
	setDataState,
} from "../../store/reducers/notificationSlice";
import "../../App.css";

function Register({ width, size, error, margin }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Validation schema using Yup
	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Username is required"),
		email: Yup.string()
			.required("Email is required")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Email format invalid",
			),
		password: Yup.string()
			.min(4, "Password must be longer than 4 characters!") 
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match!")
			.required("Confirm password!"),
		name: Yup.string().required("Name is required"),
		lastName: Yup.string().required("Surname required"),
		phone: Yup.string()
			.required("Telefon je obavezan")
			.matches(/^\d{10}$|^\d{6}$|^\d{7}$/, "Invalid number"),
		address: Yup.string().required("Adress required"),
		zipCode: Yup.string()
			.required("Postal code required")
			.matches(/^\d{5}$/, "Postal code must have 5 digits"),
		city: Yup.string().required("City is required"),
	});

	// Initial form values
	const initialValues = {
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		companyName: "",
		name: "",
		lastName: "",
		phone: "",
		address: "",
		zipCode: "",
		city: "",
	};

	const handleSubmit = async (values, { setErrors }) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			await axios.post(`${SERVER_URL}user/registeruser`, values);
			const notificationPayload = {
				text: "Register successful!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			navigate("/");
		} catch (error) {
			console.log(error);
			setErrors({});
			if (error.response && error.response.data.error) {
				const errorMessage = error.response.data.error;

				if (errorMessage.includes("Email is already registered")) {
					setErrors({
						email: "Email is already registered",
					});
				} else if (
					errorMessage.includes("Phone number is already registered")
				) {
					setErrors({
						phone: "Phone number is already registered",
					});
				} else if (errorMessage === "Internal server error") {
					const notificationPayload = {
						text: "Server error",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				}
			}
		}
		dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
	};

	//styles
	const theme = useTheme();

	const registerContainerStyles = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "fit-content",
		width: "95%",
		paddingTop: "3px",
		paddingBottom: "40px",
		// padding: "25px",
		borderRadius: "5px",
		backgroundColor: theme.palette.grey.darkerOpacity85,
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	const pStyles = {
		fontSize: isDesktop ? "1.5em" : "1.8em",
		color: "black",
	};

	const handleLinkClick = () => {
		navigate("/");
	};

	return (
		<div style={registerContainerStyles}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs
						aria-label="breadcrumb"
						sx={{
							fontSize: isMobile && "0.7em",
						}}
					>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={handleLinkClick}
						>
							Home Page
						</p>
						<p style={{ color: "black", fontWeight: "bold" }}>Register</p>
					</Breadcrumbs>
				</div>
			</div>
			<p style={pStyles}>Register</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formik) => (
					<Form>
						<CustomField
							name="username"
							label="Username"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="email"
							label="Email"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="password"
							label="Password"
							size={size}
							error={error}
							margin={margin}
							password={true}
							width={width}
							type={"password"}
						/>

						<CustomField
							name="confirmPassword"
							label="Confirm password"
							size={size}
							error={error}
							margin={margin}
							password={true}
							width={width}
							type={"password"}
						/>

						<CustomField
							name="companyName"
							label="Company name(optional)"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="name"
							label="Name"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="lastName"
							label="Last name"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="phone"
							label="Phone"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"number"}
						/>

						<CustomField
							name="address"
							label="Adress"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>

						<CustomField
							name="zipCode"
							label="Zip code"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"number"}
						/>

						<CustomField
							name="city"
							label="City"
							size={size}
							error={error}
							margin={margin}
							password={false}
							width={width}
							type={"text"}
						/>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								margin: "20px 0 20px 0",
							}}
						>
							<CustomLoginButton
								disabled={!formik.values.email || !formik.values.password}
								onClick={formik.handleSubmit}
								textButton={"Register"}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Register;
