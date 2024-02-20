import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import { Button, Checkbox, Input, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { filterProducts } from "./filterComponent.actions";
import useGetAllBrands from "../../helpers/hooks/useGetAllBrands";
import useGetProductCategories from "../../adminPanel/components/hooks/useGetProductCategories";

import "./filter.css";

function FilterComponentMainPage() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isScreenSmallButtons= useMediaQuery('(max-width: 1600px)');

	const filterComponentContainerStyles = {
		position: "sticky",
		top: "125px",
		width: isDesktop ? "100%" : "100%",
		height: isDesktop ? "80vh" : "fit-content",
		backgroundColor: theme.palette.primary.main,
		boxShadow: isDesktop ? "0px 0px 5px 1px rgba(0, 0, 0, 0.9)" : null,
		borderRadius: isDesktop ? "5px" : null,
		border: isDesktop && `1.5px solid  ${theme.palette.secondary.main}`,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		overflowY: isDesktop ? "auto" : null,
		overflowX: "hidden",
		minWidth: "270px",
		borderBottom: isMobile
			? `1.5px solid ${theme.palette.white.main}`
			: `1.5px solid  ${theme.palette.secondary.main}`,
	};

	const filterStyles = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "60px",
		width: "100%",
		padding: "5px",
		borderBottom: `1.5px solid ${theme.palette.white.opacity20}`,
		backgroundColor: isMobile && theme.palette.primaryLighter.main,
	};

	const filterTextStyles = {
		width: "90%",
		cursor: "pointer",
		marginLeft: "10px",
		fontSize: "1.2em",
		fontWeight: "bold",
		textDecoration: "none",
		transition: "color 0.3s",
		display: "flex",
		justifyContent: "space-between",
	};

	const categoriesContainerStyles = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "fit-content",
		width: "100%",
		animation: "expandAnimation 0.2s ease 0s 1 normal forwards",
	};

	const expandedContainerStyles = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "fit-content",
		width: "100%",
		borderBottom: `1.5px solid ${theme.palette.white.opacity20}`,
		padding: "10px 0 10px 0",
		animation: "expandAnimation 0.2s ease 0s 1 normal forwards",
	};

	const categoriesStyles = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "fit-content",
		width: "80%",
		padding: "6px 0 6px 0",
		fontSize: isDesktop && isScreenSmallButtons ? "0.8em" : "1em",
		color: theme.palette.white.second,
		cursor: "pointer",
		transition: "color 0.3s",
	};

	//price styles

	const filterSliderStyles = {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		width: "85%",
	};

	const priceInputStyles = {
		border: ` 2px solid black`,
		width: "80px",
		backgroundColor: `${theme.palette.white.main}`,
	};

	const filterSliderTitleContainerStyles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	const filterSliderTitleStyles = {
		color: `${theme.palette.white.main}`,
		padding: "0 0 5px 0",
	};

	//expand
	const [expandCategories, setExpandCategories] = useState(false);
	const [expandTags, setExpandTags] = useState(false);
	const [expandPrice, setExpandPrice] = useState(false);
	const [expandBrands, setExpandBrands] = useState(false);

	const toggleExpand = (setState) => {
		setState((prevState) => !prevState);
	};

	//categories
	const { categories } = useGetProductCategories();
	const brands = useGetAllBrands();

	const initialValues = {
		category: [],
		additionalArray: [],
		minPrice: "",
		maxPrice: "",
		brand: [],
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			dispatch(filterProducts(values))
				.then((data) => {
					navigate("/filter", { state: data.products });
				})
				.catch((error) => {
					console.error(error);
				});
		},
	});

	const handleAdditionalArrayChange = (name) => {
		const currentAdditionalArray = formik.values.additionalArray || [];
		const updatedAdditionalArray = currentAdditionalArray.includes(name)
			? currentAdditionalArray.filter((id) => id !== name)
			: [...currentAdditionalArray, name];

		formik.setFieldValue("additionalArray", updatedAdditionalArray);
	};

	const handleCategoryCheckBoxChange = (categoryId) => {
		const currentCategories = formik.values.category || [];
		const updatedCategories = currentCategories.includes(categoryId)
			? currentCategories.filter((id) => id !== categoryId)
			: [...currentCategories, categoryId];

		formik.setFieldValue("category", updatedCategories);
	};

	const handleBrandCheckBoxChange = (brandId) => {
		const currentBrands = formik.values.brand || [];
		const updatedBrands = currentBrands.includes(brandId)
			? currentBrands.filter((id) => id !== brandId)
			: [...currentBrands, brandId];

		formik.setFieldValue("brand", updatedBrands);
	};

	//price

	const [minPrice, setMinPrice] = useState(formik.initialValues.minPriceFormik);
	const [maxPrice, setMaxPrice] = useState(formik.initialValues.maxPriceFormik);

	const handleMinInputChange = (event) => {
		const value = event.target.value === "" ? "" : Number(event.target.value);
		setMinPrice(value);
		setMaxPrice((prevMaxPrice) =>
			value > prevMaxPrice ? value : prevMaxPrice,
		);
		formik.setFieldValue("minPrice", value);
	};
	const handleMaxInputChange = (event) => {
		const value = event.target.value === "" ? "" : Number(event.target.value);
		setMaxPrice(value);
		setMinPrice((prevMinPrice) =>
			value < prevMinPrice ? value : prevMinPrice,
		);
		formik.setFieldValue("maxPrice", value);
	};

	const handleFormSubmit = () => {
		formik.submitForm();
	};

	return (
		<div style={filterComponentContainerStyles}>
			<form onSubmit={formik.handleSubmit} style={categoriesContainerStyles}>
				<div style={filterStyles}>
					<div
						style={{
							...filterTextStyles,
							color: expandCategories ? "#ff6600" : "white",
							fontSize: isDesktop && isScreenSmallButtons ? "0.9em" : null,


						}}
						className="filter-hover"
						onClick={() => toggleExpand(setExpandCategories)}
					>
						Categories
						{expandCategories ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{expandCategories && (
					<div style={expandedContainerStyles}>
						{categories.map((category, index) => (
							<label
								key={index}
								style={
									formik.values.category.includes(category._id)
										? { ...categoriesStyles, color: "#ff6600" }
										: categoriesStyles
								}
								className="filter-hover"
							>
								{category.name}
								<Checkbox
									name={category.name}
									checked={formik.values.category.includes(category._id)}
									onChange={() => handleCategoryCheckBoxChange(category._id)}
									size="small"
									color="secondary"
								/>
							</label>
						))}
					</div>
				)}
				<div style={filterStyles}>
					<div
						style={{
							...filterTextStyles,
							color: expandTags ? "#ff6600" : "white",
							fontSize: isDesktop && isScreenSmallButtons ? "0.9em" : null,
						}}
						className="filter-hover"
						onClick={() => toggleExpand(setExpandTags)}
					>
						Tags
						{expandTags ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{expandTags && (
					<div style={expandedContainerStyles}>
						<label
							style={
								formik.values.novo
									? { ...categoriesStyles, color: "#ff6600" }
									: categoriesStyles
							}
							className="filter-hover"
						>
							New
							<Checkbox
								name="novo"
								checked={formik.values.additionalArray.includes("newProduct")}
								onChange={() => handleAdditionalArrayChange("newProduct")}
								size="small"
								color="secondary"
							/>
						</label>
						<label
							style={
								formik.values.naAkciji
									? { ...categoriesStyles, color: "#ff6600" }
									: categoriesStyles
							}
							className="filter-hover"
						>
							On sale
							<Checkbox
								name="naAkciji"
								checked={formik.values.additionalArray.includes("isDiscount")}
								onChange={() => handleAdditionalArrayChange("isDiscount")}
								size="small"
								color="secondary"
							/>
						</label>
					</div>
				)}
				<div style={filterStyles}>
					<div
						style={{
							...filterTextStyles,
							color: expandPrice ? "#ff6600" : "white",
							fontSize: isDesktop && isScreenSmallButtons ? "0.9em" : null,
						}}
						className="filter-hover"
						onClick={() => toggleExpand(setExpandPrice)}
					>
						Price Range
						{expandPrice ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{expandPrice && (
					<div
						style={{
							...expandedContainerStyles,
							mb: "20px",
							padding: "20px 0 20px 0",
						}}
					>
						<div style={filterSliderStyles}>
							<div style={filterSliderTitleContainerStyles}>
								<div style={filterSliderTitleStyles}>Min:</div>
								<Input
									sx={priceInputStyles}
									value={formik.values.minPrice}
									onChange={handleMinInputChange}
									inputProps={{
										step: 10,
										min: 0,
										max: maxPrice,
										type: "number",
										"aria-labelledby": "input-slider",
									}}
								/>
							</div>
							<div style={filterSliderTitleContainerStyles}>
								<div style={filterSliderTitleStyles}>Max:</div>
								<Input
									sx={priceInputStyles}
									value={formik.values.maxPrice}
									onChange={handleMaxInputChange}
									inputProps={{
										step: 10,
										min: minPrice,
										max: 100,
										type: "number",
										"aria-labelledby": "input-slider",
									}}
								/>
							</div>
						</div>
					</div>
				)}
				<div style={filterStyles}>
					<div
						style={{
							...filterTextStyles,
							color: expandBrands ? "#ff6600" : "white",
							fontSize: isDesktop && isScreenSmallButtons ? "0.9em" : null,
						}}
						className="filter-hover"
						onClick={() => toggleExpand(setExpandBrands)}
					>
						Brands
						{expandBrands ? (
							<KeyboardArrowDownIcon />
						) : (
							<KeyboardArrowRightIcon />
						)}
					</div>
				</div>
				{expandBrands && (
					<div style={expandedContainerStyles}>
						{brands.map((brand, index) => (
							<label
								key={index}
								style={
									formik.values.brand.includes(brand._id)
										? { ...categoriesStyles, color: "#ff6600" }
										: categoriesStyles
								}
								className="filter-hover"
							>
								{brand.name}
								<Checkbox
									name={brand.name}
									checked={formik.values.brand.includes(brand._id)}
									onChange={() => handleBrandCheckBoxChange(brand._id)}
									size="small"
									color="secondary"
								/>
							</label>
						))}
					</div>
				)}
			</form>
			<div
				style={{
					width: "100%",
					padding: isDesktop ? "10px 0 10px 0" : "20px 0 20px 0",
					marginBottom: "2px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderTop:
						isDesktop && `1.5px solid ${theme.palette.white.opacity20}`,
					borderBottom:
						isMobile && `1.5px solid ${theme.palette.white.opacity20}`,
					backgroundColor: theme.palette.primary.main,
					flexDirection: "row",
				}}
			>
				<Button
					type="submit"
					variant="outlined"
					color="customRed"
					onClick={() => {
						formik.handleReset();
						setExpandBrands(false);
						setExpandCategories(false);
						setExpandPrice(false);
						setExpandTags(false);
					}}
					sx={{
						marginLeft: "10px",
						width:isDesktop && isScreenSmallButtons ? "40%" : "45%", 
						"&:hover": {
							color: theme.palette.white.main,
						},
						fontSize: isDesktop && isScreenSmallButtons ? "0.5em" : "0.8em"  }} 
				>
					Reset fitlers
				</Button>

				<Button
					type="submit"
					variant="contained"
					color="secondary"
					onClick={handleFormSubmit}
					sx={{
						marginRight: "10px",
						width:isDesktop && isScreenSmallButtons ? "40%" : "45%", 
						backgroundColor: theme.palette.secondary.main,
						"&:hover": {
							color: theme.palette.white.main,
						},
						fontSize: isDesktop && isScreenSmallButtons ? "0.5em" : "0.8em" 
					}}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
}
export default FilterComponentMainPage;
