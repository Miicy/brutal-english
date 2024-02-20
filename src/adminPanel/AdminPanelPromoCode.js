import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import { Button, useMediaQuery } from "@mui/material";

import {
	addPromoCodeAdmin,
	deletePromoCodeAdmin,
	fetchPromoCodesAdmin,
} from "./adminPanel.actions";

import { NOTIFICATION_TYPES } from "../helpers/app.constants";
import { displayNotification } from "../store/reducers/notificationSlice";

function AdminPanelPromoCode() {
	const dispatch = useDispatch();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");

	const [promoCodes, setPromoCodes] = useState([]);
	const [codeError, setCodeError] = useState(false);
	const [durationError, setDurationError] = useState(false);
	const [promoCode, setPromoCode] = useState({ code: "", duration: "" });

	useEffect(() => {
		dispatch(fetchPromoCodesAdmin()).then((data) => setPromoCodes(data));
	}, [dispatch]);

	const handleAddPromoCode = () => {
		if (promoCode.code === "") {
			setCodeError(true);
			return;
		} else if (promoCode.duration === "") {
			setDurationError(true);
			return;
		}
		const newCode = {
			code: promoCode.code,
			duration: promoCode.duration,
		};
		dispatch(addPromoCodeAdmin(newCode))
			.then(() => {
				const notificationPayload = {
					text: "Promo kod uspešno kreiran!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(fetchPromoCodesAdmin()).then((data) => setPromoCodes(data));
			})
			.catch((error) => {
				const notificationPayload = {
					text: error.response.data.error,
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
		setCodeError(false);
		setDurationError(false);
	};

	const handleDeletePromoCode = (code) => {
		dispatch(deletePromoCodeAdmin(code))
			.then(() => {
				const notificationPayload = {
					text: "Promo kod uspešno izbrisan!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(fetchPromoCodesAdmin()).then((data) => setPromoCodes(data));
			})
			.catch(() => {
				const notificationPayload = {
					text: "Došlo je do greške!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	return (
		<div
			style={{
				height: "100%",
				minHeight: "100vh",
				width: "83%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "white",
				padding: "15px 0px",
			}}
		>
			<div
				style={{
					gap: "5px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignContent: "center",
					flexWrap: "wrap",
					minHeight: "80vh",
					padding: "40px",
					width: "75%",
					border: "1px solid lightgrey",
					borderRadius: "5px",
					boxShadow: "0px 0px 16px 4px rgba(0,0,0,0.15)",
				}}
			>
				<div
					style={{
						marginTop:"30px",
						height: "15%",
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "50%",
							minWidth: "40%",
							marginRight: "10px",
						}}
					>
						<input
							type="text"
							value={promoCode.code}
							onChange={(e) => {
								setPromoCode({ ...promoCode, code: e.target.value });
								setCodeError(false);
							}}
							style={{
								width: "97%",
								marginRight: "10px",
								height: "45px",
								borderRadius: "5px",
								borderWidth: "0.5px",
								paddingLeft: "10px",
							}}
							placeholder="Add promo code"
						/>
						<div style={{ height: "20px" }}>
							{codeError && (
								<span
									style={{
										color: "red",
										fontSize: isScreenSmall ? "0.7em" : "0.9em",
									}}
								>
									You didn't add code
								</span>
							)}
						</div>
					</div>
					<div
						style={{
							minWidth: "25%",
							width: "40%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<input
							type="number"
							value={promoCode.duration}
							onChange={(e) => {
								setPromoCode({ ...promoCode, duration: e.target.value });
								setDurationError(false);
							}}
							style={{
								height: "45px",
								borderRadius: "5px",
								borderWidth: "0.5px",
								width: "97%",
								marginRight:"10px",
								paddingLeft:"10px",
							}}
							placeholder="Add code duration(days)"
						/>
						<div style={{ height: "20px" }}>
							{durationError && (
								<span
									style={{
										color: "red",
										fontSize: isScreenSmall ? "0.7em" : "0.9em",
									}}
								>
									You didn't add code duration
								</span>
							)}
						</div>
					</div>
					<div
						style={{
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: "20px",
						}}
					>
						<Button
							variant="contained"
							sx={{
								cursor: "pointer",
								width: "70px",
								marginLeft: "10px",
								height: "49px",
								fontSize: isScreenSmall
									? "0.75em"
									: isDesktop
									? "0.85em"
									: null,
							}}
							onClick={handleAddPromoCode}
							className="hover-style"
						>
							Add
						</Button>
					</div>
				</div>
				<div
					style={{
						border: "1px solid grey",
						borderRadius: "5px",
						minHeight: "40vh",
						height: "fit-content",
						color: "black",
						padding: "10px 0 10px 0",
						overflow: "auto",
					}}
				>
					{promoCodes.map((code, index) => (
						<div
							key={code.id || index}
							style={{
								marginLeft: "5px",
								height: "50px",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							{code.code}
							<div>
								{code.duration} day from:{" "}
								{new Date(code.timeCreated).toLocaleString("en-GB")}
							</div>
							<div
								style={{
									width: "30%",
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<Button
									variant="contained"
									color="grey"
									style={{
										width: "60px",
										height: "50%",
										cursor: "pointer",
										marginRight: "10px",
									}}
									onClick={() => handleDeletePromoCode(code.code)}
								>
									Delete
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default AdminPanelPromoCode;
