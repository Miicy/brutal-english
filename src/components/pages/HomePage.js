import { isDesktop } from "react-device-detect";

import HomePageContent from "./HomePageContent";
import FilterComponentMainPage from "../filter/FilterComponentMainPage";
import { useEffect, useRef, useState } from "react";
import NotFoundPage from "./NotFoundPage";
import Register from "../auth/Register";
import { Route, Routes } from "react-router-dom";
import backgroundImage from "../../media/dumbbells-gym.jpg";
import backgroundImageMobile from "../../media/gym-phone.jpg";
import LoginPageMobile from "./mobile/LoginPageMobile";
import useGetAllProducts from "../../helpers/hooks/useGetAllProducts";
import { useDispatch } from "react-redux";
import { sortAllProducts } from "../../store/reducers/productSlice";
import FilterPage from "./FilterPageContainer";
import CartPage from "./CartPage";
import CartCheckout from "./CartCheckout";
import WishlistPage from "./WishlistPage";
import SingleProductPage from "./SingleProductPage";
import About from "./About";
import Terms from "./Terms";
import PaymentMethods from "./PaymentMethods";
import Delivery from "./Delivery";
import OrdersUserPage from "./OrdersUserPage";
import Profile from "./Profile";

function HomePage() {
	const dispatch = useDispatch();
	const products = useGetAllProducts();

	const homePageContainerStyles = {
		position: "relative",
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundAttachment: "fixed", 
		height: "fit-content",
		minWidth: "1080px",
		zIndex: 10,
		padding: 70,
		display: "grid",
		gridTemplateColumns: "2.5fr 9.5fr",
		gridTemplateRows: "1fr",
		gap: "10px",
	};

	const elementRef = useRef(null);
	const [cssHeight, setCssHeight] = useState(null);

	useEffect(() => {
		if (isDesktop) {
			const element = elementRef.current;

			if (element) {
				const computedStyle = window.getComputedStyle(element);
				const height = computedStyle.height;
				setCssHeight(height);
			}
		}
	}, []);

	useEffect(() => {
		if (products) dispatch(sortAllProducts(products));
	}, [dispatch, products]);

	const homePageFilterContainer = {
		height: `${cssHeight}px`,
		display: "flex",
		justifyContent: "center",
		paddingBottom: "10px",
		paddingTop: "10px",
	};

	const homePageContentContainerStyles = {
		position: "relative",
		height: "fit-content",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "10px",
		paddingTop: "55px",
	};

	const homePageContainerStylesMobile = {
		backgroundImage: `url(${backgroundImageMobile})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundAttachment: "fixed", 
		height: "fit-content",
		padding: "3%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 120,
	};

	return isDesktop ? (
		<div style={homePageContainerStyles}>
			<div style={homePageFilterContainer}>
				<FilterComponentMainPage />
			</div>
			<div style={homePageContentContainerStyles} ref={elementRef}>
				<Routes>
					<Route path="/" element={<HomePageContent />} />
					<Route
						path="/register"
						element={
							<Register
								width={"100%"}
								size={"small"}
								error={true}
								margin={"0px 0 0px 0"}
							/>
						}
					/>
					<Route path="/filter" element={<FilterPage />} />
					<Route path="/cart-page" element={<CartPage />} />
					<Route path="/cart-checkout" element={<CartCheckout />} />
					<Route path="/wishlist" element={<WishlistPage />} />
					<Route path="/product/:id" element={<SingleProductPage />} />
					<Route path="/orders" element={<OrdersUserPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/payment" element={<PaymentMethods />} />
					<Route path="/delivery" element={<Delivery />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	) : (
		<div style={homePageContainerStylesMobile}>
			<Routes>
				<Route path="/" element={<HomePageContent />} />
				<Route path="/mobile-login" element={<LoginPageMobile />} />
				<Route
					path="/register"
					element={
						<Register
							width={"100%"}
							size={"small"}
							error={true}
							margin={"2px 0 2px 0"}
						/>
					}
				/>
				<Route path="/wishlist" element={<WishlistPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/payment" element={<PaymentMethods />} />
				<Route path="/delivery" element={<Delivery />} />
				<Route path="/product/:id" element={<SingleProductPage />} />
				<Route path="/filter" element={<FilterPage />} />
				<Route path="/cart-page" element={<CartPage />} />
				<Route path="/cart-checkout" element={<CartCheckout />} />
				<Route path="/orders" element={<OrdersUserPage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}
export default HomePage;
