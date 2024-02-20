import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import { useCallback, useEffect, useState } from "react";

import AdminPanelPromoCode from "./AdminPanelPromoCode";
import backgroundImage from "../media/dumbbells-gym.jpg";
import useGetAllBrands from "../helpers/hooks/useGetAllBrands";
import { selectUserIfAdmin } from "../store/reducers/userSlice";
import AdminPanelOrdersContainer from "./AdminPanelOrdersContainer";
import AdminPanelCategoriesBrands from "./AdminPanelCategoriesBrands";
import AdminPanelProductsListContainer from "./AdminPanelProductsListContainer";
import useGetProductCategories from "./components/hooks/useGetProductCategories";
import AdminPanelAddNewProductForm from "./components/AdminPanelAddNewProductForm";
import AdminPanelUsers from "./AdminPanelUsers";
import AdminPanelGallery from "./AdminPanelGallery";
import AdminPanelEditProductForm from "./components/AdminPanelEditProductForm";

export const ADMIN_PANEL_TABS = {
	ORDERS: "ORDERS",
	ADD_PRODUCT: "ADD_PRODUCT",
	EDIT_PRODUCT: "EDIT_PRODUCT",
	ALL_PRODUCTS: "ALL_PRODUCTS",
	CATEGORIESBRANDS: "CATEGORIESBRANDS",
	PROMOCODE: "PROMOCODE",
	USERS: "USERS",
	GALLERY: "GALLERY",
};

const AdminPanelContainer = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const brands = useGetAllBrands();
	const { categories } = useGetProductCategories();
	const isAdminLoggedIn = useSelector(selectUserIfAdmin);

	const [activeTab, setActiveTab] = useState(ADMIN_PANEL_TABS.ALL_PRODUCTS);

	const adminPanelTabContainer = {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "70px",
		cursor: "pointer",
		boxShadow: "inset 0px 0px 6px 0.2px rgba(0,0,0,0.15)",
	};

	const handleSettingActiveTab = useCallback((activeTab) => {
		setActiveTab(activeTab);
	}, []);

	useEffect(() => {
		if (!isAdminLoggedIn) navigate("/admin");
	}, [isAdminLoggedIn, navigate]);

	const handleAdminTabSwitch = (page) => {
		switch (page) {
			case ADMIN_PANEL_TABS.ALL_PRODUCTS:
				return (
					<AdminPanelProductsListContainer
						brands={brands}
						categories={categories}
					/>
				);
			case ADMIN_PANEL_TABS.ADD_PRODUCT:
				return (
					<AdminPanelAddNewProductForm
						brands={brands}
						categories={categories}
						handleSettingActiveTab={handleSettingActiveTab}
					/>
				);
			case ADMIN_PANEL_TABS.ORDERS:
				return <AdminPanelOrdersContainer />;
			case ADMIN_PANEL_TABS.EDIT_PRODUCT:
				return <AdminPanelEditProductForm />;
			case ADMIN_PANEL_TABS.CATEGORIESBRANDS:
				return <AdminPanelCategoriesBrands />;
			case ADMIN_PANEL_TABS.PROMOCODE:
				return <AdminPanelPromoCode />;
			case ADMIN_PANEL_TABS.USERS:
				return <AdminPanelUsers />;
			case ADMIN_PANEL_TABS.GALLERY:
				return <AdminPanelGallery />;
			default:
				return (
					<AdminPanelAddNewProductForm
						brands={brands}
						categories={categories}
						handleSettingActiveTab={handleSettingActiveTab}
					/>
				);
		}
	};

	if (!isAdminLoggedIn) return null;

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
				>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.ALL_PRODUCTS &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.ALL_PRODUCTS &&
								`rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.ALL_PRODUCTS)}
					>
						All products
					</div>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.ADD_PRODUCT &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.ADD_PRODUCT &&
								`rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.ADD_PRODUCT)}
					>
						Add product
					</div>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.CATEGORIESBRANDS &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.CATEGORIESBRANDS &&
								`rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.CATEGORIESBRANDS)}
					>
						Brands and Categories
					</div>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.ORDERS &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.ORDERS && `rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.ORDERS)}
					>
						Orders
					</div>

					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.USERS &&
								theme.palette.primaryLighter.opacity95,
							color: activeTab === ADMIN_PANEL_TABS.USERS && `rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.USERS)}
					>
						Users
					</div>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.GALLERY &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.GALLERY && `rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.GALLERY)}
					>
						Gallery
					</div>
					<div
						style={{
							...adminPanelTabContainer,
							backgroundColor:
								activeTab === ADMIN_PANEL_TABS.PROMOCODE &&
								theme.palette.primaryLighter.opacity95,
							color:
								activeTab === ADMIN_PANEL_TABS.PROMOCODE && `rgb(255, 102, 0)`,
						}}
						onClick={() => setActiveTab(ADMIN_PANEL_TABS.PROMOCODE)}
					>
						Promo code
					</div>
				</div>

				{categories && brands ? handleAdminTabSwitch(activeTab) : null}
			</div>
		)
	);
};

export default AdminPanelContainer;
