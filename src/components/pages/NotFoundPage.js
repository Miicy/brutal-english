import { useTheme } from "@emotion/react";
import { Breadcrumbs } from "@mui/material";
import React, { useEffect } from "react";
import { isDesktop } from "react-device-detect";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
	const theme = useTheme();
	const navigate = useNavigate();
	//popsition
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const NotFoundPageContainer = {
		backgroundColor: theme.palette.grey.darkerOpacity85,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		height: "100vh",
		width: "95%",
		paddingTop: "3px",
		// padding: "25px",
		borderRadius: "5px",
		color: "black",
		fontSize: isDesktop ? "1.5em" : "1.2em",
		fontWeight: "bold",
		boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
	};

	const filterPageBreadcrumbsContainerStyles = {
		height: "4%",
		width: "100%",
	};
	return (
		<div style={NotFoundPageContainer}>
			<div style={filterPageBreadcrumbsContainerStyles}>
				<div style={{ marginLeft: "20px" }}>
					<Breadcrumbs aria-label="breadcrumb">
						<p
							style={{ color: "black", cursor: "pointer" }}
							className="hover-style-link"
							onClick={() => navigate("/")}
						>
							Home Page
						</p>

						<p style={{ color: "black", fontWeight: "bold" }}>
							Page not found.
						</p>
					</Breadcrumbs>
				</div>
			</div>
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
					Page not found.
			</div>
		</div>
	);
}

export default NotFoundPage;
