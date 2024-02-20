import { useTheme } from "@emotion/react";
import {
	Breadcrumbs,
	Checkbox,
	Divider,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import {
	selectIsLoggedIn,
	selectUserData,
} from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomField from "../other/CustomField";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import axios from "axios";
import CustomLoginButton from "../other/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

function CartCheckout() {
	const theme = useTheme();
	const navigate = useNavigate();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	const isLogged = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUserData);
	const dispatch = useDispatch();

	//import total price
	const { state } = useLocation();
	const items = state.items;
	const itemCount = state.itemCount;
	const totalPriceFinal = state.totalPriceFinal;
	const freeShipping = state.freeShipping;

	//scroll

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//styles

	const NotFoundPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		minHeight: "100vh",
		height: "fit-content",
		width: "95%",
		paddingTop: "3px",
		// padding: "25px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	const cartPageTitleStyles = {
		width: "95%",
		height: "3em",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridTemplateRows: "1fr",
		gap: "0px 0px",
		alignContent: "center",
		alignItems: "center",
		backgroundColor: theme.palette.primary.main,
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
		color: "white",
		fontSize: "0.7em",
		marginTop: "20px",
		borderRadius: "5px",
	};

	const formHeadlineStyles = {
		width: "100%%",
		display: "flex",
		justifyContent: "center",
		margin: isDesktop ? "20px 0 30px 0" : "10px 0 15px 0",
		fontWeight: "bold",
		backgroundColor: theme.palette.primary.main,
		color: "white",
		borderRadius: "5px",
		padding: "5px",
		fontSize: isScreenSmall
			? "0.7em"
			: isDesktop
			? "0.9em"
			: isMobile
			? "0.5em"
			: null,
	};

	const errorMessageStyles = {
		color: "red",
		fontSize: "0.6em",
		height: "20px",
		width: "100%",
		display: "flex",
		justifyContent: "center",
	};

	//formik

	// Validation schema using Yup
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email je obavezan")
			.matches(
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				"Nevažeći email format",
			),
		name: Yup.string().required("Ime je obavezno"),
		lastName: Yup.string().required("Prezime je obavezno"),
		phone: Yup.string()
			.required("Telefon je obavezan")
			.matches(/^\d{10}$|^\d{6}$|^\d{7}$/, "Nevažeći broj"),
		address: Yup.string().required("Adresa je obavezna"),
		zipCode: Yup.string()
			.required("Poštanski broj je obavezan")
			.matches(/^\d{5}$/, "Poštanski broj mora imati 5 cifara"),
		city: Yup.string().required("Grad je obavezan"),
		paymentMethod: Yup.string().required("Način plaćanja je obavezan"),
		wayOfDelivery: Yup.string().required("Način dostave je obavezan"),
		terms: Yup.boolean()
			.oneOf([true], "Prihvatite uslove korišćenja")
			.required("Prihvatite uslove korišćenja"),
	});

	const initialValues = {
		email: "",
		companyName: "",
		name: "",
		lastName: "",
		phone: "",
		address: "",
		zipCode: "",
		city: "",
		products: items.map((product) => {
			const itemObj = {
				count: product.count,
				productID: product.product._id,
				flavor: product.flavor,
			};
			return itemObj;
		}),
		paymentMethod: "",
		wayOfDelivery: "",
		message: "",
		totalPrice: totalPriceFinal,
		terms: "",
		userId: null,
	};

	if (isLogged) {
		initialValues.email = user.user.email;
		initialValues.companyName = user.user.companyName;
		initialValues.name = user.user.name;
		initialValues.lastName = user.user.lastName;
		initialValues.phone = user.user.phone;
		initialValues.address = user.user.address;
		initialValues.zipCode = user.user.zipCode;
		initialValues.city = user.user.city;
		initialValues.userId = user.user._id;
	}

	const handleSubmit = async (values, { setErrors }) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			await axios.post(`${SERVER_URL}order/createorder`, values);
			const notificationPayload = {
				text: "Uspešno ste poslali narudžbinu!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			navigate(`/`);
		} catch (error) {
			console.log(error);
			setErrors({});
			if (error.response && error.response.data.error) {
				const errorMessage = error.response.data.error;
				if (errorMessage === "Failed to create order!") {
					const notificationPayload = {
						text: "Došlo je do greške sa serverom",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				} else if (errorMessage === "Internal server error") {
					const notificationPayload = {
						text: "Došlo je do greške sa serverom!",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				}
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			}
		}
	};

	//acccount info expandable
	const [paymentMethodInfo, setPaymentMethodInfo] = useState(false);

	const handlePaymentMethodChange = (event) => {
		const optionValue = event.target.value;
		setPaymentMethodInfo(optionValue === "naRacun");
	};

	if (!user) return null;

	return (
		<div style={NotFoundPageContainer}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div
					style={{
						marginLeft: isMobile ? "5px" : "20px",
						display: isLogged && "flex",
						justifyContent: "space-between",
						height: "100%",
					}}
				>
					<Breadcrumbs
						aria-label="breadcrumb"
						sx={{
							fontSize: isMobile && "0.7em",
						}}
					>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/cart-page")}
						>
							Cart Overview
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}> Checkout</p>
					</Breadcrumbs>
					{isLogged && (
						<div
							style={{
								fontSize: "0.7em",
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								marginRight: "3%",
							}}
							className="hover-style-link"
							onClick={() => navigate("/profile")}
						>
							Change your info
						</div>
					)}
				</div>
			</div>
			<div
				style={{
					height: "90%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				<div style={cartPageTitleStyles}>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							marginLeft: "15px",
						}}
					>
						Product number: &#160; {itemCount}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginRight: "15px",
							fontSize: "1.2em",
						}}
					>
						Total:
						<div style={{ color: "green" }}>
							&#160; {state.totalPriceFinal}
						</div>
					</div>
				</div>
				{freeShipping ? (
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
							fontSize: "0.6em",
							fontWeight: "300",
							width: "94%",
						}}
					>
						<CheckIcon sx={{ color: "green" }} />
						free delivery
					</div>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
							fontSize: "0.6em",
							fontWeight: "300",
							width: "94%",
						}}
					>
						<AddIcon sx={{ color: "red" }} />
						delivery
					</div>
				)}

				<div
					style={{
						width: "100%",
						marginTop: "30px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div style={{ fontWeight: "400", width: isDesktop ? "35%" : "70%" }}>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							enableReinitialize={true}
						>
							{(formik) => (
								<Form>
									<div style={formHeadlineStyles}>Recipient of the Bill</div>
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "center",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<CustomField
											name="email"
											label="Email"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.email : undefined}
										/>

										<CustomField
											name="companyName"
											label="Company Name(Optional)"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.companyName : undefined}
										/>

										<CustomField
											name="name"
											label="Name"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.name : undefined}
										/>

										<CustomField
											name="lastName"
											label="Last Name"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.lastName : undefined}
										/>

										<CustomField
											name="phone"
											label="Phone"
											password={false}
											type={"number"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.phone : undefined}
										/>

										<CustomField
											name="address"
											label="Adress"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.address : undefined}
										/>

										<CustomField
											name="zipCode"
											label="Postal Code"
											password={false}
											type={"number"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.zipCode : undefined}
										/>

										<CustomField
											name="city"
											label="City"
											password={false}
											type={"text"}
											size={"small"}
											error={true}
											margin={"2px 0 2px 0"}
											width={"70%"}
											value={isLogged ? initialValues.city : undefined}
										/>
									</div>

									<TextField
										name="message"
										label="Message"
										multiline
										rows={4}
										error={formik.touched.message && formik.errors.message}
										helperText={formik.touched.message && formik.errors.message}
										margin="normal"
										fullWidth
										{...formik.getFieldProps("message")}
									/>
									<div style={formHeadlineStyles}>Way of Delivery</div>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											width: "100%",
										}}
									>
										<RadioGroup
											defaultValue="bex"
											name="wayOfDelivery"
											{...formik.getFieldProps("wayOfDelivery")}
											sx={{ width: "fit-content" }}
										>
											<FormControlLabel
												value="bex"
												control={<Radio />}
												label="Postal service"
											/>
											{/* <FormControlLabel
												value="post3"
												control={<Radio />}
												label="Other"
											/> */}
										</RadioGroup>
										<ErrorMessage
											name="wayOfDelivery"
											component="div"
											className="error"
										/>
									</div>
									<div style={formHeadlineStyles}>Payment</div>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											flexDirection: "column",
											width: "100%",
											alignItems: "center",
										}}
									>
										<RadioGroup
											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue="pouzecem"
											name="paymentMethod"
											{...formik.getFieldProps("paymentMethod")}
											sx={{ width: "fit-content" }}
										>
											<FormControlLabel
												value="pouzecem"
												control={<Radio />}
												label="Upon delivery"
												onClick={handlePaymentMethodChange}
											/>
											<FormControlLabel
												value="naRacun"
												control={<Radio />}
												label="Bank account"
												onClick={handlePaymentMethodChange}
											/>
										</RadioGroup>
										<ErrorMessage
											name="paymentMethod"
											component="div"
											className="error"
										/>
										{paymentMethodInfo && (
											<div
												style={{
													fontSize: isScreenSmall
														? "0.7em"
														: isDesktop
														? "0.8em"
														: null,
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "space-around",
													backgroundColor: theme.palette.primary.main,
													padding: "10px",
													color: "white",
													borderRadius: "5px",
												}}
											>
												<Divider orientation="horizontal" flexItem />
												<label style={{ margin: "10px 0 10px 0" }}>
												Invoice for payment:
												</label>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														alignItems: "flex-start",
														width: "100%",
														height: "60%",
														justifyContent: "space-around",
													}}
												>
													<div> - Bank Account: </div>
													<div
														style={{
															fontWeight: "700",
															margin: "10px 0 10px 0",
															width: "100%",
															textAlign: "center",
														}}
													>
														000-0000000000000-00
													</div>
													<div> - Bank Account 2: </div>
													<div
														style={{
															fontWeight: "700",
															margin: "10px 0 10px 0",
															width: "100%",
															textAlign: "center",
														}}
													>
														000-0000000000000-00
													</div>
													<Divider orientation="horizontal" flexItem />
													<div
														style={{
															fontWeight: "300",
															width: "100%",
															textAlign: "justify",
															margin: "10px 0 10px 0",
														}}
													>
														The goods will be shipped after payment to the account!
													</div>
												</div>
												<Divider orientation="horizontal" flexItem />
												{/* Add your input fields here */}
											</div>
										)}
									</div>
									<div style={formHeadlineStyles}>Terms and Conditions</div>

									<div
										style={{
											fontSize: "0.7em",
											display: "flex",
											// flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
											cursor: "pointer",
										}}
									>
										<Checkbox
											name="terms"
											checked={formik.values.terms || false}
											onChange={() =>
												formik.setFieldValue("terms", !formik.values.terms)
											}
											size="small"
											color="secondary"
										/>

										<div
											className="hover-style-link"
											onClick={() => navigate("/terms")}
											style={{
												fontSize: isScreenSmall
													? "0.8em"
													: isDesktop
													? "0.9em"
													: null,
											}}
										>
											I agree to with Terms and Conditions.
										</div>
									</div>
									<div style={errorMessageStyles}>
										<ErrorMessage
											name="terms"
											component="div"
											className="error"
										/>
									</div>

									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "center",
											margin: "30px 0 30px 0",
										}}
									>
										<CustomLoginButton
											disabled={
												!formik.values.email ||
												!formik.values.name ||
												!formik.values.lastName ||
												!formik.values.phone ||
												!formik.values.address ||
												!formik.values.zipCode ||
												!formik.values.city ||
												!formik.values.products ||
												!formik.values.paymentMethod ||
												!formik.values.wayOfDelivery ||
												!formik.values.terms ||
												!formik.values.totalPrice
											}
											onClick={formik.handleSubmit}
											textButton={"Complete purchase"}
										/>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartCheckout;
