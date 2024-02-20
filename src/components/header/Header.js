import { useCallback, useState } from "react";
import { HeaderIcons } from "./Icons";
import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import { ReactComponent as Logo } from "../../media/logo-white.svg";
import SearchInput from "./SearchInput";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { filterProductsByName } from "../other/products.actions";
import { selectUserIfAdmin } from "../../store/reducers/userSlice";

const Header = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const isScreenSmall = useMediaQuery("(max-width:1000px)");
	const isAdmin = useSelector(selectUserIfAdmin);

	const appBarStyles = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		minWidth: "600px",
		height: isScreenSmall ? "65px!important" : "75px",
		paddingRight: "50px",
		paddingLeft: "50px",
		boxShadow: "0px 1.5px 5px 0px rgba(0, 0, 0, 0.9)",
		zIndex: 25,
		backgroundColor: theme.palette.primary.main,
		borderBottom: `1.5px solid  ${theme.palette.secondary.main}`,
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		gridTemplateRows: "1fr",
		gap: "0px",
	};

	const appBarStylesMobile = {
		...appBarStyles,
		paddingRight: "10px!important",
		paddingLeft: "10px!important",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridTemplateRows: "1fr",
		gap: "0px",
		minWidth: undefined,
		height: "55px",
	};

	const appBarLogoContainer = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	};

	const appBarSearchContainer = {
		justifyContent: "center",
		display: "flex",
		alignItems: "center",
	};

	const logoStyles = {
		height: isDesktop ? "55px" : "45px",
		width: "10%",
		minWidth: "70px",
		cursor: "pointer",
		marginRight: "8px",
	};

	const appBarIconsContainer = {
		...appBarLogoContainer,
		justifyContent: "flex-end",
	};

	const SearchContainerMobile = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "60px",
		width: "100%",
		borderRadius: "0px 0px 2px 2px",
		backgroundColor: theme.palette.grey.opacity70,
		zIndex: 20,
		boxShadow: "0px -1.5px 5px 0px rgba(0, 0, 0, 0.9)",
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		marginTop: 55,
		position: "fixed",
	};

	const appBarLogoText = {
		minWidth: "400px",
		width: "70%",
		cursor: "pointer",
		color: "rgb(255, 102, 0)",
		fontSize:"1.5em",
		fontWeight:"bold",
		transform:"scaleY(1.4)",
		display:"inline-block"
	};

	//modal

	const [menuOpen, setMenuOpen] = useState(false);

	const handleClickMenuMobileModal = () => {
		setMenuOpen(!menuOpen);
	};

	//navigate
	const navigate = useNavigate();

	const hadleClickLogoNavigate = () => {
		navigate("/");
	};

	//hideSearch if menu/cart mobile open
	const location = useLocation();
	const specificRoutes = ["/mobile-cart", "/mobile-menu"];
	const isSearchMobileHidden = specificRoutes.includes(location.pathname)
		? false
		: true;

	const [searchValue, setSearchValue] = useState("");

	const onSearch = useCallback(() => {
		const filter = {
			title: searchValue,
		};
		dispatch(filterProductsByName(filter)).then((products) => {
			navigate("/filter", { state: products.products });
		});
	}, [dispatch, searchValue, navigate]);

	return (
		<div>
			{isDesktop ? (
				<div style={appBarStyles}>
					<div style={appBarLogoContainer} onClick={hadleClickLogoNavigate}>
						<Logo style={logoStyles} />
						{!isScreenSmall && (
							<div style={appBarLogoText}>BRUTAL WORKOUT SUPLEMENTS</div>
						)}
					</div>
					{!isAdmin && (
						<div style={appBarSearchContainer}>
							<SearchInput
								onSearch={onSearch}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						</div>
					)}
					{!isAdmin && (
						<div style={appBarIconsContainer}>
							<HeaderIcons />
						</div>
					)}
				</div>
			) : (
				<div>
					<div style={appBarStylesMobile}>
						<div style={appBarLogoContainer} onClick={hadleClickLogoNavigate}>
							<Logo style={logoStyles} />
						</div>
						<div style={appBarIconsContainer}>
							<HeaderIcons
								handleClickMenuMobileModal={handleClickMenuMobileModal}
							/>
						</div>
					</div>
					{isSearchMobileHidden && (
						<div style={SearchContainerMobile}>
							<div style={{ width: "15%" }}></div>
							<div
								style={{
									width: "70%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<SearchInput
									onSearch={onSearch}
									searchValue={searchValue}
									setSearchValue={setSearchValue}
								/>
							</div>
							<div style={{ width: "15%", backgroundColor: "yellow" }}></div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Header;
