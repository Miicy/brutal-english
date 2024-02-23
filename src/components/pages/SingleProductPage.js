import { useTheme } from "@emotion/react";
import {
	Breadcrumbs,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
	useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { displayNotification } from "../../store/reducers/notificationSlice";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { getProduct } from "../../adminPanel/adminPanel.actions";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
	getBrandNameFromId,
	getCategoryNameFromId,
} from "../../helpers/functions";
import useGetAllBrands from "../../helpers/hooks/useGetAllBrands";
import useGetProductCategories from "../../adminPanel/components/hooks/useGetProductCategories";
import {
	selectWishList,
	addOrRemoveFromWishList,
	selectIsLoggedIn,
	selectUserId,
} from "../../store/reducers/userSlice";
import { addOrRemoveFromWishListServer } from "../../components/other/products.actions";
import ImageMafnifier from "../other/ImageMafnifier";

export function applyDiscount(price, discountPercentage) {
	const discountAmount = (price * discountPercentage) / 100;
	const discountedPrice = price - discountAmount;
	return discountedPrice;
}

function SingleProductPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const wishlist = useSelector(selectWishList);
	const userId = useSelector(selectUserId);
	const isLogged = useSelector(selectIsLoggedIn);

	const [isHoveredWish, setIsHoveredWish] = useState(false);
	const isScreenSmallButtons = useMediaQuery("(max-width: 1600px)");

	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	//get product
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	//brands - categories
	const brands = useGetAllBrands();
	const { categories } = useGetProductCategories();

	//discount
	const [discount, setDiscount] = useState(false);
	const [flavors, setFlavors] = useState([]);

	useEffect(() => {
		if (product !== null) {
			setFlavors(product.flavors);
		}
		if (product && product.discountAmount > 0) {
			setDiscount(true);
		} else {
			setDiscount(false);
		}
	}, [product]);

	//flavour
	const [selectedFlavor, setSelectedFlavor] = useState("");

	const handleChange = (event) => {
		setSelectedFlavor(event.target.value);
	};

	//images, product
	const [image, setImage] = useState(null);
	const [image2, setImage2] = useState(null);
	const [image3, setImage3] = useState(null);
	const [selectedImage, setSelectedImage] = useState(image);

	const handleImageClick = (imageUrl) => {
		setSelectedImage(imageUrl);
	};

	useEffect(() => {
		if (id) {
			dispatch(getProduct(id))
				.then((data) => {
					setProduct(data.product);
					setSelectedImage(data.product.image);
					setImage(data.product.image);
					setImage2(data.product.secondImage);
					setImage3(data.product.thirdImage);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id, dispatch]);

	//cart button
	const [isHoveredCart, setIsHoveredCart] = useState(false);

	const productCartContainer = {
		backgroundColor: isHoveredCart
			? theme.palette.white.opacity70
			: theme.palette.white.opacity50,
		height: isMobile ? "70px" : "80px",
		width: "100%",
		color: theme.palette.grey.darker,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
		fontSize: "0.8em",
		transition: "color 0.3s",
		cursor: "pointer",
		borderTopLeftRadius: "5px",
		borderBottomLeftRadius: "5px",
	};

	const cartIconStyles = {
		fontSize: "2.5em",
		color: isHoveredCart
			? theme.palette.secondary.secondary
			: theme.palette.secondary.opacity80,
		transition: "color 0.3s",
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
		dispatch(addItemToCart({ product }));
		const notificationPayload = {
			text: `${product.title} added to cart!`,
			type: NOTIFICATION_TYPES.SUCCESS,
		};
		dispatch(displayNotification(notificationPayload));
	};

	//qill
	const renderQuillHtml = (html) => {
		return { __html: html };
	};

	//whishlist
	const wishlistContainer = {
		position: "absolute",
		color: theme.palette.secondary.main,
		top: 15,
		right: 15,
		cursor: "pointer",
		zIndex: 9999,
	};

	const handleMouseEnterWish = () => {
		setIsHoveredWish(true);
	};

	const handleMouseLeaveWish = () => {
		setIsHoveredWish(false);
	};

	const handleAddOrRemoveFromWishlist = (id) => {
		dispatch(addOrRemoveFromWishListServer(id, userId)).then(() =>
			dispatch(addOrRemoveFromWishList(id)),
		);
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
	//styles
	const SingleProductPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: isDesktop ? "fit-content" : "fit-content",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
		minWidth: isDesktop ? "800px" : null,
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	const SingleProductPageContentContainer = {
		height: "100%",
		width: "100%",
		display: isMobile ? "flex" : "grid",
		flexDirection: "column",
		justtifyContent: "center",
		alignItems: isMobile && "center",
		gridTemplateColumns: "1fr 1fr",
		gridTemplateRows: "auto",
		gap: "0px 1px",
		flexWrap: isMobile && "wrap",
	};

	const SingleProductImageContainer = {
		backgroundColor: "white",
		width: "90%",
		cursor: "pointer",
		borderRadius: "5px",
		fontSize: "0.6em",
		border: "2px solid transparent",
	};

	const SingleProductImageStyles = {
		height: "90%",
		width: "100%",
		borderRadius: "5px 5px 0 0",
	};

	const SingleProductMainImageContainer = {
		height: isDesktop ? "75%" : "95%",
		width: "95%",
		backgroundColor: "white",
		borderRadius: "5px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	};

	const SingleProductBrandsContainer = {
		height: "40px",
		width: "95%",
		fontSize: "0.75em",
		display: "flex",
		alignItems: "center",
		marginBottom: isMobile && "10px",
		marginLeft: isMobile && "15px",
	};

	const SingleProductDescriptionContainer = {
		backgroundColor: theme.palette.white.opacity50,
		minHeight: isMobile && "200px",
		height: isDesktop ? "450px" : "fit-content",
		width: "90%",
		border: `1px solid ${theme.palette.grey.main}`,
		borderRadius: "5px",
		fontSize: isDesktop && isScreenSmallButtons ? "0.5em" : "0.7em",
		fontWeight: "400",
		padding: 5,
		overflow: "auto",
	};

	const SingleProductPriceContainer = {
		backgroundColor: theme.palette.white.opacity50,
		width: isDesktop ? "94%" : "100%",
		fontSize: "1.2em",
		height: isDesktop ? "50%" : "50px",
		display: "flex",
		borderTopRightRadius: isDesktop && "5px",
		borderBottomRightRadius: isDesktop && "5px",
		alignItems: "center",
		justifyContent: isMobile ? "center" : "space-around",
	};

	const SingleProductTasteCartContainer = {
		display: "flex",
		alignItems: "center",
		width: isMobile && "100%",
	};

	const SingleProductPageImagesContainerStyles = {
		width: "100%",
		height: isScreenSmallButtons ? "90%" : "100%",
		display: "flex",
		justifyContent: "center",
	};

	const SingleProductPageImagesGridStyles = {
		display: "grid",
		gridAutoColumns: "1fr ",
		gridTemplateColumns: " 0.2fr 0.75fr",
		gridTemplateRows: "1fr",
		gap: "0px 0px",
		width: "100%",
		margin: isMobile && "15px 0 15px 0",
		height: isScreenSmallButtons
			? "90%"
			: isDesktop
			? "100%"
			: isMobile
			? null
			: null,
	};

	const SingleProductPageMultiImageContainerStyles = {
		width: "80%",
		height: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
	};

	const SingleProductTitleContainer = {
		marginLeft: isDesktop && "10px",
		width: isMobile && "100%",
		display: "flex",
		justifyContent: "center",
		marginBottom: isMobile && "20px",
	};
	const SingleProductBrandsCategoriesContainer = {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: isDesktop ? "flex-start" : "center",
		marginBottom:"5px"
	};
	const SinglePageTastesContainer = {
		width: "100%",
		justifyContent: "center",
		display: "flex",
		alignItems: "center",
		marginTop: flavors.length === 0 ? "5px" : "10px",
		marginBottom: flavors.length === 0 ? "0px" : "10px",
		height: flavors.length > 0 && isMobile && "90px",
		zIndex: 5,
	};

	if (!product || !brands || !categories || !flavors) return null;

	if (!wishlist) return null;

	return (
		<div style={SingleProductPageContainer}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb">
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>
							Product: {product.title}
						</p>
					</Breadcrumbs>
				</div>
			</div>
			<div style={SingleProductPageContentContainer}>
				<div style={SingleProductPageImagesContainerStyles}>
					<div style={SingleProductPageImagesGridStyles}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
							}}
						>
							<div style={SingleProductPageMultiImageContainerStyles}>
								<div
									style={SingleProductImageContainer}
									className="hover-style-images"
								>
									<img
										style={SingleProductImageStyles}
										src={image}
										alt={product.title}
										onMouseOver={() => handleImageClick(image)}
									/>
								</div>
								{image2 && (
									<div
										style={SingleProductImageContainer}
										className="hover-style-images"
									>
										<img
											style={SingleProductImageStyles}
											src={image2}
											alt={product.title}
											onMouseOver={() => handleImageClick(image2)}
										/>
									</div>
								)}

								{image3 && (
									<div
										style={SingleProductImageContainer}
										className="hover-style-images"
									>
										<img
											style={SingleProductImageStyles}
											src={image3}
											alt={product.title}
											onMouseOver={() => handleImageClick(image3)}
										/>
									</div>
								)}
							</div>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<div style={SingleProductMainImageContainer}>
								{isMobile ? (
									<img
										style={{
											height: "90%",
											width: "90%",
											borderRadius: "5px 5px 0 0",
										}}
										src={selectedImage}
										alt={product.title}
									/>
								) : (
									<ImageMafnifier
										src={selectedImage}
										width="100%"
										height="100%"
										magnifierHeight={170}
										magnifierWidth={170}
										zoomLevel={2.5}
										style={{
											zIndex: 100,
										}}
									/>
								)}

								{isLogged && handleWishListIcons(product._id)}
							</div>
						</div>
					</div>
				</div>
				<div style={{ width: isMobile && "100%" }}>
					<div style={SingleProductTitleContainer}>{product.title}</div>
					<div style={SingleProductBrandsCategoriesContainer}>
						<div
							style={{
								...SingleProductBrandsContainer,
								fontSize: isDesktop && isScreenSmallButtons ? "0.6em" : "0.8em",
							}}
						>
							Categories:
							<div
								style={{
									fontWeight: "400",
									marginLeft: "5px",
									display: "flex",
								}}
							>
								{product.category.map((category, index) => (
									<div key={category} style={{ marginRight: "5px" }}>
										{getCategoryNameFromId(categories, category)}
										{index !== product.category.length - 1 && ","}
									</div>
								))}
							</div>
						</div>
						<div
							style={{
								...SingleProductBrandsContainer,
								fontSize: isDesktop && isScreenSmallButtons ? "0.6em" : "0.8em",
							}}
						>
							Brand:
							<div style={{ fontWeight: "400", marginLeft: "5px" }}>
								{getBrandNameFromId(brands, product.brand)}
							</div>
						</div>
						<div style={SingleProductDescriptionContainer}>
							<div
								dangerouslySetInnerHTML={renderQuillHtml(product.description)}
							/>
						</div>
						{flavors.length > 0 && (
							<div style={SinglePageTastesContainer}>
								<div
									style={{
										backgroundColor: "grey",
										width: "90%",
										height: "fit-content",
										borderRadius: "5px",
										display: "flex",
										alignItems: "center",
									}}
								>
									<FormControl
										variant="filled"
										fullWidth
										sx={{
											border: `3px solid ${theme.palette.secondary.main}`,
											borderRadius: "5px",
											minWidth: 120,
										}}
									>
										{!selectedFlavor && (
											<InputLabel
												shrink={false}
												id="taste-select"
												sx={{
													color: "black",
													fontSize:
														isDesktop && isScreenSmallButtons ? "0.8em" : "1em",
													textAlign: "center",
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
												fontSize: "1em",
												textAlign: "center",
												backgroundColor: theme.palette.white.opacity50,
												"&:hover": {
													backgroundColor: theme.palette.white.opacity70,
													color: "white",
												},
											}}
										>
											{flavors.map((flavor, index) => (
												<MenuItem key={index} value={flavor}>
													{flavor}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					style={{
						...SingleProductTasteCartContainer,
						width: isMobile && "100%",
					}}
				>
					<div
						style={{
							...SingleProductPriceContainer,
							height: isMobile ? "70px" : "80px",
						}}
					>
						<div
							style={{
								marginLeft: isDesktop && "10px",
								display: isMobile && "flex",
								justifyContent: "flex-start",
								fontSize: isDesktop && isScreenSmallButtons ? "0.7em" : "1em",
							}}
						>
							Price:
						</div>

						<div
							style={{
								flexDirection: "row",
								display: "flex",
								fontSize: isDesktop && isScreenSmallButtons ? "0.6em" : "1em",
							}}
						>
							<div style={{ color: "green" }}>
								{applyDiscount(product.price, product.discountAmount)}€
							</div>

							{discount && (
								<div
									style={{
										color: "red",
										textDecoration: "line-through",
										fontSize: "0.8em",
										marginLeft: "10px",
									}}
								>
									{product.price}
								</div>
							)}
						</div>
					</div>
				</div>
				<div style={SingleProductTasteCartContainer}>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							height: isMobile ? "80px" : "125px",
						}}
					>
						<Tooltip title={"Add to cart"} placement="bottom">
							<div
								style={productCartContainer}
								onMouseEnter={handleMouseEnterCart}
								onMouseLeave={handleMouseLeaveCart}
								onClick={handleAddProductClick}
							>
								{isHoveredCart ? (
									<ShoppingCartIcon
										sx={cartIconStyles}
										className="hover-style"
									/>
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
			</div>
		</div>
	);
}

export default SingleProductPage;
