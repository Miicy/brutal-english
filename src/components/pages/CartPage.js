import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import CheckIcon from "@mui/icons-material/Check";
import { Breadcrumbs, Button, Tooltip, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import {
	selectItems,
	addItemToCart,
	removeItemsFromCart,
	selectTotalCartPrice,
} from "../../store/reducers/cartSlice";

import { applyDiscount } from "../other/ProductContainer";
import {
	getBrandNameFromId,
	getItemCountForCheckout,
} from "../../helpers/functions";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import useGetAllBrands from "../../helpers/hooks/useGetAllBrands";
import { displayNotification } from "../../store/reducers/notificationSlice";
import CustomLoginButton from "../other/CustomButton";
import { checkPromoCode } from "../other/user.actions";

function CartPage() {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const brands = useGetAllBrands();
	const items = useSelector(selectItems);
	const totalPrice = useSelector(selectTotalCartPrice);

	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//pdv
	// const pdvPrice = Math.ceil(totalPrice * 0.2);

	//freeshipping
	const [freeShipping, setFreeShipping] = useState(false);

	useEffect(() => {
		const checkFreeShipping = () => {
			if (totalPrice > 6000) {
				setFreeShipping(true);
			} else {
				setFreeShipping(false);
			}
		};

		checkFreeShipping();
	}, [totalPrice, freeShipping]);

	//promo code

	const [promoCode, setPromoCode] = useState(false);
	const [promoCodeText, setPromoCodeText] = useState("");

	//finalprice

	let totalPriceFinal;
	let discountAmount;

	if (promoCode) {
		totalPriceFinal = Math.ceil(totalPrice * 0.9);
		discountAmount = Math.ceil(totalPrice * 0.1);
	} else {
		totalPriceFinal = totalPrice;
	}

	//cart handlers

	const addToCartHandler = (item) => {
		dispatch(addItemToCart(item));
		const notificationPayload = {
			text: `${item.title} added to cart!`,
			type: NOTIFICATION_TYPES.SUCCESS,
		};
		dispatch(displayNotification(notificationPayload));
	};

	const removeFromCartHandler = (item) => {
		dispatch(removeItemsFromCart(item));
		const notificationPayload = {
			text: `${item.title} removed from cart!`,
			type: NOTIFICATION_TYPES.SUCCESS,
		};
		dispatch(displayNotification(notificationPayload));
	};

	const handlePromoCode = () => {
		dispatch(checkPromoCode(promoCodeText))
			.then(() => {
				const notificationPayload = {
					text: "Promo code applied!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				setPromoCode(true);
			})
			.catch((error) => {
				const notificationPayload = {
					text: error.response.data.error,
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	//styles

	const cartPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: isDesktop ? "100vh" : "130vh",
		width: isDesktop ? "95%" : "100%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
		minWidth: isDesktop ? "850px" : "auto",
		minHeight: isDesktop ? "800px" : "auto",
	};

	const cartPageBreadcrumbsContainerStyles = {
		marginTop: "10px",
		height: "4%",
		width: "97%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const cartPageProductsContainerStyles = {
		height: "100%",
		width: "100%",
		display: "flex",
		paddingTop: "20px",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	};

	const cartPageProductsStyles = {
		height: "65%",
		width: isDesktop ? "95%" : "97%",
	};
	const cartModalContainerStyles = {
		backgroundColor: theme.palette.primaryLighter.opacity80,
		height: isDesktop ? "100%" : "500px",
		width: "100%",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		color: theme.palette.white.main,
		fontSize: isScreenSmall
			? "0.7em"
			: isDesktop
			? "0.9em"
			: isMobile
			? "0.5em"
			: null,
	};

	const cartProductContainerStyles = {
		// backgroundColor: theme.palette.primaryLighter.opacity60,
		height: "70px",
		display: "flex",
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
	};

	const cartProductAddRemoveStyles = {
		height: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		color: theme.palette.white.main,
		width: "100%",
	};

	const cartPageTitleStyles = {
		width: "100%",
		height: isDesktop ? "10%" : "7%",
		display: "grid",
		gridTemplateColumns: "0.2fr 0.5fr 1fr 1fr 1fr 1fr 0.3fr 1fr 0.5fr",
		gridTemplateRows: "1fr",
		gap: "0px 0px",
		alignContent: "center",
		alignItems: "center",
		borderTopLeftRadius: "5px",
		borderTopRightRadius: "5px",
		backgroundColor: theme.palette.primary.main,
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
		color: "white",
		fontSize: isScreenSmall
			? "0.5em"
			: isDesktop
			? "0.7em"
			: isMobile
			? "0.4em"
			: null,
	};

	const cartPageTitleBottomStyles = {
		...cartPageTitleStyles,
		borderTopLeftRadius: "0",
		borderTopRightRadius: "0",
		borderBottomLeftRadius: "5px",
		borderBottomRightRadius: "5px",
		display: isDesktop ? "grid" : "flex",
		gridTemplateColumns: isDesktop && "1fr 1fr",
		gridTemplateRows: isDesktop && "1fr",
		gap: isDesktop && "0px 0px",
		flexDirection: isMobile && "column",
		fontSize: "1em",
		borderTop: `1px solid ${theme.palette.grey.opacity70}`,
		height: isDesktop ? "20%" : "fit-content",
		padding: "10px 0 10px 0",
	};

	if (!brands) return null;
	return (
		<div style={cartPageContainer}>
			<div style={cartPageBreadcrumbsContainerStyles}>
				<div>
					<Breadcrumbs aria-label="breadcrumb">
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>Cart overview</p>
					</Breadcrumbs>
				</div>
			</div>
			<div style={cartPageProductsContainerStyles}>
				<div style={cartPageProductsStyles}>
					<div style={cartPageTitleStyles}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginLeft: isMobile && "5px",
							}}
						>
							Num.
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								marginLeft: "10px",
							}}
						>
							Image
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: isDesktop ? "flex-start" : "center",
							}}
						>
							Name {isDesktop && "proizvoda"}
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							Brand
						</div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							Flavor
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							Price
						</div>
						<div></div>
						<div style={{ display: "flex", justifyContent: "center" }}>
							Amount
						</div>
					</div>
					<div style={cartModalContainerStyles}>
						{items.map((item, index) => (
							<div
								key={index}
								style={cartProductContainerStyles}
								className="cart-item"
							>
								<div
									style={{
										height: "70px",
										width: "100%",
										display: "grid",
										gridTemplateColumns:
											"0.2fr 0.5fr 1fr 1fr 1fr 1fr 0.3fr 1fr 0.5fr",
										gridTemplateRows: "1fr",
										gap: "0px 0px",
										alignContent: "center",
										alignItems: "center",
										fontWeight: "300",
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											fontSize: isDesktop ? "0.8em" : "0.6em",
											marginLeft: isMobile && "5px",
										}}
									>
										{index + 1}
									</div>
									<img
										style={{
											height: isDesktop ? "60px" : "50px",
											marginLeft: "5px",
										}}
										src={item.product.image}
										alt={item.product.title}
									></img>
									<div
										style={{
											marginLeft: "5px",
											color: theme.palette.white.main,
											display: "flex",
											justifyContent: "flex-start",
											fontSize: isDesktop ? "0.8em" : "0.6em",
										}}
									>
										{item.product.title}
									</div>
									<div
										style={{
											marginLeft: "5px",
											color: theme.palette.white.main,
											fontSize: isDesktop ? "0.8em" : "0.6em",
											display: "flex",
											justifyContent: "center",
										}}
									>
										{getBrandNameFromId(brands, item.product.brand)}
									</div>

									<div
										style={{
											marginLeft: "5px",
											color: theme.palette.white.main,
											fontSize: isDesktop ? "0.8em" : "0.6em",
											display: "flex",
											justifyContent: "center",
										}}
									>
										{item.flavor}
									</div>

									<div
										style={{
											display: "flex",
											width: "100%",
											height: "100%",
											alignItems: "center",
											flexDirection: "row",
											fontSize: isDesktop ? "0.8em" : "0.6em",
											justifyContent: "flex-end",
											color: "green",
										}}
									>
										{applyDiscount(
											item.product.price,
											item.product.discountAmount,
										)}
										
									</div>
									<div
										style={{
											fontSize: isDesktop ? "0.7em" : "0.5em",
											marginLeft: "5px",
										}}
									>
										€
									</div>
									<div
										style={{
											display: "flex",
											width: "100%",
											height: "100%",
											alignItems: "center",
											flexDirection: "row",
											color: theme.palette.white.main,
											fontSize: isDesktop ? "0.8em" : "0.6em",
											justifyContent: "center",
										}}
									>
										x {item.count}
									</div>
									<div
										style={{
											height: "80%",
											width: "100%",
											display: "flex",
											flexDirection: "column",
											alignItems: "flex-end",
											justifyContent: "center",
										}}
									>
										<div
											style={{
												marginRight: "5px",
												height: "95%",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
												cursor: "pointer",
												color: theme.palette.white.main,
												backgroundColor: theme.palette.grey.darkerOpacity85,
												width: isDesktop ? "30%" : "70%",
												borderRadius: "5px",
											}}
										>
											<div
												style={cartProductAddRemoveStyles}
												className="hover-style"
											>
												<Tooltip title={"Ukloni"} placement="left">
													<RemoveOutlinedIcon
														onClick={() => removeFromCartHandler(item.product)}
													/>
												</Tooltip>
											</div>
											<div
												style={cartProductAddRemoveStyles}
												className="hover-style"
											>
												<Tooltip title={"Dodaj"} placement="left">
													<AddOutlinedIcon
													onClick={() =>
														addToCartHandler({
															...item,
															selectedFlavor: item.flavor,
														})
													}
													/>
												</Tooltip>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div style={cartPageTitleBottomStyles}>
						<div
							style={{
								fontSize: isDesktop ? "0.8em" : "0.5em",
								cursor: "pointer",
								height: "100%",
								width: isMobile && "95%",
								display: "grid",
								gridTemplateColumns: "1fr",
								gridTemplateRows: "1fr 1fr",
								gap: "0px 0px",
								justifyItems: isMobile && "start",
								justifyContent: isMobile && "start",
							}}
						>
							<div
								style={{
									marginLeft: isDesktop ? "5%" : null,
									display: "flex",
									alignItems: "center",
									fontSize: isDesktop && isScreenSmall ? "0.75em" : null,
								}}
							>
								Do you have a promo code? Use it and get 10% off!
							</div>
							<div
								style={{
									marginLeft: isDesktop ? "5%" : null,
									fontSize: "0.7em",
									fontWeight: "300",
								}}
							>
								Enter promo code:
								<input
									onChange={(e) => setPromoCodeText(e.target.value)}
									style={{
										marginLeft: isDesktop ? "10px" : "5px",
										height: "20px",
										width: isScreenSmall ? "150px" : "200px",
										marginRight: isDesktop && "10px",
									}}
								></input>
								<Button
									disabled={promoCodeText === ""}
									color="secondary"
									variant="contained"
									sx={{ height: "30px" }}
									onClick={() => handlePromoCode()}
								>
									Apply
								</Button>
							</div>
						</div>
						<div
							style={{
								height: "100%",
								width: "100%",
								display: "grid",
								gridTemplateColumns: "1fr",
								gridTemplateRows: "1fr 1fr 1fr",
								gap: "0px 0px",
								justifyItems: "end",
								marginTop: isMobile && "15px",
							}}
						>
							{/* <div
								style={{
									width: "60%",
									height: "%",
									display: "grid",
									gridTemplateColumns: "1fr 1fr 0.5fr",
									gridTemplateRows: "1fr",
									gap: "0px 0px",
								}}
							>
								<div
									style={{
										fontSize: "0.6em",
										display: "flex",
										fontWeight: "300",
									}}
								>
									20% Uračunat PDV:
								</div>
								<div
									style={{
										color: "white",
										display: "flex",
										justifyContent: "flex-end",
										alignItems: "center",
										fontSize: "0.8em",
									}}
								>
									{pdvPrice},00
								</div>
								<div
									style={{
										marginRight: "5px",
										marginLeft: "5px",
										fontSize: "0.8em",
										display: "flex",
										alignItems: "center",
									}}
								>
									€
								</div>
							</div> */}
							{promoCode && (
								<div
									style={{
										width: "60%",
										height: "%",
										display: "grid",
										gridTemplateColumns: "1fr 1fr 0.5fr",
										gridTemplateRows: "1fr",
										gap: "0px 0px",
									}}
								>
									<div
										style={{
											fontSize: "0.6em",
											display: "flex",
											fontWeight: "300",
											alignItems: "center",
										}}
									>
										Promo code:
									</div>
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "flex-end",
											alignItems: "center",
											fontSize: "0.8em",
										}}
									>
										- {discountAmount}
									</div>
									<div
										style={{
											marginRight: "5px",
											marginLeft: "5px",
											fontSize: "0.8em",
											display: "flex",
											alignItems: "center",
										}}
									>
										€
									</div>
								</div>
							)}
							<div
								style={{
									width: "60%",
									height: "%",
									display: "grid",
									gridTemplateColumns: "1fr 1fr 0.5fr",
									gridTemplateRows: "1fr",
									gap: "0px 0px",
								}}
							>
								<div style={{}}>Total:</div>
								<div
									style={{
										color: "green",
										display: "flex",
										justifyContent: "flex-end",
										marginLeft: "5px",
									}}
								>
									{totalPriceFinal}
								</div>
								<div style={{ marginRight: "10px" }}>€</div>
							</div>

							<div
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-end",
								}}
							>
								{freeShipping ? (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontSize: "0.6em",
											marginRight: "5%",
											fontWeight: "300",
										}}
									>
										<CheckIcon sx={{ color: "green" }} />
										free delivery
									</div>
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontSize: "0.6em",
											marginRight: "4%",
										}}
									>
										<AddIcon sx={{ color: "red" }} />
										delivery
									</div>
								)}
							</div>
						</div>
					</div>
					<div
						style={{
							height: isDesktop ? "100px" : "70px",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<div
							style={{
								height: "50%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<CustomLoginButton
								onClick={() =>
									navigate("/cart-checkout", {
										state: {
											items,
											totalPriceFinal,
											freeShipping,
											itemCount: getItemCountForCheckout(items),
										},
									})
								}
								textButton={"Continue with transaction"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
