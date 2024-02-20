import {
	Select,
	Tooltip,
	MenuItem,
	InputLabel,
	FormControl,
	useMediaQuery,
} from "@mui/material";

import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import useGetOrders from "./components/hooks/useGetOrders";
import { isDesktop } from "react-device-detect";

const AdminPanelOrdersContainer = () => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	const orders = useGetOrders();
	const navigate = useNavigate();

	const gridStyles = {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 280px 1fr 1fr 1fr 1fr 1fr ",
		gridTemplateRows: "1fr",
		gap: "0px 10px",
		width: "100%",
		height: "70px",
	};

	const adminPanelProductsTitlesStyles = {
		...gridStyles,
		backgroundColor: theme.palette.primaryLighter.opacity95,
		borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
		color: "white",
		minWidth: isScreenSmall ? "800px" : "1200px",
	};

	const adminPanelProductsTitles = {
		display: "flex",
		alignItems: "center",
		fontSize: isScreenSmall ? "0.8em" : isDesktop ? "0.95em" : null,
		fontWeight: "bold",
		justifyContent: isScreenSmall && "center",
		textAlign:"center",
	};

	const gridRowStyles = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const WhiteSelect = styled(Select)(({ theme }) => ({
		"& .MuiSelect-select": {
			color: "white",
			"&:before": {
				borderBottomColor: "white",
			},
			"&:after": {
				borderBottomColor: "white",
			},
		},
		"& .MuiSvgIcon-root": {
			fill: "white",
		},
	}));

	const WhiteFormControl = styled(FormControl)(({ theme }) => ({
		"& .MuiInputLabel-root": {
			color: "white",
		},
	}));

	const [selected, setSelected] = useState("");

	const handleChange = (event) => {
		setSelected(event.target.value);
	};

	const handleOrderClick = (orderId) => {
		navigate(`/admin/order-details/${orderId}`);
	};

	if (orders === null) return null;

	const filteredOrders = orders.filter((order) => {
		if (selected === "onWait") {
			return !order.shipped;
		} else if (selected === "sent") {
			return order.shipped;
		}
		return true;
	});
	const formatDate = (timeCreated) => {
		if (!timeCreated) {
			return "";
		}

		try {
			const [datePart, timePart] = timeCreated.split(", ");
			const [day, month, year] = datePart.split("/");
			const [hour, minute, second] = timePart.split(":");

			const parsedDate = new Date(year, month - 1, day, hour, minute, second);

			const formattedDate = parsedDate.toLocaleString("en-GB");
			return formattedDate;
		} catch (error) {
			console.error("Error formatting date:", error);
			return "";
		}
	};

	if (!orders) return null;
	return (
		<div
			style={{
				height: "100%",
				minHeight: "100vh",
				width: "83%",
				gap: "10px",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				borderBottomLeftRadius: "5px",
				borderBottomRightRadius: "5px",
				overflow: "auto",
			}}
		>
			<div style={adminPanelProductsTitlesStyles}>
				<div style={{ ...adminPanelProductsTitles, marginLeft: "10px" }}>
					Name
				</div>
				<div style={{ ...adminPanelProductsTitles }}>Adress</div>
				<div style={{ ...adminPanelProductsTitles }}>City - Postal code</div>
				<div style={{ ...adminPanelProductsTitles }}>Email</div>
				<div style={{ ...adminPanelProductsTitles }}>Phone</div>
				<div style={{ ...adminPanelProductsTitles }}>Products</div>
				<div style={{ ...adminPanelProductsTitles }}>Price</div>
				<div style={{ ...adminPanelProductsTitles }}>Date</div>
				<div style={{ ...adminPanelProductsTitles, justifyContent: "center" }}>
					<WhiteFormControl sx={{ border: "1px solid white", width: "80%",borderRadius: "5px"  }}>
						<InputLabel
							id="filter-select"
							shrink={false}
							sx={{ color: "white", }}
						>
							{selected !== "" ? (
								<MenuItem value={selected}></MenuItem>
							) : (
								"Filter"
							)}
						</InputLabel>
						<WhiteSelect
							sx={{ color: " white" }}
							value={selected}
							labelId="filter-select"
							inputProps={{
								style: { color: "white" },
							}}
							onChange={handleChange}
						>
							<MenuItem value={"onWait"}>On hold</MenuItem>
							<MenuItem value={"sent"}>Sent</MenuItem>
						</WhiteSelect>
					</WhiteFormControl>
				</div>
			</div>
			{filteredOrders.map((order) => {
				return (
					<div
						key={order._id}
						style={{
							width: "100%",
							height: "fit-content",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							borderBottom: `1px solid ${theme.palette.grey.opacity70}`,
							color: "black",
							paddingLeft: "5px",
							paddingRight: "5px",
							cursor: "pointer",
							minWidth: isScreenSmall ? "800px" : "1200px",
							fontSize: isScreenSmall ? "0.8em" : isDesktop ? "0.95em" : null,
						}}
						onClick={() => handleOrderClick(order._id)}
					>
						<Tooltip title={`Detalji porudžbine`}>
							<div style={gridStyles}>
								<div style={gridRowStyles}>
									{order.name}&nbsp;{order.lastName}
								</div>

								<div style={gridRowStyles}>
									{order.city} &nbsp;{order.zipCode}
								</div>
								<div style={gridRowStyles}>{order.address}</div>
								<div style={gridRowStyles}>{order.email}</div>
								<div style={gridRowStyles}>{order.phone}</div>
								<div style={gridRowStyles}>
									{order.products.map((product) => {
										const foundProduct = product.product;
										return (
											<div key={product.productID}>
												{foundProduct && foundProduct.title
													? `${foundProduct.title} x ${product.count}`
													: `Proizvod x ${product.count}`}
											</div>
										);
									})}
								</div>
								<div style={gridRowStyles}>{order.totalPrice}</div>
								<div style={gridRowStyles}>{formatDate(order.timeCreated)}</div>
								<div style={gridRowStyles}>
									<p style={{ textAlign: "center", marginRight: "5px" }}>
										{order.shipped ? "Poslato" : "Na čekanju"}
									</p>
								</div>
							</div>
						</Tooltip>
					</div>
				);
			})}
		</div>
	);
};

export default AdminPanelOrdersContainer;
