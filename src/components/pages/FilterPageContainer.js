import { useTheme } from "@emotion/react";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductContainer from "../other/ProductContainer";

function FilterPage() {
	const theme = useTheme();
	const isScreenSmall= useMediaQuery('(max-width: 1400px)');
	const navigate = useNavigate();
	const { state } = useLocation();

	//if state empty
	const [emptyState, setEmptyState] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);

	useEffect(() => {
		if (Object.keys(state).length === 0) {
			setEmptyState(true);
		} else {
			setEmptyState(false);
		}
	}, [state]);

	//styles

	const filterPageContentContainerStyles = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		minHeight:"100vh",
		height: emptyState ? "100vh" : "fit-content",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1em" : "1em",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	const filteredProductsContainer = {
		height: "fit-content",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
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

	const productsStyles = {
		height: "fit-content",
		width: "100%",
		alignItems: "flex-start",
		flexWrap: "wrap",
		transitionDelay: "0.2s",
		margin: "10px",
		display: "grid",
		gridTemplateColumns: isScreenSmall
		? "repeat(auto-fill, minmax(200px, 1fr))"
		: isDesktop
		? "repeat(auto-fill, minmax(230px, 1fr))"
		: isMobile
		? "repeat(auto-fill, minmax(200px, 1fr))"
		: null,
		gridGap: "5px",
		justifyItems: "center"
	};

	const handleLinkClick = () => {
		navigate("/");
	};
	return (
		<div style={filterPageContentContainerStyles}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb"
					sx={{
						fontSize: isMobile && "0.7em"
					}}>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={handleLinkClick}
						>
							Home Page
						</p>
						<p style={{ color: "black", fontWeight: "bold" }}>Filtered Products</p>
					</Breadcrumbs>
				</div>
			</div>
			<div style={filteredProductsContainer}>
				<div style={productsStyles}>
					{state ? (
						state.slice(0, 15).map((state, index) => (
							<div style={innerContainerStyles} key={index}>
								<ProductContainer
									key={index}
									product={state}
									title={state.title}
									onSale={state.discountAmount > 0 ? true : false}
									isNew={state.newProduct}
									price={state.price}
									image={state.image}
								/>
							</div>
						))
					) : (
						<p>No products are available.</p>
					)}
				</div>
			</div>

			{emptyState && (
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<p>No products match the applied filters.</p>
				</div>
			)}
		</div>
	);
}

export default FilterPage;
