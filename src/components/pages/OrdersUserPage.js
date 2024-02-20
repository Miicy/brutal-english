import { useTheme } from "@emotion/react";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

import { getUserOrders } from "./pages.actions";
import NotFoundPage from "../pages/NotFoundPage";
import { selectIsLoggedIn, selectUserId } from "../../store/reducers/userSlice";

function OrdersUserPage() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isScreenSmall= useMediaQuery('(max-width: 1400px)');

	const [orders, setOrders] = useState(null);

	useEffect(() => {
		if (userId) {
			dispatch(getUserOrders(userId)).then((data) => setOrders(data.orders));
		}
	}, [dispatch, userId]);

	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const OrdersUserPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "100vh",
		width: "95%",
		paddingTop: "3px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "0.8em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const OrdersUserBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};

	if (isLoggedIn && !orders) return null;

	return isLoggedIn ? (
		<div style={OrdersUserPageContainer}>
			<div style={OrdersUserBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb"
					sx={{
						fontSize: isMobile && "0.9em"
					}}>
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>
							Your orders
						</p>
					</Breadcrumbs>
				</div>
			</div>
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
					fontSize: isDesktop ? null : "0.7em",
				}}
			>
				<div
					style={{
						height: "70px",
						width: "96%",
						backgroundColor: theme.palette.primary.main,
						marginTop: isDesktop ? "40px" : "20px",
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr 1fr",
						gridTemplateRows: "1fr",
						gap: "0px 0px",
						alignItems: "center",
						fontSize: isScreenSmall ? "0.6em" : (isDesktop ? "0.7em" :(isMobile ? "0.5em" : null)),
						borderTopRightRadius: "5px",
						borderTopLeftRadius: "5px",
					}}
				>
					<div style={{ color: "white", textAlign: "center" }}>
						Order date
					</div>
					<div style={{ color: "white", textAlign: "center" }}>Products</div>
					<div style={{ color: "white", textAlign: "center" }}>Total price</div>
					<div style={{ color: "white", textAlign: "center" }}>Status</div>
				</div>
				<div
					style={{
						overflow: "auto",
						width: "96%",
						height: "85%",
						backgroundColor: theme.palette.white.opacity50,
						borderBottomLeftRadius: "5px",
						borderBottomRightRadius: "5px",
					}}
				>
					{orders &&
						orders.map((order) => (
							<div
								key={order.orderID}
								style={{
									height: "fit-content",
									width: "100%",
									backgroundColor: theme.palette.white.main,
									display: "grid",
									gridTemplateColumns: "1fr 1fr 1fr 1fr",
									gridTemplateRows: "1fr",
									alignItems: "center",
									gap: "0px 0px",
									fontSize: isScreenSmall ? "0.6em" : (isDesktop ? "0.7em" :(isMobile ? "0.5em" : null)),
									border: "1px solid grey",
									justifyItems: "center",
									padding: "10px 0 10px 0",
								}}
							>
								<div>{new Date(order.timeCreated).toLocaleString("en-GB")}</div>
								<div>
									{order.products.map((product) => {
										const foundProduct = product.product;

										return (
											<div key={product.productID}>
												<div>
													{" "}
													{foundProduct && foundProduct.title
														? `${foundProduct.title} x ${product.count}`
														: `Proizvod x ${product.count}`}
												</div>
											</div>
										);
									})}
									{/* {order.products.map((item) => {
										const product = allProducts.find(
											(product) => product._id === item.productID,
										);
										return (
											<div key={item.productID}>
												{product && product.title
													? `${product.title} x ${item.count}`
													: "Product title is null"}
											</div>
										);
									})} */}
								</div>
								<div>{order.totalPrice}</div>
								<div>{order.shipped ? "Poslato" : "Na čekanju"}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	) : (
		<NotFoundPage />
	);
}

export default OrdersUserPage;
