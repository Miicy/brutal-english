import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import ProductContainer from "./ProductContainer";
import { filterProducts } from "../../components/filter/filterComponent.actions";
import { useMediaQuery } from "@mui/material";

function Products({ products, isNewState = false }) {
	const isScreenSmall= useMediaQuery('(max-width: 1400px)');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//style

	const productsShowMoreContainerStyles = {
		height: "fit-content",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding:"10px"
	};
	const productsStyles = {
		height: "fit-content",
		width: "100%",
		display: "grid",
		gridTemplateColumns: isScreenSmall
		? "repeat(auto-fill, minmax(200px, 1fr))"
		: isDesktop
		? "repeat(auto-fill, minmax(190px, 1fr))"
		: isMobile
		? "repeat(auto-fill, minmax(200px, 1fr))"
		: null,
		gridGap: isDesktop ? "10px" : "20px",
		justifyItems: "center",
		transitionDelay: "0.2s",
		margin: "10px",
	};

	const productsShowMore = {
		width: "95%",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-end",
		height: "5%",
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

	//showmoreclick

	const handleShowMoreClick = (value) => {
		const initialValues = {
			category: [],
			additionalArray: [value],
			minPrice: "",
			maxPrice: "",
			brand: [],
		};
		dispatch(filterProducts(initialValues))
			.then((data) => {
				navigate("/filter", { state: data.products });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div style={productsShowMoreContainerStyles}>
			<div style={productsStyles}>
				{products ? (
					products
					.filter((product) => !product.outOfStock)
					.slice(0, 12)
					.map((product, index) => (
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
					))
				) : (
					<p>No products are available.</p>
				)}
			</div>
			<div style={productsShowMore}>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
						height: "50px",
					}}
					className="hover-style-white"
					onClick={() =>
						handleShowMoreClick(isNewState ? "newProduct" : "isDiscount")
					}
				>
					Show More
					<KeyboardArrowRightOutlinedIcon />
				</div>
			</div>
		</div>
	);
}

export default Products;
