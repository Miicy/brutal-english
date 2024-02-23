import { useEffect, useState } from "react";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { isDesktop, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import {
	selectUserId,
	selectWishList,
	selectIsLoggedIn,
	addOrRemoveFromWishList,
} from "../../store/reducers/userSlice";

import { addItemToCart } from "../../store/reducers/cartSlice";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { addOrRemoveFromWishListServer } from "./products.actions";
import { displayNotification } from "../../store/reducers/notificationSlice";
import { useNavigate } from "react-router-dom";

export function applyDiscount(price, discountPercentage) {
	const discountAmount = (price * discountPercentage) / 100;
	const discountedPrice = price - discountAmount;
	return discountedPrice;
}

function ProductContainer({ isNew, onSale, price, title, image, product }) {
	//select logged in

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userId = useSelector(selectUserId);
	const wishlist = useSelector(selectWishList);
	const isLogged = useSelector(selectIsLoggedIn);

	//hover
	const [isHovered, setIsHovered] = useState(false);
	const [isHoveredWish, setIsHoveredWish] = useState(false);
	const [isHoveredCart, setIsHoveredCart] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleMouseEnterWish = () => {
		setIsHoveredWish(true);
	};

	const handleMouseLeaveWish = () => {
		setIsHoveredWish(false);
	};

	const handleMouseEnterCart = () => {
		setIsHoveredCart(true);
	};

	const handleMouseLeaveCart = () => {
		setIsHoveredCart(false);
	};

	//add cart notification
	const [flavorError, setFlavorError] = useState("");

	const handleAddProductClick = () => {
		if (flavors.length > 0 && !selectedFlavor) {
			setFlavorError("Chose flavor!");
			return;
		}

		dispatch(addItemToCart({ product, selectedFlavor }));
		const notificationPayload = {
			text: `${product.title} added to cart!`,
			type: NOTIFICATION_TYPES.SUCCESS,
		};
		dispatch(displayNotification(notificationPayload));
	};

	const handleAddOrRemoveFromWishlist = (id) => {
		dispatch(addOrRemoveFromWishListServer(id, userId)).then(() =>
			dispatch(addOrRemoveFromWishList(id)),
		);
	};

	//flavour
	useEffect(() => {
		if (product !== null) {
			setFlavors(product.flavors);
		}
	}, [product]);

	const [flavors, setFlavors] = useState([]);

	const [selectedFlavor, setSelectedFlavor] = useState("");

	const handleChange = (event) => {
		setSelectedFlavor(event.target.value);
	};

	//style
	const theme = useTheme();
	const productBorderContainerStyles = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		height: "320px",
		minWidth: "200px",
		width: isMobile && "200px",
		borderRadius: "5px",
		border: isHovered
			? `1px solid ${theme.palette.grey.main}`
			: `1px solid rgba(0, 0, 0, 0)`,
		position: "relative",
		cursor: "pointer",
		boxShadow: isHovered ? "0px 0px 4px 0.5px rgba(0, 0, 0, 0.9)" : "none",
		transition: "box-shadow 100ms ease-out",
	};

	const productContainer = {
		height: "100%",
		// backgroundColor:"white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	};

	const productPictureContainer = {
		backgroundColor: "white",
		height: "65%",
		width: "100%",
		borderRadius: "5px 5px 0 0",
		position: "relative",
		display: "flex",
	};

	const productTextContainer = {
		height: "35%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	};
	const productNameContainer = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: "1em",
		height: "40%",
	};
	const productPriceContainer = {
		...productNameContainer,
		fontSize: "1.2em",
		display: "flex",
		flexDirection: onSale ? "row" : "column",
		justifyContent: onSale ? "center" : "center",
		alignItems: onSale ? "flex-start" : "center",
		width: onSale ? "90%" : "100%",
	};

	const productDiscountContainer = {
		textDecoration: "line-through",
		fontSize: "0.8em",
		display: "flex",
		justifyContent: "center",
		height: "100%",
		color: theme.palette.customRed.secondary,
	};

	const productTagContainer = {
		position: "absolute",
		backgroundColor: theme.palette.secondary.secondary,
		height: "7.5%",
		width: "35%",
		top: 15,
		left: 0,
		borderTopRightRadius: "5px",
		borderBottomRightRadius: "5px",
		color: theme.palette.white.main,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
		fontSize: "0.8em",
		border: `1px solid ${theme.palette.grey.main} `,
		borderRight: null,
		transition: "transform 300ms ease-out",
	};

	const productTagDiscontContainer = {
		...productTagContainer,
		top: isNew ? 50 : 15,
	};

	const productCartContainer = {
		backgroundColor: isHoveredCart
			? theme.palette.white.opacity70
			: theme.palette.white.opacity50,
		height: "30%",
		width: "100%",
		top: 219,
		right: 0,
		color: theme.palette.grey.darker,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
		fontSize: "0.8em",
		transition: "color 0.3s",
		borderRight: null,
	};

	const cartIconStyles = {
		fontSize: "2.5em",
		color: isHoveredCart
			? theme.palette.secondary.secondary
			: theme.palette.secondary.opacity80,
		transition: "color 0.3s",
	};

	const wishlistContainer = {
		position: "absolute",
		color: theme.palette.secondary.main,
		top: 15,
		right: 5,
	};

	const handleWishListIcons = (productId) => {
		if (isHoveredWish) {
			if (wishlist.find((id) => id === productId)) {
				return (
					<div style={wishlistContainer}>
						<Tooltip title="Ukloni iz omiljenih" placement="bottom">
							<FavoriteRoundedIcon
								sx={{ fontSize: "2em" }}
								onMouseEnter={handleMouseEnterWish}
								onMouseLeave={handleMouseLeaveWish}
								onClick={() => handleAddOrRemoveFromWishlist(product._id)}
							/>
						</Tooltip>
					</div>
				);
			} else {
				return (
					<div style={wishlistContainer}>
						<Tooltip title="Add to wishlist" placement="bottom">
							<FavoriteRoundedIcon
								sx={{ fontSize: "2em" }}
								onMouseEnter={handleMouseEnterWish}
								onMouseLeave={handleMouseLeaveWish}
								onClick={() => handleAddOrRemoveFromWishlist(product._id)}
							/>
						</Tooltip>
					</div>
				);
			}
		} else {
			if (wishlist.find((id) => id === productId)) {
				return (
					<div style={wishlistContainer}>
						<FavoriteRoundedIcon
							sx={{ fontSize: "2em" }}
							onMouseEnter={handleMouseEnterWish}
							onMouseLeave={handleMouseLeaveWish}
							onClick={() => handleAddOrRemoveFromWishlist(product._id)}
						/>
					</div>
				);
			} else {
				return (
					<div style={wishlistContainer}>
						<FavoriteBorderRoundedIcon
							sx={{ fontSize: "2em" }}
							onMouseEnter={handleMouseEnterWish}
							onMouseLeave={handleMouseLeaveWish}
						/>
					</div>
				);
			}
		}
	};

	if (!wishlist) return null;

	return (
		<div
			style={productBorderContainerStyles}
			className={isDesktop ? "hover-main-container" : null}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div style={productContainer}>
				<div style={productPictureContainer}>
					<img
						style={{
							height: "100%",
							width: "100%",
							borderRadius: "5px 5px 0 0",
							position: "relative",
						}}
						src={image}
						alt={title}
						onClick={() => navigate(`/product/${product._id}`)}
					/>
					{flavors.length > 0 && (
						<FormControl
							variant="standard"
							fullWidth
							sx={{
								position: "absolute",
								bottom: 0,
							}}
						>
							{!selectedFlavor && (
								<InputLabel
									shrink={false}
									id="taste-select"
									sx={{
										color: "white",
										fontWeight: "bold",
										fontSize: "1.05em",
										zIndex: 10,
										marginLeft: "10px",
										display: "flex",
									}}
								>
									{!flavorError && "Chose flavor"}
									{flavorError && (
										<div style={{ color: "red" }}>{flavorError}</div>
									)}
								</InputLabel>
							)}
							<Select
								labelId="taste-select"
								value={selectedFlavor}
								label="Ukus"
								onChange={handleChange}
								sx={{
									height: "35px",
									fontSize: "1.1em",
									color: "#ff6600",
									fontWeight: "bold",
									textAlign: "left",

									backgroundColor: theme.palette.primaryLighter.opacity80,
									"&:hover": {
										backgroundColor: theme.palette.white.opacity70,
										color: "white",
									},
								}}
							>
								{flavors.map((flavor, index) => (
									<MenuItem key={index} value={flavor}>
										<div style={{ marginLeft: "10px" }}>{flavor}</div>
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				</div>

				<div style={productTextContainer}>
					<div style={productNameContainer}>{title}</div>
					<div style={productPriceContainer}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: "100%",
							}}
						>
							{applyDiscount(price, product.discountAmount)}€
						</div>
						{onSale && <div style={productDiscountContainer}>{price}</div>}
					</div>

					<Tooltip title={"Add to cart"} placement="bottom">
						<div
							style={productCartContainer}
							onMouseEnter={handleMouseEnterCart}
							onMouseLeave={handleMouseLeaveCart}
							onClick={handleAddProductClick}
						>
							{isHoveredCart ? (
								<ShoppingCartIcon sx={cartIconStyles} className="hover-style" />
							) : (
								<ShoppingCartOutlinedIcon
									sx={cartIconStyles}
									className="hover-style"
								/>
							)}
						</div>
					</Tooltip>
				</div>
			</div>
			{isNew && <div style={productTagContainer}>NEW!</div>}
			{onSale && <div style={productTagDiscontContainer}>ON SALE!</div>}
			<>{isLogged && handleWishListIcons(product._id)}</>
		</div>
	);
}

export default ProductContainer;
