import { useTheme } from "@emotion/react";
import { Breadcrumbs } from "@mui/material";
import React, { useEffect } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import useGetProductsFromWishlist from "../../helpers/hooks/useGetProductsFromWishlist";
import ProductContainer from "../other/ProductContainer";

function WishlistPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	const wishlistProducts = useGetProductsFromWishlist();
	
	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const NotFoundPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		minHeight: "100vh",
		height: "fit-content",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	const productsStyles = {
		height: "fit-content",
		width: "97%",
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
		gridGap: "5px",
		justifyItems: "center",
		transitionDelay: "0.2s",
		margin: "10px",
		fontSize: "0.7em",
		fontWeight: "400",
	};

	const innerContainerStyles = {
		width: "fit-content",
		height: "fit-content",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin: "10px",
		flexGrow: 1,
		flexShrink: 0,
	};

	return (
		<div style={NotFoundPageContainer}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb"
					sx={{
						fontSize: isMobile && "0.7em"
					}}>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>WishList</p>
					</Breadcrumbs>
				</div>
			</div>
			<div style={productsStyles}>
				{wishlistProducts.map((product, index) => (
					<div style={innerContainerStyles} key={index}>
						<ProductContainer
							key={index}
							product={product}
							title={product.title}
							onSale={product.discountAmount > 0 ? true : false}
							isNew={product.newProduct}
							price={product.price}
							image={product.image}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default WishlistPage;
