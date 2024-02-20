import {
	Button,
	Dialog,
	TextField,
	DialogTitle,
	DialogActions,
	DialogContent,
	useMediaQuery,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";

import {
	addBrand,
	addCategory,
	deleteBrand,
	editBrandName,
	deleteCategory,
	editCategoryName,
	dispatchGetAllBrands,
	dispatchGetAllCategories,
} from "./adminPanel.actions";

import { NOTIFICATION_TYPES } from "../helpers/app.constants";
import { displayNotification } from "../store/reducers/notificationSlice";

function AdminPanelCategoriesBrands() {
	const dispatch = useDispatch();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");

	const [brands, setBrands] = useState(null);
	const [newName, setNewName] = useState(null);
	const [categories, setCategories] = useState(null);
	const [activeItem, setActiveItem] = useState(null);
	const [addNewBrandName, setAddNewBrandName] = useState("");
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [addNewCategoryName, setAddNewCategoryName] = useState("");

	useEffect(() => {
		dispatch(dispatchGetAllBrands()).then((data) => {
			setBrands(data);
		});
		dispatch(dispatchGetAllCategories()).then((data) => {
			setCategories(data);
		});
	}, [dispatch]);

	const handleItemEdit = (item, newName) => {
		if (item.type === "brand") {
			dispatch(editBrandName(item._id, newName)).then(() => {
				const notificationPayload = {
					text: "Name changed!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllBrands()).then((data) => {
					setBrands(data);
				});
				setEditDialogOpen(false);
			});
		} else if (item.type === "category") {
			dispatch(editCategoryName(item._id, newName)).then(() => {
				const notificationPayload = {
					text: "Name changed!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllCategories()).then((data) => {
					setCategories(data);
				});
				setEditDialogOpen(false);
			});
		}
	};

	const handleAddBrand = () => {
		dispatch(addBrand(addNewBrandName))
			.then(() => {
				const notificationPayload = {
					text: "Brand added!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllBrands()).then((data) => {
					setBrands(data);
				});
				setEditDialogOpen(false);
			})
			.catch((error) => {
				const notificationPayload = {
					text: error.response.data.error,
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	const handleDeleteBrand = (brandId) => {
		dispatch(deleteBrand(brandId))
			.then(() => {
				const notificationPayload = {
					text: "Brand deleted",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllBrands()).then((data) => {
					setBrands(data);
				});
				setEditDialogOpen(false);
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error occured!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	const handleAddCategory = () => {
		dispatch(addCategory(addNewCategoryName))
			.then(() => {
				const notificationPayload = {
					text: "Category added",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllCategories()).then((data) => {
					setCategories(data);
				});
				setEditDialogOpen(false);
			})
			.catch((error) => {
				const notificationPayload = {
					text: error.response.data.error,
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	const handleDeleteCategory = (categoryId) => {
		dispatch(deleteCategory(categoryId))
			.then(() => {
				const notificationPayload = {
					text: "Category deleted",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				dispatch(dispatchGetAllCategories()).then((data) => {
					setCategories(data);
				});
				setEditDialogOpen(false);
			})
			.catch(() => {
				const notificationPayload = {
					text: "Error occured!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	if (!brands || !categories) return null;
	return (
		isDesktop && (
			<div
				style={{
					width: "83%",
					minHeight: "100vh",
					height: "fit-content",
					backgroundColor: "white",
					overflow: "auto",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "white",
					padding: "50px 0px",
				}}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridTemplateRows: "1fr",
						gap: "0px 0px",
						width: "100%",
						height: "100%",
						padding: "40px",
						width: "75%",
						border: "1px solid lightgrey",
						borderRadius: "5px",
						boxShadow: "0px 0px 16px 4px rgba(0,0,0,0.15)",
					}}
				>
					<div
						style={{
							padding: "5px 20px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
						}}
					>
						<div
							style={{
								height: "15%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<input
								type="text"
								value={addNewBrandName}
								onChange={(e) => setAddNewBrandName(e.target.value)}
								style={{
									width: "70%",
									height: "40px",
									borderRadius: "5px",
									borderWidth: "0.5px",
									paddingLeft: "10px",
								}}
								placeholder="Add brand name"
							/>
							<Button
								variant="contained"
								sx={{
									cursor: "pointer",
									width: "26%",
									marginLeft: "5px",
									height: "42px",
									fontSize: isScreenSmall
										? "0.75em"
										: isDesktop
										? "0.95em"
										: null,
								}}
								onClick={handleAddBrand}
								className="hover-style"
							>
								Add
							</Button>
						</div>
						<div
							style={{
								border: "1px solid grey",
								height: isScreenSmall ? "45%" : "50%",
								color: "black",
								padding: "10px 0 10px 0",
								overflow: "auto",
								borderTopLeftRadius:"5px",
								borderBottomLeftRadius:"5px",

							}}
						>
							{brands.map((brand) => (
								<div
									key={brand.id}
									style={{
										marginLeft: "5px",
										height: "50px",
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									{brand.name}
									<div
										style={{
											width: "30%",
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Button
											variant="contained"
											color="grey"
											style={{
												width: "60px",
												height: "50%",
												cursor: "pointer",
												marginRight: "15px",
												boxShadow: "none",
											}}
											onClick={() => {
												setActiveItem({ ...brand, type: "brand" });
												setEditDialogOpen(true);
											}}
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
												marginRight: "10px",
												boxShadow: "none",
											}}
											onClick={() => handleDeleteBrand(brand._id)}
										>
											Delete
										</Button>{" "}
									</div>
								</div>
							))}
						</div>
					</div>
					<div
						style={{
							padding: "5px 20px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
						}}
					>
						<div
							style={{
								height: "15%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<input
								type="text"
								value={addNewCategoryName}
								onChange={(e) => setAddNewCategoryName(e.target.value)}
								style={{
									width: "70%",
									height: "40px",
									borderRadius: "5px",
									borderWidth: "0.5px",
									paddingLeft: "10px",
								}}
								placeholder="Add Category"
							/>
							<Button
								variant="contained"
								sx={{
									cursor: "pointer",
									width: "26%",
									marginLeft: "5px",
									height: "42px",
									fontSize: isScreenSmall
										? "0.75em"
										: isDesktop
										? "0.95em"
										: null,
								}}
								onClick={handleAddCategory}
								className="hover-style"
							>
								Add
							</Button>
						</div>
						<div
							style={{
								border: "1px solid grey",
								height: isScreenSmall ? "45%" : "50%",
								color: "black",
								padding: "10px 0 10px 0",
								overflow: "auto",
								borderTopLeftRadius:"5px",
								borderBottomLeftRadius:"5px",
							}}
						>
							{categories.map((categories) => (
								<div
									key={categories.id}
									style={{
										marginLeft: "5px",
										height: "50px",
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									{categories.name}
									<div
										style={{
											width: "30%",
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Button
											variant="contained"
											color="grey"
											style={{
												width: "60px",
												height: "50%",
												cursor: "pointer",
												marginRight: "15px",
												boxShadow: "none",
											}}
											onClick={() => {
												setActiveItem({ ...categories, type: "category" });
												setEditDialogOpen(true);
											}}
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
												marginRight: "10px",
												boxShadow: "none",
											}}
											onClick={() => handleDeleteCategory(categories._id)}
										>
											Delete
										</Button>{" "}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{activeItem && (
					<Dialog
						maxWidth="xs"
						fullWidth
						open={editDialogOpen}
						onClose={() => setEditDialogOpen(false)}
					>
						<DialogTitle>Edit name</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Name"
								type="email"
								fullWidth
								variant="standard"
								placeholder={activeItem.name}
								onChange={(e) => setNewName(e.target.value)}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								variant="outlined"
								color="customRed"
								onClick={() => setEditDialogOpen(false)}
								sx={{width:"20%"}}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								onClick={() => handleItemEdit(activeItem, newName)}
								sx={{width:"20%"}}
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</div>
		)
	);
}

export default AdminPanelCategoriesBrands;
