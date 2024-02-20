import { useTheme } from "@emotion/react";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { selectUserIfAdmin } from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../../helpers/app.constants";
import {
	displayNotification,
	setDataState,
} from "../../store/reducers/notificationSlice";
import axios from "axios";
import CustomLoginButton from "../other/CustomButton";
import { getPagetext } from "./pages.actions";
import { PAGE_NAMES } from "./pages.constants";

function PaymentMethods() {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAdmin = useSelector(selectUserIfAdmin);

	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//text
	const [content, setContent] = useState("");

	const handleContentChange = (value) => {
		setContent(value);
	};

	useEffect(() => {
		dispatch(getPagetext(PAGE_NAMES.paymentMethod)).then((response) => {
			setContent(response.textPage.text);
		});
	}, [dispatch]);

	//admin

	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	useEffect(() => {
		setIsAdminLoggedIn(isAdmin);
	}, [isAdmin]);

	const handleSaveContent = async () => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		if (isAdminLoggedIn) {
			await axios
				.post(`${SERVER_URL}admin/createtextpage`, {
					page: PAGE_NAMES.paymentMethod,
					text: content,
				})
				.then((response) => {
					setContent(response.data.textPage.text);
					const notificationPayload = {
						text: "Uspešno ste sačuvali text!",
						type: NOTIFICATION_TYPES.SUCCESS,
					};
					dispatch(displayNotification(notificationPayload));
					dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				})
				.catch(() => {
					const notificationPayload = {
						text: "Došlo je do greške sa serverom!",
						type: NOTIFICATION_TYPES.ERROR,
					};
					dispatch(displayNotification(notificationPayload));
				})
				.finally(() => dispatch(setDataState(DATA_STATE.DATA_STATE_OK)));
		}
	};

	//qill

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["link"],
		],
	};

	const PaymentMethodPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		minHeight: isMobile && "70vh",
		height: "fit-content",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isScreenSmall
			? "0.8em"
			: isDesktop
			? "0.95em"
			: isMobile
			? "0.7em"
			: null,
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
		minWidth: isDesktop && "600px",
		paddingBottom: "20px",
	};

	const PaymentMethodBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};
	return (
		<div style={PaymentMethodPageContainer}>
			<div style={PaymentMethodBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb">
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>Way of payment</p>
					</Breadcrumbs>
				</div>
			</div>
			<div
				style={{
					height: "5%",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					fontSize: "1.4em",
					marginBottom: isMobile && "10px",
				}}
			>
				Way of payment
			</div>
			{isAdminLoggedIn && (
				<div
					style={{
						height: "30px",
						display: "flex",
						width: "95%",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<CustomLoginButton
						onClick={handleSaveContent}
						textButton={"Sačuvaj tekst"}
					/>
				</div>
			)}

			<div
				style={{
					width: "95%",
					display: "flex",
					backgroundColor: theme.palette.white.opacity50,
					border: `1px solid ${theme.palette.grey.main}`,
					borderRadius: "5px",
					fontWeight: "400",
					fontSize: "1em",
					padding: isDesktop && "0 10px 0 10px",
					marginTop: "20px",
					marginBottom: isMobile && "10px",
					height: "fit-content",
				}}
			>
				{isAdminLoggedIn ? (
					<div
						style={{ minHeight: "60vh", height: "fit-content", width: "100%" }}
					>
						<ReactQuill
							style={{
								minHeight: "80vh",
								height: "91%",
								width: "100%",
								color: "black",
							}}
							value={content}
							onChange={handleContentChange}
							modules={modules}
							formats={[
								"header",
								"bold",
								"italic",
								"underline",
								"strike",
								"list",
								"bullet",
								"align",
								"link",
							]}
						/>
					</div>
				) : (
					<div
						style={{ minHeight: "70vh", height: "fit-content", width: "100%" }}
						dangerouslySetInnerHTML={{ __html: content }}
					></div>
				)}
			</div>
		</div>
	);
}

export default PaymentMethods;
