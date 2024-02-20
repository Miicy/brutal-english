import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { isDesktop } from "react-device-detect";
import useGetAllUsers from "../helpers/hooks/useGetAllUsers";

function AdminPanelUsers() {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery("(max-width: 1400px)");
	const allUsers = useGetAllUsers();

	const gridStyles = {
		display: "grid",
		gridTemplateColumns: "0.3fr 1fr 1fr 1fr 1fr 1fr  ",
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
		justifyContent: "center",
	};

	const gridRowStyles = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	if (!allUsers) return null;

	return (
		<div
			style={{
				width: "83%",
				minHeight: "100vh",
				height: "fit-content",
				backgroundColor: "white",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div style={adminPanelProductsTitlesStyles}>
				<div style={{ ...adminPanelProductsTitles }}>Num.</div>
				<div style={{ ...adminPanelProductsTitles, marginLeft: "10px" }}>
					Name
				</div>
				<div style={{ ...adminPanelProductsTitles }}>Adress</div>
				<div style={{ ...adminPanelProductsTitles }}>City - Postal code</div>
				<div style={{ ...adminPanelProductsTitles }}>Email</div>
				<div style={{ ...adminPanelProductsTitles }}>Phone</div>
			</div>
			{allUsers.map((user, index) => {
				return (
					<div
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
						key={user.id}
					>
						<div style={gridStyles}>
							<div style={gridRowStyles}>{index}</div>
							<div style={gridRowStyles}>
								{user.name}&nbsp;{user.lastName}
							</div>

							<div style={gridRowStyles}>
								{user.city} &nbsp;{user.zipCode}
							</div>
							<div style={gridRowStyles}>{user.address}</div>
							<div style={gridRowStyles}>{user.email}</div>
							<div style={gridRowStyles}>{user.phone}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default AdminPanelUsers;
