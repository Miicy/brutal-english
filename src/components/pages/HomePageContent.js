import { useTheme } from "@emotion/react";
import { isDesktop, isMobile } from "react-device-detect";
import Gallery from "../other/Gallery";
import Products from "../other/Products";
import { useSelector } from "react-redux";
import {
	selectDiscountProducts,
	selectNewProducts,
} from "../../store/reducers/productSlice";
import { useState } from "react";
import CodeModal from "../other/CodeModal";
import { useMediaQuery } from "@mui/material";

function HomePageContent() {
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	//selectors
	const productsDiscount = useSelector(selectDiscountProducts);
	const productsNew = useSelector(selectNewProducts);

	//code modal
	const [codeModal, setCodeModal] = useState(false);

	//style
	const theme = useTheme();
	const homePageContentContainerStyles = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		minWidth: isDesktop ? "600px" : null,
		borderRadius: "5px",
	};

	const homePageGalleryContainer = {
		height: "fit-content",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	};

	const homePageAddSpaceContainer = {
		width: "100%",
		backgroundColor: theme.palette.primary.main,
		color: "white",
		height: isDesktop ? "100px" : "80px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		fontSize: isDesktop ? "1.1em" : "0.9em",
	};

	const homePageTitleContainer = {
		width: "100%",
		height: "fit-content",
		padding: isDesktop ? "20px 0 20px 0" : "40px 0 20px 0",
	};

	const homePageTitle = {
		fontSize: "2em",
		fontWeight: "bold",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: isDesktop ? "15px" : "7px",
	};

	const homePageProductsContainer = {
		height: "fit-content",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "auto",
		marginBottom: "20px",
	};

	return isDesktop ? (
		<div style={homePageContentContainerStyles}>
			<div style={homePageGalleryContainer}>
				<Gallery />
			</div>
			<div style={homePageAddSpaceContainer}>
				<p
					style={{
						textAlign: "center",
						width: "100%",
						transform: "scaleX(1.1)",
					}}
				>
					FREE SHIPPING ON ORDERS OVER 100€!
				</p>
			</div>
			<div style={homePageTitleContainer}>
				<div style={homePageTitle}>NEW</div>
			</div>
			<div style={homePageProductsContainer}>
				<Products products={productsNew} isNewState={true} />
			</div>
			<div
				style={{ ...homePageAddSpaceContainer, cursor: "pointer" }}
				onClick={() => setCodeModal(true)}
			>
				<div style={homePageAddSpaceContainer}>
					<p
						style={{
							textAlign: "center",
							width: "100%",
							fontSize: isScreenSmall
								? "0.8em"
								: isDesktop
								? "1em"
								: isMobile
								? "0.6em"
								: null,
						}}
						className="hover-style"
					>
						CREATE AN ACCOUNT, USE THE PROMO CODE, AND GET 10% DISCOUNT ON YOUR
						FIRST ORDER.
					</p>
				</div>
			</div>
			<div style={homePageTitleContainer}>
				<div style={homePageTitle}>ON SALE</div>
			</div>
			<div style={homePageProductsContainer}>
				<Products products={productsDiscount} />
			</div>
			{codeModal && <CodeModal setCodeModal={setCodeModal} />}
		</div>
	) : (
		<div style={homePageContentContainerStyles}>
			<div style={homePageGalleryContainer}>
				<Gallery />
			</div>
			<div style={homePageAddSpaceContainer}>
				<p
					style={{
						textAlign: "center",
						width: "100%",
						fontSize: isScreenSmall
							? "0.8em"
							: isDesktop
							? "1em"
							: isMobile
							? "0.6em"
							: null,
					}}
				>
					Besplatna dostava za kupovinu preko 6000 €!
				</p>
			</div>
			<div style={homePageTitleContainer}>
				<div style={homePageTitle}>NOVO</div>
			</div>
			<div style={homePageProductsContainer}>
				<Products products={productsNew} isNewState={true} />
			</div>
			<div
				style={{ ...homePageAddSpaceContainer, cursor: "pointer" }}
				onClick={() => setCodeModal(true)}
			>
				<div style={homePageAddSpaceContainer}>
					<p
						style={{ textAlign: "center", width: "100%" }}
						className="hover-style"
					>
						Iskoristi promo kod i ostvari 10% popusta na narudžbinu.
					</p>
				</div>
			</div>
			<div style={homePageTitleContainer}>
				<div style={homePageTitle}>NA AKCIJI</div>
			</div>
			<div style={homePageProductsContainer}>
				<Products products={productsDiscount} />
			</div>
			{codeModal && <CodeModal setCodeModal={setCodeModal} />}
		</div>
	);
}
export default HomePageContent;
