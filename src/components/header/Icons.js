import React, { useState } from "react";
import { Divider } from "@mui/material";
import { isDesktop } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItemsCount} from "../../store/reducers/cartSlice";
import { useTheme } from "@mui/material/styles";
import { selectIsLoggedIn } from "../../store/reducers/userSlice";

import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

import ModalCart from "./ModalCart";
import ModalLogin from "./ModalLogin";

export const HeaderIcons = () => {
	const theme = useTheme();

	const { pathname } = useLocation();

	const iconStyles = {
		fontSize: "2em",
		marginRight: "15px",
		marginLeft: "15px",
		cursor: "pointer",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		transition: "color 0.3s",
		color: theme.palette.white.main,
		":hover": {
			color: theme.palette.secondary.main,
		},
	};

	const iconStylesOrange = {
		...iconStyles,
		color: theme.palette.secondary.main,
	};

	const HeaderIconsContainer = {
		height: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	};

	//badge

	const itemsCount = useSelector(selectItemsCount);

	//icon click

	const [isProfileIconClicked, setIsProfileIconClicked] = useState(false);
	const [isCartIconClicked, setIsCartIconClicked] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isCartIconClickedMobile, setIsCartIconClickedMobile] = useState(false);
	const [isWhishlistIconClicked, setisWhishlistIconClicked] = useState(false);

	const handleClickProfile = () => {
		setIsProfileIconClicked(!isProfileIconClicked);
		if (isCartIconClicked) {
			setIsCartIconClicked(!isCartIconClicked);
		}
		if (isWhishlistIconClicked) {
			setisWhishlistIconClicked(!isWhishlistIconClicked);
		}
	};

	const handleClickCart = () => {
		setIsCartIconClicked(!isCartIconClicked);
		if (isProfileIconClicked) {
			setIsProfileIconClicked(!isProfileIconClicked);
		}
		if (isWhishlistIconClicked) {
			setisWhishlistIconClicked(!isWhishlistIconClicked);
		}
	};

	const handleClickWhishlist = () => {
		navigate("/wishlist");
		if (isProfileIconClicked) {
			setIsProfileIconClicked(!isProfileIconClicked);
		}
		if (isCartIconClicked) {
			setIsCartIconClicked(!isCartIconClicked);
		}
	};

	//navigate

	const navigate = useNavigate();

	const handleClickMenuMobile = () => {
		if (pathname === "/mobile-menu") {
			navigate("/");
		} else {
			navigate("/mobile-menu");
		}
	};

	const handleClickCartMobile = () => {
		if (pathname === "/mobile-cart") {
			navigate("/");
		} else {
			navigate("/mobile-cart");
		}
	};

	//loginState

	const isLoggedIn = useSelector(selectIsLoggedIn);

	//route
	const isWishlistRoute = pathname === "/wishlist";

	return (
		<div style={{ height: "100%" }}>
			{isDesktop ? (
				<div style={HeaderIconsContainer}>
					{isLoggedIn && (
						<Tooltip title={"Lista želja"}>
							{isWishlistRoute ? (
								<FavoriteIcon
									onClick={handleClickWhishlist}
									sx={{ ...iconStylesOrange, fontSize: "2em" }}
								/>
							) : (
								<FavoriteBorderIcon
									onClick={handleClickWhishlist}
									sx={{ ...iconStyles, fontSize: "2em" }}
								/>
							)}
						</Tooltip>
					)}

					<Tooltip
						title={
							isProfileIconClicked
								? undefined
								: isLoggedIn
								? "Profile"
								: "Login"
						}
					>
						{isProfileIconClicked ? (
							<PersonIcon
								onClick={handleClickProfile}
								sx={{ ...iconStylesOrange, fontSize: "2.2em" }}
							/>
						) : (
							<PermIdentityOutlinedIcon
								onClick={handleClickProfile}
								sx={{ ...iconStyles, fontSize: "2.2em" }}
							/>
						)}
					</Tooltip>
					<Divider orientation="vertical" variant="middle" flexItem />
					<Tooltip title={isCartIconClicked ? undefined : "Cart"}>
						<Badge badgeContent={itemsCount} color="customRed">
							{isCartIconClicked ? (
								<ShoppingCartIcon
									onClick={handleClickCart}
									sx={{...iconStylesOrange, marginRight: "1px"}}
								/>
							) : (
								<ShoppingCartOutlinedIcon
									onClick={handleClickCart}
									sx={{...iconStyles,  marginRight: "1px"}}
								/>
							)}
						</Badge>
					</Tooltip>
					{isCartIconClicked && (
						<ModalCart setIsCartIconClicked={setIsCartIconClicked} />
					)}
					{isProfileIconClicked && (
						<ModalLogin setIsProfileIconClicked={setIsProfileIconClicked} />
					)}
				</div>
			) : (
				<div style={HeaderIconsContainer}>
					{isLoggedIn && (
						<Tooltip title={"Lista želja"}>
							{isWishlistRoute ? (
								<FavoriteIcon
									onClick={handleClickWhishlist}
									sx={{ ...iconStylesOrange, fontSize: "2em" }}
								/>
							) : (
								<FavoriteBorderIcon
									onClick={handleClickWhishlist}
									sx={{ ...iconStyles, fontSize: "2em" }}
								/>
							)}
						</Tooltip>
					)}
					<Tooltip title={isCartIconClickedMobile ? undefined : "Cart"}>
						<Badge badgeContent={itemsCount} color="customRed" sx={{marginRight:"15px"}}>
							{pathname === "/mobile-cart" ? (
								<ShoppingCartIcon
									onClick={handleClickCartMobile}
									sx={{...iconStylesOrange, marginRight:"0"}}
								/>
							) : (
								<ShoppingCartOutlinedIcon
									onClick={handleClickCartMobile}
									sx={{...iconStyles, marginRight:"0"}}
								/>
							)}
						</Badge>
					</Tooltip>
					<Divider orientation="vertical" variant="middle" flexItem />
					<Tooltip title={"Meni"}>
						<MenuIcon
							onClick={handleClickMenuMobile}
							sx={pathname === "/mobile-menu" ? iconStylesOrange : iconStyles}
						/>
					</Tooltip>
				</div>
			)}
		</div>
	);
};
