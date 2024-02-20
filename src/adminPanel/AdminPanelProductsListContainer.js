import { Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import {
	getBrandNameFromId,
	getCategoryNameFromId,
} from "../helpers/functions";

import useGetAllProducts from "../helpers/hooks/useGetAllProducts";
import { applyDiscount } from "../components/pages/SingleProductPage";
import { isDesktop, isMobile } from "react-device-detect";

const AdminPanelProductsListContainer = ({ categories, brands }) => {
	const theme = useTheme();
	const isScreenSmall= useMediaQuery('(max-width: 1400px)');
	const navigate = useNavigate();
	const products = useGetAllProducts();

	const handleProductClick = (productId) => {
		navigate(`/admin/product-edit/${productId}`);
	};

	if (!products) return null;

	//style

	const gridStyles = {
		display: "grid",
		gridTemplateColumns: "0.3fr 1fr 1fr 1fr 1fr 1fr 0.4fr ",
		gridTemplateRows: "1fr",
		gap: "0px 0px",
	};

	const adminPanelProductsTitlesStyles = {
		...gridStyles,
		backgroundColor: theme.palette.primaryLighter.opacity95,
		width: "100%",
		height: "70px",
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
		color: "white",
		fontSize: isScreenSmall ? "0.9em" : (isDesktop ? "0.95em" :(isMobile ? "0.7em" : null)),
	};

	const adminPanelProductsTitles = {
		display: "flex",
		alignItems: "center",
		fontWeight: "bold",
		
	};

	return (
		<div
			style={{
				height: "100%",
				width: "83%",
			}}
		>
			<div style={adminPanelProductsTitlesStyles}>
				<div style={{ ...adminPanelProductsTitles, marginLeft: "5px" }}>
					Num.
				</div>
				<div style={{ ...adminPanelProductsTitles }}>Name</div>
				<div style={{ ...adminPanelProductsTitles }}>Brand</div>
				<div style={{ ...adminPanelProductsTitles }}>Categories</div>
				<div style={{ ...adminPanelProductsTitles }}>Discount</div>
				<div style={{ ...adminPanelProductsTitles }}>Price without discount</div>
				<div style={{ ...adminPanelProductsTitles }}>In stock</div>
			</div>
			<div
				style={{
					backgroundColor: "white",
				}}
			>
				{products.map((product, index) => (
					<Tooltip key={index} title={`Change product: ${product.title}`}>
						<div
							style={{
								...gridStyles,
								cursor: "pointer",
								borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
								color: "black",
								fontSize: isScreenSmall ? "0.8em" : (isDesktop ? "0.95em" :(isMobile ? "0.7em" : null)),
							}}
							key={product._id}
							onClick={() => handleProductClick(product._id)}
						>
							<div>
								<p style={{ marginLeft: "10px" }}>{index}.</p>
							</div>
							<div>
								<p style={{}}>{product.title}</p>
							</div>
							<div>
								<p style={{}}>{getBrandNameFromId(brands, product.brand)}</p>
							</div>
							<div>
								{product.category.map((category) => (
									<p key={category} style={{}}>
										{getCategoryNameFromId(categories, category)}
									</p>
								))}
							</div>
							<div>
								<p style={{}}>{`${product.discountAmount} % (${applyDiscount(
									product.price,
									product.discountAmount,
								)})`}</p>
							</div>
							<div>
								<p style={{}}>{product.price}</p>
							</div>
							<div>
								<p style={{}}>{product.outOfStock ? <div style={{color:"red"}}>No</div> : <div style={{color:"green"}}>Yes</div>}</p>
							</div>
						</div>
					</Tooltip>
				))}
			</div>
		</div>
	);
};

export default AdminPanelProductsListContainer;
