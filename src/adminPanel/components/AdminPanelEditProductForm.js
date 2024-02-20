import { v4 } from "uuid";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { Formik, Field, Form } from "formik";
import { isDesktop } from "react-device-detect";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
	Button,
	Checkbox,
	Breadcrumbs,
	useMediaQuery,
	InputAdornment,
	CircularProgress,
} from "@mui/material";

import {
	ref,
	uploadBytes,
	deleteObject,
	getDownloadURL,
} from "firebase/storage";

import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";

import {
	getProduct,
	editProduct,
	deleteProduct,
	deleteProductImage,
	updateProductStock,
} from "../adminPanel.actions";

import { STORAGE } from "../../firebase";
import backgroundImage from "../../media/dumbbells-gym.jpg";
import SelectFormik from "../../components/formik/SelectFormik";
import useGetAllBrands from "../../helpers/hooks/useGetAllBrands";
import useGetProductCategories from "./hooks/useGetProductCategories";
import InputFieldFormik from "../../components/formik/InputFieldFormik";
import { DATA_STATE, NOTIFICATION_TYPES } from "../../helpers/app.constants";
import SelectMultipleFormik from "../../components/formik/SelectMultipleFormik";
import ReactQuill from "react-quill";

const FORM_FIELDS = {
	TITLE: "title",
	DESCRIPTION: "description",
	PRICE: "price",
	CATEGORY: "category",
	BRAND: "brand",
	IMAGE: "image",
	QUANTITY: "quantity",
	DISCOUNT_AMOUNT: "discountAmount",
	ISNEW: "newProduct",
	SECOND_IMAGE: "secondImage",
	THIRD_IMAGE: "thirdImage",
	FLAVORS: "flavors",
};

const AdminPanelEditProductForm = () => {
	const navigate = useNavigate();
	const { categories } = useGetProductCategories();
	const brands = useGetAllBrands();
	const theme = useTheme();
	const { id } = useParams();
	const dispatch = useDispatch();
	const screenSize = useMediaQuery("(max-width: 950px)");

	const [image, setImage] = useState(null);
	const [image2, setImage2] = useState(null);
	const [image3, setImage3] = useState(null);
	const [flavors, setFlavors] = useState([]);
	const [product, setProduct] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [editIndex, setEditIndex] = useState(null);
	const [outOfStock, setOutOfStock] = useState(false);

	useEffect(() => {
		if (id) {
			dispatch(getProduct(id))
				.then((data) => {
					setProduct(data.product);
					setImage(data.product.image);
					setImage2(data.product.secondImage);
					setImage3(data.product.thirdImage);
					setOutOfStock(data.product.outOfStock);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id, dispatch]);

	const initialValues = useMemo(() => {
		if (product)
			return {
				[FORM_FIELDS.TITLE]: product.title,
				[FORM_FIELDS.DESCRIPTION]: product.description,
				[FORM_FIELDS.PRICE]: product.price,
				[FORM_FIELDS.CATEGORY]: product.category,
				[FORM_FIELDS.BRAND]: product.brand,
				[FORM_FIELDS.IMAGE]: product.image,
				[FORM_FIELDS.QUANTITY]: product.quantity,
				[FORM_FIELDS.DISCOUNT_AMOUNT]: product.discountAmount,
				[FORM_FIELDS.ISNEW]: product.newProduct,
				[FORM_FIELDS.SECOND_IMAGE]: product.secondImage,
				[FORM_FIELDS.THIRD_IMAGE]: product.thirdImage,
				[FORM_FIELDS.FLAVORS]: product.flavors,
			};
	}, [product]);

	useEffect(() => {
		if (initialValues) {
			setFlavors(initialValues[FORM_FIELDS.FLAVORS]);
		}
	}, [initialValues]);

	const validationSchema = Yup.object().shape({
		[FORM_FIELDS.TITLE]: Yup.string().required("Product name required!"),
		[FORM_FIELDS.DESCRIPTION]: Yup.string().required(
			"Product description required!",
		),
		[FORM_FIELDS.PRICE]: Yup.number().required("Product price required!"),
		[FORM_FIELDS.CATEGORY]: Yup.array()
			.required("Product category required!")
			.min(1, "Product must have at least one category!"),
		[FORM_FIELDS.BRAND]: Yup.string().required("Product brand required!"),
		[FORM_FIELDS.IMAGE]: Yup.string().required("Product image required!"),
		[FORM_FIELDS.QUANTITY]: Yup.number().required("Quantity is required!"),
	});

	const onSubmit = (formValues) => {
		const newProduct = {
			[FORM_FIELDS.TITLE]: formValues[FORM_FIELDS.TITLE],
			[FORM_FIELDS.DESCRIPTION]: formValues[FORM_FIELDS.DESCRIPTION],
			[FORM_FIELDS.PRICE]: parseInt(formValues[FORM_FIELDS.PRICE]),
			[FORM_FIELDS.CATEGORY]: formValues[FORM_FIELDS.CATEGORY],
			[FORM_FIELDS.BRAND]: formValues[FORM_FIELDS.BRAND],
			[FORM_FIELDS.IMAGE]: formValues[FORM_FIELDS.IMAGE],
			[FORM_FIELDS.QUANTITY]: parseInt(formValues[FORM_FIELDS.QUANTITY]),
			[FORM_FIELDS.DISCOUNT_AMOUNT]: parseInt(
				formValues[FORM_FIELDS.DISCOUNT_AMOUNT],
			),
			[FORM_FIELDS.ISNEW]: formValues[FORM_FIELDS.ISNEW],
			[FORM_FIELDS.SECOND_IMAGE]: formValues[FORM_FIELDS.SECOND_IMAGE],
			[FORM_FIELDS.THIRD_IMAGE]: formValues[FORM_FIELDS.THIRD_IMAGE],
			[FORM_FIELDS.FLAVORS]: formValues[FORM_FIELDS.FLAVORS],
		};
		dispatch(editProduct(product._id, newProduct)).then(() =>
			navigate("/admin/admin-panel"),
		);
	};

	const handleProductDelete = (id) => {
		dispatch(deleteProduct(id)).then(() => navigate("/admin/admin-panel"));
	};

	const handleImageDelete = (form, field) => {
		let imageRef = null;
		if (field === FORM_FIELDS.IMAGE) {
			imageRef = ref(STORAGE, image);
		} else if (field === FORM_FIELDS.SECOND_IMAGE) {
			imageRef = ref(STORAGE, image2);
		} else if (field === FORM_FIELDS.THIRD_IMAGE) {
			imageRef = ref(STORAGE, image3);
		}
		deleteObject(imageRef)
			.then(() => {
				if (field === FORM_FIELDS.IMAGE) {
					setImage(null);
				} else if (field === FORM_FIELDS.SECOND_IMAGE) {
					setImage2(null);
				} else if (field === FORM_FIELDS.THIRD_IMAGE) {
					setImage3(null);
				}
				form.setFieldValue(field, null);
				dispatch(deleteProductImage(id, field)).then(() => {
					const notificationPayload = {
						text: "Image deleted!",
						type: NOTIFICATION_TYPES.SUCCESS,
					};
					dispatch(displayNotification(notificationPayload));
				});
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error ocurred!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	//flavor

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleAddFlavor = (form) => {
		if (inputValue.trim() !== "") {
			if (editIndex !== null) {
				const updatedFlavors = flavors.map((flavor, index) =>
					index === editIndex ? inputValue : flavor,
				);
				setFlavors(updatedFlavors);
				form.setFieldValue(FORM_FIELDS.FLAVORS, updatedFlavors);
				setEditIndex(null);
			} else {
				setFlavors([...flavors, inputValue]);
				form.setFieldValue(FORM_FIELDS.FLAVORS, [...flavors, inputValue]);
			}

			setInputValue("");
		}
	};

	const handleEditFlavor = (index) => {
		setInputValue(flavors[index]);
		setEditIndex(index);
	};

	const handleDeleteFlavor = (index, form) => {
		const updatedFlavors = flavors.filter((flavor, i) => i !== index);
		setFlavors(updatedFlavors);
		form.setFieldValue(FORM_FIELDS.FLAVORS, updatedFlavors);
	};

	const handleUpdateProductStock = (outOfStock) => {
		dispatch(updateProductStock(product._id, outOfStock))
			.then((response) => {
				setOutOfStock(outOfStock);
				const notificationPayload = {
					text: response,
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error occured!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	const adminAddFormContainerStyles = {
		height: "100%",
		minHeight: "100vh",
		width: "83%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		padding:"40px 0px"
	};
	const adminInputContainerStyles = {
		minWidth: "150px",
		width: "49%",
	};

	const adminAddProductContainerStyles = {
		borderRadius: "5px",
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "space-between",
		width: "100%",
	};

	const adminAddProductFormStyles = {
		gap: "5px",
		display: "flex",
		flexDirection: "column",
		alignContent: "space-between",
		flexWrap: "wrap",
		padding: "40px",
		width: "75%",
		border: "1px solid lightgrey",
		borderRadius: "5px",
		boxShadow: "0px 0px 16px 4px rgba(0,0,0,0.15)",
	};

	const adminAddProductFieldContainerStyles = {
		display: "flex",
		justifyContent: "space-between",
	};

	if (!brands || !categories || !product) return null;

	return (
		isDesktop && (
			<div
				style={{
					height: "90%",
					minHeight: "100vh",
					width: "100%",
					marginTop: 76,
					backgroundColor: theme.palette.primaryLighter.opacity95,
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					borderRadius: "5px",
					color: theme.palette.white.main,
					boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
				}}
			>
				<div
					style={{
						width: "17%",
						minWidth: "150px",
						boxShadow: " 0px 0px 18px -6px rgba(0,0,0,1)",
						display: "flex",
						flexDirection: " column",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				></div>
				<div style={adminAddFormContainerStyles}>
					<Formik
						validateOnMount
						initialValues={initialValues}
						validationSchema={validationSchema}
					>
						{({ values, isValid }) => (
							<Form style={adminAddProductFormStyles}>
								<div style={adminAddProductContainerStyles}>
									<h3
										style={{
											fontWeight: "bold",
											color: "black",
											width: "100%",
											textAlign: "center",
										}}
									>
										Editing product: {product.title}
									</h3>
									<div
										style={{
											display: "flex",
											alignItems: "flex-start",
											width: "100%",
											justifyContent: "space-between",
										}}
									>
										<Field name={FORM_FIELDS.TITLE}>
											{({ form, ...formik }) => (
												<InputFieldFormik
													form={form}
													{...formik}
													label="Product Name"
													sx={{ width: "40%" }}
													fullWidth
													size="small"
												/>
											)}
										</Field>
										<div
											style={{
												...adminAddProductFieldContainerStyles,
												justifyContent: "flex-start",
											}}
										>
											<Field name={FORM_FIELDS.ISNEW}>
												{({ form, ...formik }) => (
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															color: "grey",
														}}
													>
														<Checkbox
															checked={values[FORM_FIELDS.ISNEW]}
															onChange={() =>
																form.setFieldValue(
																	FORM_FIELDS.ISNEW,
																	!values[FORM_FIELDS.ISNEW],
																)
															}
															label="novo"
														/>
														<label htmlFor="customCheckbox">New Product</label>
													</div>
												)}
											</Field>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-around",
											}}
										>
											<Button
												variant="contained"
												onClick={() => onSubmit(values)}
												disabled={!isValid}
												sx={{ width: "40%" }}
											>
												Save
											</Button>
											<Button
												variant="contained"
												onClick={() => handleProductDelete(product._id)}
												color="customRed"
												sx={{ width: "40%" }}
											>
												Delete
											</Button>
										</div>
									</div>

									<div style={{ height: "220px" }}>
										<Field name={FORM_FIELDS.DESCRIPTION}>
											{({ field }) => (
												<ReactQuill
													style={{
														height: "150px",
														width: "100%",
														color: "black",
													}}
													value={field.value || ""}
													onChange={field.onChange(field.name)}
													placeholder={"Product Description"}
												/>
											)}
										</Field>
									</div>

									<div
										style={{
											...adminAddProductFieldContainerStyles,
											marginBottom: "15px",
										}}
									>
										<Field name={FORM_FIELDS.PRICE}>
											{({ form, ...formik }) => (
												<InputFieldFormik
													form={form}
													{...formik}
													label="Price"
													sx={adminInputContainerStyles}
													size="small"
													InputProps={{
														endAdornment: (
															<InputAdornment position="start">
																€
															</InputAdornment>
														),
													}}
												/>
											)}
										</Field>
										<Field name={FORM_FIELDS.DISCOUNT_AMOUNT}>
											{({ form, ...formik }) => (
												<InputFieldFormik
													form={form}
													{...formik}
													label="Discount"
													sx={adminInputContainerStyles}
													size="small"
													InputProps={{
														endAdornment: (
															<InputAdornment position="start">
																%
															</InputAdornment>
														),
													}}
												/>
											)}
										</Field>
									</div>
									<div
										style={{
											...adminAddProductFieldContainerStyles,
											marginBottom: "3px",
											width: "100%",
										}}
									>
										<Field name={FORM_FIELDS.BRAND}>
											{({ form, ...formik }) => (
												<SelectFormik
													values={brands}
													form={form}
													{...formik}
													title="Brand"
													edit={true}
												/>
											)}
										</Field>
										{!categories ? (
											<CircularProgress />
										) : (
											<Field name={FORM_FIELDS.CATEGORY}>
												{({ form, ...formik }) => (
													<SelectMultipleFormik
														values={categories}
														form={form}
														{...formik}
														title="Categories"
														edit={true}
													/>
												)}
											</Field>
										)}
									</div>
								</div>

								<div
									style={{
										...adminAddProductContainerStyles,
										justifyContent: "space-between",
										flexDirection: "row",
									}}
								>
									<Field name={FORM_FIELDS.FLAVORS}>
										{({ field, form }) => (
											<div
												style={{
													height: "fit-content: ",
													color: "black",
													display: "flex",
													justifyContent: "flex-start",
													alignItems: "center",
													flexDirection: "column",
													width: "49%",
												}}
											>
												<div style={{ width: "100%" }}>
													<input
														type="text"
														value={inputValue}
														onChange={handleInputChange}
														style={{
															width: "70%",
															height: "45px",
															borderRadius: "5px",
															borderWidth: "1px",
															height: "35px",
															paddingLeft: "10px",
														}}
														placeholder="Flavor..."
													/>
													<Button
														variant="contained"
														sx={{
															cursor: "pointer",
															width: "25%",
															minWidth: "20px",
															marginLeft: "5px",
															height: "39px",
															fontSize: "0.7em",
															backgroundColor: "lightgrey !important",
															color: "black !important",
															boxShadow: "none",
														}}
														onClick={() => handleAddFlavor(form)}
													>
														{editIndex !== null ? "Save flavor" : "Add"}
													</Button>
													<div
														style={{
															minHeight: "220px",
															height: "fit-content",
															maxHeight: "550px",
															border: "1px solid grey",
															marginTop: "10px",
															borderRadius: "5px",
														}}
													>
														{field.value.map((flavor, index) => (
															<div
																key={index}
																style={{
																	display: "flex",
																	width: "100%",
																	justifyContent: "space-between",
																}}
															>
																<p style={{ marginLeft: "5px" }} key={index}>
																	- {flavor}
																</p>
																<div
																	style={{
																		width: "40%",
																		display: "flex",
																		justifyContent: "flex-end",
																		alignItems: "center",
																		marginRight: "5px",
																	}}
																>
																	<Button
																		variant="contained"
																		color="grey"
																		style={{
																			width: "60px",
																			height: "50%",
																			cursor: "pointer",
																			boxShadow: "none",
																			fontWeight: "400",
																			marginRight: "5px",
																		}}
																		onClick={() => handleEditFlavor(index)}
																	>
																		Edit
																	</Button>
																	<Button
																		variant="contained"
																		color="grey"
																		style={{
																			width: "60px",
																			height: "50%",
																			cursor: "pointer",
																			boxShadow: "none",
																			fontWeight: "400",
																		}}
																		onClick={() =>
																			handleDeleteFlavor(index, form)
																		}
																	>
																		Delete
																	</Button>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										)}
									</Field>
									<div
										style={{
											...adminAddProductContainerStyles,
											justifyContent: "space-between",
											flexDirection: "row",
											width: "50%",
										}}
									>
										<Field name={FORM_FIELDS.IMAGE}>
											{({ form }) => (
												<div
													style={{
														height: "98%",
														width: "50%",
														position: "relative",
														padding: "3px",
													}}
												>
													<div
														style={{
															color: "black",
															width: "100%",
															display: "flex",
															justifyContent: "center",
															position: "absolute",
														}}
													></div>
													{image ? (
														<>
															<div
																style={{
																	height: "268px",
																	width: "100%",
																	backgroundColor: "grey",
																	borderRadius: "5px",
																	position: "relative",
																}}
															>
																<img
																	src={image}
																	alt="Image"
																	style={{
																		width: "100%",
																		height: "100%",
																		objectFit: "contain",
																	}}
																></img>
															</div>
															<Button
																variant="contained"
																color="customRed"
																onClick={() =>
																	handleImageDelete(form, FORM_FIELDS.IMAGE)
																}
																sx={{
																	position: "absolute",
																	bottom: "50%",
																	left: "50%",
																	transform: "translateX(-50%)",
																}}
															>
																Delete
															</Button>
														</>
													) : (
														<div
															style={{
																width: "99%",
																height: "100%",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																border: "1px solid grey",
																borderRadius: "5px",
															}}
														>
															<Button
																variant="contained"
																component="label"
																sx={{
																	backgroundColor: "lightgrey !important",
																	color: "black !important",
																	boxShadow: "none",
																}}
															>
																+
																<input
																	hidden
																	accept="image/*"
																	type="file"
																	onChange={(event) => {
																		const image = event.target.files[0];
																		const imageRef = ref(
																			STORAGE,
																			`images/${image.name + v4()}`,
																		);
																		dispatch(
																			setDataState(
																				DATA_STATE.DATA_STATE_LOADING,
																			),
																		);
																		uploadBytes(imageRef, image)
																			.then((response) => {
																				getDownloadURL(response.ref).then(
																					(url) => {
																						form.setFieldValue(
																							FORM_FIELDS.IMAGE,
																							url,
																						);
																						setImage(url);
																						const notificationPayload = {
																							text: "Image saved!",
																							type: NOTIFICATION_TYPES.SUCCESS,
																						};
																						dispatch(
																							displayNotification(
																								notificationPayload,
																							),
																						);
																						dispatch(
																							setDataState(
																								DATA_STATE.DATA_STATE_OK,
																							),
																						);
																					},
																				);
																			})
																			.catch(() => {
																				const notificationPayload = {
																					text: "Error occured!",
																					type: NOTIFICATION_TYPES.ERROR,
																				};
																				dispatch(
																					displayNotification(
																						notificationPayload,
																					),
																				);
																				dispatch(
																					setDataState(
																						DATA_STATE.DATA_STATE_OK,
																					),
																				);
																			});
																	}}
																/>
															</Button>
														</div>
													)}
												</div>
											)}
										</Field>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												width: "50%",
											}}
										>
											<Field name={FORM_FIELDS.SECOND_IMAGE}>
												{({ form }) => (
													<>
														<div
															style={{
																height: "50%",
																position: "relative",
																padding: "3px",
															}}
														>
															<div
																style={{
																	color: "black",
																	width: "100%",
																	display: "flex",
																	justifyContent: "center",
																	position: "absolute",
																	width: "100%",
																}}
															>
																Image 2
															</div>
															{image2 ? (
																<>
																	<div
																		style={{
																			height: "130px",
																			width: "100%",
																			backgroundColor: "grey",
																			borderRadius: "5px",
																			position: "relative",
																		}}
																	>
																		<img
																			src={image2}
																			alt="Image 2"
																			style={{
																				width: "100%",
																				height: "100%",
																				objectFit: "contain",
																			}}
																		></img>

																		<Button
																			variant="contained"
																			color="customRed"
																			onClick={() =>
																				handleImageDelete(
																					form,
																					FORM_FIELDS.SECOND_IMAGE,
																				)
																			}
																			sx={{
																				position: "absolute",
																				bottom: "50%",
																				left: "50%",
																				transform: "translateX(-50%)",
																			}}
																		>
																			Delete
																		</Button>
																	</div>
																</>
															) : (
																<div
																	style={{
																		width: "100%",
																		height: "100%",
																		display: "flex",
																		justifyContent: "center",
																		alignItems: "center",
																		border: "1px solid grey",
																		borderRadius: "5px",
																	}}
																>
																	<Button
																		variant="contained"
																		component="label"
																		sx={{
																			backgroundColor: "lightgrey !important",
																			color: "black !important",
																			boxShadow: "none",
																		}}
																	>
																		+
																		<input
																			hidden
																			accept="image/*"
																			type="file"
																			onChange={(event) => {
																				const image = event.target.files[0];
																				const imageRef = ref(
																					STORAGE,
																					`images/${image.name + v4()}`,
																				);
																				dispatch(
																					setDataState(
																						DATA_STATE.DATA_STATE_LOADING,
																					),
																				);
																				uploadBytes(imageRef, image)
																					.then((response) => {
																						getDownloadURL(response.ref).then(
																							(url) => {
																								form.setFieldValue(
																									FORM_FIELDS.SECOND_IMAGE,
																									url,
																								);
																								setImage2(url);
																								const notificationPayload = {
																									text: "Image saved!",
																									type: NOTIFICATION_TYPES.SUCCESS,
																								};
																								dispatch(
																									displayNotification(
																										notificationPayload,
																									),
																								);
																								dispatch(
																									setDataState(
																										DATA_STATE.DATA_STATE_OK,
																									),
																								);
																							},
																						);
																					})
																					.catch(() => {
																						const notificationPayload = {
																							text: "Error occured!",
																							type: NOTIFICATION_TYPES.ERROR,
																						};
																						dispatch(
																							displayNotification(
																								notificationPayload,
																							),
																						);
																						dispatch(
																							setDataState(
																								DATA_STATE.DATA_STATE_OK,
																							),
																						);
																					});
																			}}
																		/>
																	</Button>
																</div>
															)}
														</div>
													</>
												)}
											</Field>

											<Field name={FORM_FIELDS.THIRD_IMAGE}>
												{({ form }) => (
													<>
														<div
															style={{
																height: "50%",
																position: "relative",
																padding: "3px",
															}}
														>
															<div
																style={{
																	color: "black",
																	width: "100%",
																	display: "flex",
																	justifyContent: "center",
																	position: "absolute",
																	width: "100%",
																}}
															>
																Image 3
															</div>
															{image3 ? (
																<>
																	<div
																		style={{
																			height: "130px",
																			width: "100%",
																			backgroundColor: "grey",
																			borderRadius: "5px",
																			position: "relative",
																		}}
																	>
																		<img
																			src={image3}
																			alt="Image 3"
																			style={{
																				width: "100%",
																				height: "100%",
																				objectFit: "contain",
																			}}
																		></img>
																	</div>
																	<div
																		style={{
																			display: "flex",
																			justifyContent: "center",
																			alignItems: "center",
																			marginTop: "16px",
																		}}
																	>
																		<Button
																			variant="contained"
																			color="customRed"
																			onClick={() =>
																				handleImageDelete(
																					form,
																					FORM_FIELDS.THIRD_IMAGE,
																				)
																			}
																			sx={{
																				position: "absolute",
																				bottom: "50%",
																				left: "50%",
																				transform: "translateX(-50%)",
																			}}
																		>
																			Delete
																		</Button>
																	</div>
																</>
															) : (
																<div
																	style={{
																		width: "100%",
																		height: "100%",
																		display: "flex",
																		justifyContent: "center",
																		alignItems: "center",
																		border: "1px solid grey",
																		borderRadius: "5px",
																	}}
																>
																	<Button variant="contained" component="label" sx={{
																	backgroundColor: "lightgrey !important",
																	color: "black !important",
																	boxShadow: "none",
																}}>
																		+
																		<input
																			hidden
																			accept="image/*"
																			type="file"
																			onChange={(event) => {
																				const image = event.target.files[0];
																				const imageRef = ref(
																					STORAGE,
																					`images/${image.name + v4()}`,
																				);
																				dispatch(
																					setDataState(
																						DATA_STATE.DATA_STATE_LOADING,
																					),
																				);
																				uploadBytes(imageRef, image)
																					.then((response) => {
																						getDownloadURL(response.ref).then(
																							(url) => {
																								form.setFieldValue(
																									FORM_FIELDS.THIRD_IMAGE,
																									url,
																								);
																								setImage3(url);
																								const notificationPayload = {
																									text: "Image saved!",
																									type: NOTIFICATION_TYPES.SUCCESS,
																								};
																								dispatch(
																									displayNotification(
																										notificationPayload,
																									),
																								);
																								dispatch(
																									setDataState(
																										DATA_STATE.DATA_STATE_OK,
																									),
																								);
																							},
																						);
																					})
																					.catch(() => {
																						const notificationPayload = {
																							text: "Error occured!",
																							type: NOTIFICATION_TYPES.ERROR,
																						};
																						dispatch(
																							displayNotification(
																								notificationPayload,
																							),
																						);
																						dispatch(
																							setDataState(
																								DATA_STATE.DATA_STATE_OK,
																							),
																						);
																					});
																			}}
																		/>
																	</Button>
																</div>
															)}
														</div>
													</>
												)}
											</Field>
										</div>
									</div>
								</div>
								<div
									style={{
										marginTop: "20px",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										fontSize: "0.8em",
										fontWeight: "bold",
										width:"50%"
									}}
								>
									<p>
										{outOfStock ? (
											<div style={{ color: "red" }}>No products in stock!</div>
										) : (
											<div style={{ color: "green" }}>Product in stock!</div>
										)}
									</p>
									<Button
										variant="contained"
										onClick={() => handleUpdateProductStock(!outOfStock)}
										style={{
											width: "55%",
											fontSize: "0.8em",
										}}
									>
										{outOfStock ? "Add to stock" : "Remove from stock"}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		)
	);
};

export default AdminPanelEditProductForm;
