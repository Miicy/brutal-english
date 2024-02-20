import "./App.css";

import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import HomePage from "./components/pages/HomePage";
import Footer from "./components/footer/FooterBar";
import { themeCreation } from "./theme/themeDesign";
import LoadingModal from "./components/other/LoadingModal";
import AdminPanelContainer from "./adminPanel/AdminPanelContainer";
import MenuPageMobile from "./components/pages/mobile/MenuPageMobile";
import CartPageMobile from "./components/pages/mobile/CartPageMobile";
import NotificationContainer from "./components/other/NotificationContainer";
import AdminPanelEditProductForm from "./adminPanel/components/AdminPanelEditProductForm";
import AdminPanelOrderDetails from "./adminPanel/components/AdminPanelOrderDetails";
import AdminLogin from "./adminPanel/AdminLogin";

function App() {
	const [theme] = useState(themeCreation());

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					<Header />
					<Routes>
						<Route path="/*" element={<HomePage />} />
						<Route path="/mobile-cart" element={<CartPageMobile />} />
						<Route path="/mobile-menu" element={<MenuPageMobile />} />
						<Route path="/admin">
							<Route index element={<AdminLogin />} />
							<Route
								path="/admin/admin-panel"
								element={<AdminPanelContainer />}
							/>
							<Route
								path="/admin/product-edit/:id"
								element={<AdminPanelEditProductForm />}
							/>
							<Route
								path="/admin/order-details/:id"
								element={<AdminPanelOrderDetails />}
							/>
						</Route>
					</Routes>
					<Footer />
				</div>
				<LoadingModal />
				<NotificationContainer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
