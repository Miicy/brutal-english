import {
	Button,
	Dialog,
	TextField,
	Breadcrumbs,
	DialogTitle,
	DialogActions,
	DialogContent,
} from "@mui/material";

import { useFormik } from "formik";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

import {
	login,
	selectToken,
	selectUserData,
} from "../../store/reducers/userSlice";

import { updateUserData } from "./pages.actions";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { displayNotification } from "../../store/reducers/notificationSlice";

function Profile() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const user = useSelector(selectUserData);
	const token = useSelector(selectToken);
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//editState

	const initialValues = {
		name: user ? user.user.name : "",
		lastName: user ? user.user.lastName : "",
		companyName: user ? user.user.companyName : "",
		address: user ? user.user.address : "",
		city: user ? user.user.city : "",
		phone: user ? user.user.phone : "",
		email: user ? user.user.email : "",
		token: token ? token : null,
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			dispatch(updateUserData(values)).then((data) => {
				dispatch(login(data));
				const notificationPayload = {
					text: "Profile info saved!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				setEditDialogOpen(false);
			});
		},
	});

	const ProfilPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: isDesktop ? "100vh" :"90vh",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const ProfilBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};
	return (
		<div style={ProfilPageContainer}>
			<div style={ProfilBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb"
					sx={{
						fontSize: isMobile && "0.7em"
					}}>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>Profile</p>
					</Breadcrumbs>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					fontSize: isDesktop ? "1.3em" : "1em",
					fontWeight: "bold",
					marginBottom: "20px",
					display: "flex",
					justifyContent: "center",
					marginTop: isDesktop ? null : "40px",
				}}
			>
				Your information:
			</div>
			<div
				style={{
					height: isDesktop ? "85%" : "75%",
					width: "95%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
					backgroundColor: theme.palette.white.opacity50,
					marginTop: "15px",
					borderRadius: "5px",
				}}
			>
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						fontSize: isDesktop ? "1em" : "0.9em",
						overflow: "auto",
					}}
				>
					<div style={{ display: "flex" }}>
						<div
							style={{
								width: "30%",
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
								marginLeft: "2%",
								padding: "10px",
								fontWeight: "450",
							}}
						>
							<div style={{ marginBottom: "20px" }}>Name:</div>
							<div style={{ marginBottom: "20px" }}>Last Name:</div>
							<div style={{ marginBottom: "20px" }}>Company Name:</div>
							<div style={{ marginBottom: "20px" }}>Adress:</div>
							<div style={{ marginBottom: "20px" }}>City:</div>
							<div style={{ marginBottom: "20px" }}>Phone:</div>
							<div style={{ marginBottom: "20px" }}>Email:</div>
						</div>
						<div
							style={{
								width: "50%",
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
								marginLeft: "2%",
								padding: "10px",
								fontWeight: "600",
							}}
						>
							<div style={{ marginBottom: "20px" }}>{user.user.name}</div>
							<div style={{ marginBottom: "20px" }}>{user.user.lastName}</div>
							<div style={{ marginBottom: "20px" }}>
								{user.user.companyName === "" ? "/" : user.user.companyName}
							</div>
							<div style={{ marginBottom: "20px" }}>{user.user.address}</div>
							<div style={{ marginBottom: "20px" }}>
								{user.user.zipCode} {user.user.city}
							</div>
							<div style={{ marginBottom: "15px" }}>{user.user.phone}</div>
							<div
								style={{
									fontSize: isDesktop ? "1em" : "0.8em",
									marginBottom: "20px",
								}}
							>
								{user.user.email}
							</div>
						</div>
					</div>
					<div
						style={{
							marginTop: "50px",
							display: "flex",
							justifyContent: isDesktop ? "flex-start" : "center",
						}}
					>
						<Button
							variant="contained"
							style={{
								width: "fit-content",
								cursor: "pointer",
								marginLeft: isDesktop ? "40px" : null,
							}}
							className="hover-style"
							onClick={() => setEditDialogOpen(true)}
						>
							Change information
						</Button>
					</div>
				</div>
			</div>
			<Dialog
				maxWidth="xs"
				fullWidth
				open={editDialogOpen}
				onClose={() => setEditDialogOpen(false)}
			>
				<DialogTitle>Change information</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Ime"
						fullWidth
						variant="standard"
						value={formik.values.name}
						onChange={(e) => formik.setFieldValue("name", e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Prezime"
						fullWidth
						variant="standard"
						value={formik.values.lastName}
						onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Ime Preduzeća"
						fullWidth
						variant="standard"
						value={formik.values.companyName}
						onChange={(e) =>
							formik.setFieldValue("companyName", e.target.value)
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Adresa"
						fullWidth
						variant="standard"
						value={formik.values.address}
						onChange={(e) => formik.setFieldValue("address", e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Grad"
						fullWidth
						variant="standard"
						value={formik.values.city}
						onChange={(e) => formik.setFieldValue("city", e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Telefon"
						fullWidth
						variant="standard"
						value={formik.values.phone}
						onChange={(e) => formik.setFieldValue("phone", e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email"
						fullWidth
						variant="standard"
						value={formik.values.email}
						onChange={(e) => formik.setFieldValue("email", e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						color="customRed"
						onClick={() => {
							setEditDialogOpen(false);
							formik.resetForm();
						}}
					>
						Odustani
					</Button>
					<Button variant="contained" onClick={() => formik.submitForm()}>
						Sačuvaj
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Profile;
