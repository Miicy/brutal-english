import { useDispatch, useSelector } from "react-redux";
import {
	addItemToCart,
	removeItemsFromCart,
	selectItems,
	selectItemsCount,
	selectTotalCartPrice,
} from "../../store/reducers/cartSlice";
import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { displayNotification } from "../../store/reducers/notificationSlice";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { isDesktop, isMobile } from "react-device-detect";

function ModalCart({ setIsCartIconClicked }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items = useSelector(selectItems);
	const itemCount = useSelector(selectItemsCount);
	const totalPrice = useSelector(selectTotalCartPrice);

	const theme = useTheme();

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

	//cart height
	const cartModalRef = useRef(null);
	const minHeight = 220;
	const maxHeight = 700;
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (cartModalRef.current) {
			let totalHeight = 0;
			if (items.length > 3) {
				totalHeight = (items.length - 3) * 70;
			}

			const newContentHeight = Math.max(
				minHeight,
				Math.min(maxHeight, totalHeight + minHeight),
			);
			setContentHeight(newContentHeight);
		}
	}, [items]);

	//styles

	const cartModalStyles = {
		position: "absolute",
		backgroundColor: theme.palette.primary.opacity96,
		width: isDesktop ? "300px" : "90%",
		height: isDesktop ? `fit-content` : `80%`,
		zIndex: 9999,
		right: isDesktop ? 5 : null,
		top: 80,
		borderRadius: "5px",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		animation: "appearAnimation 0.2s ease-in 0s 1 normal forwards",
		border: `1.5px solid  ${theme.palette.secondary.main}`,
		overflowX: "hidden",
		overflowY: isMobile && "hidden",
	};

	const cartModalCloseIconContainerStyles = {
		width: "95%",
		height: "fit-content",
		display: "flex",
		justifyContent: isDesktop ? "space-between" : "center",
		marginTop: "5px",
		marginBottom: "5px",
	};

	const cartModalPaddingStyles = {
		padding: "10px",
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignContent: "center",
	};
	const closeIconStyles = {
		color: theme.palette.white.main,
		transition: "color 0.3s",
		cursor: "pointer",
		":hover": {
			color: theme.palette.secondary.main,
		},
	};

	const pStyles = {
		fontSize: isDesktop ? "1.2em" : "1.5em",
		color: theme.palette.white.main,
		width: "fit-content",
		marginLeft: "5px",
		padding: "10px 0 10px 0",
	};

	const cartModalContainerStyles = {
		backgroundColor: theme.palette.primaryLighter.opacity60,
		minHeight: isMobile && "70%",
		height: isDesktop ? `${contentHeight}px` : null,
		width: "87%",
		padding: "10px",
		overflowY: contentHeight === maxHeight ? "scroll" : (isMobile ? "auto" : "hidden"),
		display: itemCount === 0 && "flex",
		justifyContent: itemCount === 0 && "center",
		alignItems: itemCount === 0 && "center",
		color: theme.palette.white.main,
		fontSize: "0.9em",
	};

	const cartProductContainerStyles = {
		// backgroundColor: theme.palette.primaryLighter.opacity60,
		height: "70px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
	};

	const cartProductAddRemoveStyles = {
		height: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		color: theme.palette.white.main,
	};

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

	return (
		// <ClickAwayListener onClickAway={() => setIsCartIconClicked(false)}>
		<div style={cartModalStyles}>
			<div style={cartModalPaddingStyles}>
				<div style={cartModalCloseIconContainerStyles}>
					<div style={pStyles}>Cart</div>
					{isDesktop && (
						<CloseIcon
							onClick={() => setIsCartIconClicked(false)}
							sx={closeIconStyles}
						/>
					)}
				</div>
				{itemCount === 0 ? (
					<div style={cartModalContainerStyles} ref={cartModalRef}>
						Cart is empty
					</div>
				) : (
					<div style={cartModalContainerStyles} ref={cartModalRef}>
						{items.map((item, index) => (
							<div
								key={index}
								style={cartProductContainerStyles}
								className="cart-item"
							>
								<div
									style={{
										height: "100%",
										width: "100%",
										// backgroundColor: "red",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div
										style={{
											height: "100%",
											width: "100%",
											display: "flex",
											alignItems: "center",
										}}
									>
										<img
											style={{ height: "90%", marginLeft: "5px" }}
											src={item.product.image}
											alt={item.product.title}
										></img>
										<div
											style={{
												marginLeft: "5px",
												color: theme.palette.white.main,
												fontSize: "0.9em",
											}}
										>
											{item.product.title}
										</div>
									</div>
									<div
										style={{
											display: "flex",
											width: "30%",
											height: "100%",
											alignItems: "center",
											flexDirection: "row",
											color: theme.palette.white.main,
											fontSize: "1.05em",
										}}
									>
										x {item.count}
									</div>
								</div>
								<div
									style={{
										height: "80%",
										backgroundColor: theme.palette.grey.darkerOpacity85,
										display: "flex",
										flexDirection: "column",
										marginRight: "5px",
										borderRadius: "3px",
									}}
								>
									<div
										style={cartProductAddRemoveStyles}
										className="hover-style"
									>
										<Tooltip title={"Remove"} placement="left">
											<RemoveOutlinedIcon
												onClick={() => removeFromCartHandler(item.product)}
											/>
										</Tooltip>
									</div>
									<div
										style={cartProductAddRemoveStyles}
										className="hover-style"
									>
										<Tooltip title={"Add"} placement="left">
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
						))}
					</div>
				)}

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						color: theme.palette.white.main,
						height: "80px",
						width: "99%",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							cursor: "pointer",
							height: "80%",
							width: "90%",
							fontSize: "0.95em",
						}}
					>
						Total:
						<div
							style={{ color: "green", marginLeft: "5px", fontSize: "1.2em" }}
						>
							{totalPrice}€
							<div
								style={{
									fontSize: "0.7em",
									color: "white",
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								{itemCount === 0 ? null : freeShipping ? (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<CheckIcon
											sx={{
												color: "green",
												fontSize: "1em",
												marginRight: "3px",
											}}
										/>
										free delivery
									</div>
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<AddIcon
											sx={{ color: "red", fontSize: "1em", marginRight: "3px" }}
										/>
										delivery
									</div>
								)}
							</div>
						</div>
					</div>
					{itemCount > 0 && (
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
								cursor: "pointer",
								height: "20%",
								width: "90%",
								fontSize: "0.95em",
								marginTop: "5px",
								marginBottom: isMobile && "10px",
							}}
							className="hover-style"
							onClick={() => navigate("/cart-page")}
						>
							Continue with payment
							<KeyboardArrowRightOutlinedIcon />
						</div>
					)}
				</div>
			</div>
		</div>
		// </ClickAwayListener>
	);
}

export default ModalCart;
