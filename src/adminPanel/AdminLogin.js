import React from "react";
import { isDesktop } from "react-device-detect";
import backgroundImage from "../media/dumbbells-gym.jpg";
import { useTheme } from "@emotion/react";
import Login from "../components/auth/Login";

function AdminLogin() {
	const theme = useTheme();
	return (
		isDesktop && (
			<div
				style={{
					width: "100%",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed", 
					minWidth: "600px",
					overflowX: "hidden",
				}}
			>
				<div
					style={{
						height: "80%",
						width: "96%",
						marginTop: 60,
						backgroundColor: theme.palette.primaryLighter.opacity95,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "5px",
						color: theme.palette.white.main,
						boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
					}}
				>
					<div
						style={{
							backgroundColor: theme.palette.white.opacity50,
							borderRadius: "5px",
							width: "22%",
							boxShadow: "0px 0px 3px 0.7px rgba(0, 0, 0, 0.9)",
						}}
					>
						<Login isAdmin={true} margin={"20px"} error={true} />
					</div>
				</div>
			</div>
		)
	);
}

export default AdminLogin;
