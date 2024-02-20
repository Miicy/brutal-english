import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Button, Tooltip, useMediaQuery } from "@mui/material";

import {
	deleteOrder,
	dispatchFetchOrder,
	markOrderAsShipped,
} from "../adminPanel.actions";

import backgroundImage from "../../media/dumbbells-gym.jpg";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { displayNotification } from "../../store/reducers/notificationSlice";

export function applyDiscount(price, discountPercentage) {
	const discountAmount = (price * discountPercentage) / 100;
	const discountedPrice = price - discountAmount;
	return [discountedPrice, discountAmount];
}

const AdminPanelOrderDetails = () => {
	const theme = useTheme();
	const isScreenSmall= useMediaQuery('(max-width: 1400px)');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const [order, setOrder] = useState(null);

	useEffect(() => {
		if (id) {
			dispatch(dispatchFetchOrder(id)).then((data) => setOrder(data));
		}
	}, [id, dispatch]);

	const adminAddFormContainerStyles = {
		backgroundColor: "white",
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		overflow: "auto",
		borderBottomLeftRadius: "5px",
		borderBottomRightRadius: "5px",
	};

	const handleMarkOrderAsShipped = () => {
		if (!receiptNumber) {
			const errorPayload = {
				text: "Niste dodali broj računa!",
				type: NOTIFICATION_TYPES.ERROR,
			};
			dispatch(displayNotification(errorPayload));
			return;
		}
		dispatch(markOrderAsShipped(id, receiptNumber)).then(() => {
			const notificationPayload = {
				text: "Narudžbina obeležena kao poslata!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
			dispatch(dispatchFetchOrder(id)).then((data) => setOrder(data));
		});
	};

	const [receiptNumber, setReceiptNumber] = useState("");

	const handleReceiptNumberInputChange = (event) => {
		setReceiptNumber(event.target.value);
	};

	const handleDeleteOrder = () => {
		dispatch(deleteOrder(id)).then(() => {
			const notificationPayload = {
				text: "Narudžbina izbrisana",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
			navigate("/admin/admin-panel");
		});
	};

	if (!order) return null;

	return (
		isDesktop && (
			<div
				style={{
					width: "100%",
					height: "100vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					minWidth: "600px",
				}}
			>
				<div
					style={{
						height: "80%",
						width: "96%",
						marginTop: 60,
						backgroundColor: theme.palette.primaryLighter.opacity95,
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "center",
						borderRadius: "5px",
						color: theme.palette.white.main,
					}}
				>
					<div style={{ width: "97%" }}>
						<Breadcrumbs aria-label="breadcrumb">
							<p
								style={{ cursor: "pointer", color: "white" }}
								className="hover-style-link"
								onClick={() => navigate("/")}
							>
								Home Page
							</p>
							<p
								style={{ cursor: "pointer", color: "white" }}
								className="hover-style-link"
								onClick={() => navigate("/admin/admin-panel")}
							>
								Admin
							</p>

							<p style={{ fontWeight: "bold", color: "white" }}>
								Order details
							</p>
						</Breadcrumbs>
					</div>
					<div style={adminAddFormContainerStyles}>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: " 1fr 1fr  ",
								gridTemplateRows: "1fr",
								gap: "0px 0px",
								height: "100%",
								width: "100%",
								color: "black",
								minWidth: "1000px",
							}}
						>
							<div style={{ padding: "40px", fontSize: "1.1em" }}>
								<div
									style={{
										width: "100%",
										textAlign: "center",
										fontSize: "1.3em",
										fontWeight: "bold",
									}}
								>
									Podaci o kupcu
								</div>

								<div
									style={{
										width: "100%",
										height: "80%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-around",
										marginTop: "20px",
									}}
								>
									<div style={{ width: "90%", display: "flex" }}>
										Ime i Prezime:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.name}&nbsp;{order.lastName}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Ime Preduzeća:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.companyName === "" ? "/" : order.companyName}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Adresa:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.address}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Grad:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.zipCode} {order.city}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Telefon:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.phone}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Email:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.email}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Način plaćanja:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.paymentMethod}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Način dostave:
										<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
											{order.wayOfDelivery}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Napomena:
										<div
											style={{
												marginLeft: "5px",
												fontWeight: "bold",
												maxWidth: "80%",
											}}
										>
											{order.message}
										</div>
									</div>
									<div
										style={{
											width: "90%",
											marginTop: "20px",
											display: "flex",
										}}
									>
										Datum narudžbine:
										<div
											style={{
												marginLeft: "5px",
												fontWeight: "bold",
												maxWidth: "80%",
											}}
										>
											{new Date(order.timeCreated).toLocaleString("en-GB")}
										</div>
									</div>
								</div>
							</div>
							<div
								style={{
									padding: "40px",
									fontSize: "1.1em",
									height: "100%",
								}}
							>
								<div
									style={{
										textAlign: "center",
										fontSize: "1.3em",
										fontWeight: "bold",
									}}
								>
									Podaci o narudžbini
								</div>
								<div
									style={{
										width: isScreenSmall ? "90%" : "100%",
										height: "80%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										marginTop: "20px",
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											flexDirection: "column",
											height: "100%",
										}}
									>
										<div
											style={{
												marginTop: "40px",
												display: "flex",
												height: "100%",
												width: "100%",
											}}
										>
											Proizvodi:
											<div
												style={{
													marginLeft: "5px",
													fontWeight: "bold",
													height: "95%",
													width: "100%",
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between",
													border: "1px solid grey",
													overflowY: "auto",
													overflowX: "hidden",
													fontSize: isScreenSmall ? "0.8em" : "0.9em" 
												}}
											>
												<div>
													{order.products.map((product, index) => (
														<div key={index}>
															<div
																style={{
																	display: "flex",
																	width: "98%",
																	justifyContent: "space-between",
																	marginLeft: "5px",
																}}
															>
																<div
																	style={{
																		display: "flex",
																		justifyContent: "space-between",
																	}}
																>
																	<div style={{width:"30px", display:"flex"}}>x {product.count}</div>
																	<div
																		style={{
																			minWidth: "200px",
																			width: "fit-content",
																		}}
																	>
																		{product.product.title}{" "}
																	</div>
																	
																</div>
																<div>Ukus {" "}</div>
																<div
																	style={{
																		display: "flex",
																		flexDirection: "row",
																		justifyContent: "space-between",
																		width: "400px",
																	}}
																>
																	<div style={{
																		display: "flex",
																		flexDirection: "row",
																		justifyContent: "center",
																		width: "200px",
																	}}>
																		{product.product.price}
																		
																	</div>
																	<div
																		style={{ color: "red", marginLeft: "5px" }}
																	>
																		-
																		{
																			applyDiscount(
																				product.product.price,
																				product.product.discountAmount,
																			)[1]
																		}
																	</div>
																	<div style={{}}>
																		<div>
																			{
																				applyDiscount(
																					product.product.price,
																					product.product.discountAmount,
																				)[0]
																			}
																			
																		</div>{" "}
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
												<div
													style={{
														width: "99%",
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
														backgroundColor: "black",
														padding: "0 5px 0 5px",
													}}
												>
													<p style={{ color: "white" }}>Total price: </p>{" "}
													<p style={{ color: "green" }}>
														{order.totalPrice} €
													</p>
												</div>
											</div>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<div
												style={{
													display: "flex",
												}}
											>
												Status:
												<div style={{ marginLeft: "5px", fontWeight: "bold" }}>
													{order.shipped === true ? (
														<span style={{ color: "green" }}>POSLATO</span>
													) : (
														<span style={{ color: "red" }}>NA ČEKANJU</span>
													)}
												</div>
											</div>
											{order.shipped === false ? (
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
														width: "45%",
													}}
												>
													<div style={{ display: "flex" }}>
														<Tooltip title={"Račun mora imati broj"}>
															<div style={{ fontWeight: "bold", fontSize: isScreenSmall ? "0.7em" : "0.9em", width:"fit-content" }}>
																Račun broj:
															</div>
														</Tooltip>
														<input
															style={{ marginLeft: isScreenSmall ? "3px" :"5px", width: "40px" }}
															type="number"
															min="0"
															step="1"
															value={receiptNumber}
															onChange={handleReceiptNumberInputChange}
														/>
													</div>
													<Button
														variant="contained"
														style={{
															fontSize: isScreenSmall ? "0.6em" : "0.7em",
															width: "fit-content",
															cursor: "pointer",
														}}
														className="hover-style"
														disabled={receiptNumber === ""}
														onClick={() => handleMarkOrderAsShipped()}
													>
														Pošalji narudžbinu
													</Button>
												</div>
											) : (
												<Button
													variant="contained"
													style={{
														width: "fit-content",
														cursor: "pointer",
													}}
													className="hover-style"
													onClick={() => handleDeleteOrder()}
												>
													Izbriši narudžbinu
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AdminPanelOrderDetails;
