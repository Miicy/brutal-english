import { useTheme } from "@emotion/react";
import { isDesktop, isMobile } from "react-device-detect";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Divider, useMediaQuery } from "@mui/material";
import { ReactComponent as Logo } from "../../media/logo-white.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CodeModal from "../other/CodeModal";
import { ReactComponent as ViberSvg } from "../../media/viber.svg";
import { ReactComponent as TelegramSvg } from "../../media/telegram.svg";
import { ReactComponent as FacebookSvg } from "../../media/facebook.svg";
import { selectUserIfAdmin } from "../../store/reducers/userSlice";
import { useSelector } from "react-redux";

function Footer() {
	const theme = useTheme();
	const navigate = useNavigate();
	const isScreenSmall = useMediaQuery("(max-width: 1250px)");
	const isAdmin= useSelector(selectUserIfAdmin);

	const [codeModal, setCodeModal] = useState(false);

	const footerStyles = {
		height: isDesktop ? "450px" : "fit-content",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		backgroundColor: theme.palette.primary.main,
		boxShadow: "0px -1.5px 5px 0px rgba(0, 0, 0, 0.9)",
		display: "flex",
		justifyContent: "flex-start",
		flexDirection: "column",
		alignItems: "center",
		minWidth: isMobile ? "null" : isScreenSmall ? "1250px" : null,
		width: isDesktop ? "100%" : null,
		borderTop: `1.5px solid  ${theme.palette.secondary.main}`,
	};

	const footerContentContainerStyles = {
		marginTop: "1.4em",
		marginBottom: "1.4em",
		display: "grid",
		gridAutoColumns: "1fr ",
		gridTemplateColumns: isDesktop
			? "0.1fr 3fr 0.1fr 3fr 0.1fr 3fr 0.1fr 3fr  0.1fr"
			: "0.1fr 3fr 0.1fr 3fr 0.1fr",
		gridTemplateRows: isDesktop ? "1fr" : "1fr 1fr",
		gap: "0px 1px",
		alignContent: "center",
		color: theme.palette.white.main,
		height: "fit-content",
		width: isDesktop ? "fit-content" : "270px",
	};

	const footerTittleStyles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-between",
		color: theme.palette.white.main,
		fontWeight: "bold",
		height: "100%",
	};

	const footerTitletext = {
		fontSize: isScreenSmall ? "0.9em" : isDesktop ? "1.1em" : null,
		cursor: "pointer",
		marginLeft: "5px",
		textAlign: "center",
		width: "100%",
		height: isDesktop ? null : "25px",
		marginBottom: "20px",
	};
	const footerContentStyles = {
		height: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "flex-start",
		color: theme.palette.white.main,
		textDecoration: "none",
		fontSize: isScreenSmall ? "0.75em" : isDesktop ? "0.85em" : null,
		minWidth: isDesktop ? "260px" : null,
	};

	const footerContentText = {
		cursor: "pointer",
		transition: "color 0.3s",
		fontWeight: "300",
		maxWidth: isDesktop ? null : "100px",
		fontSize: isMobile && "0.7em",
		marginBottom: "20px",
	};

	const footerRightsContainerStyles = {
		color: theme.palette.white.main,
		width: "100%",
		display: "flex",
		justifyContent: "center",
		marginTop: "2em",
		fontSize: isScreenSmall
			? "0.6em"
			: isDesktop
			? "0.8em"
			: isMobile
			? "0.5em"
			: null,
	};

	//instagramLink
	const handleInstagramClick = () => {
		window.open("https://www.instagram.com", "_blank");
	};

	const handleViberGroupClick = () => {
		window.open("https://invite.viber.com");
	};

	const handleTelegramGroupClick = () => {
		window.open("https://t.me");
	};

	const handleFacebookGroupClick = () => {
		window.open("https://www.facebook.com");
	};

	if(isAdmin) return null;
	
	return (
		<div>
			{codeModal && <CodeModal setCodeModal={setCodeModal} />}

			<div style={footerStyles}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						alignItems: "center",
					}}
				>
					<Logo
						style={{
							width: isDesktop ? "100px" : "60px",
							margin: "20px 0 20px 0",
						}}
					/>
					{isDesktop ?  (
						<div style={footerContentContainerStyles}>
							<Divider orientation="vertical" flexItem />
							<div style={footerTittleStyles}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.75em",
									}}
								>
									Socials
								</div>
								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleInstagramClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<InstagramIcon
													sx={{
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Instagram
										</div>
									</div>

									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleViberGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<ViberSvg
													style={{
														width: "22px",
														height: "22px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Viber Group
										</div>
									</div>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleTelegramGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<TelegramSvg
													style={{
														width: "21px",
														height: "21px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Telegram Group
										</div>
									</div>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleFacebookGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<FacebookSvg
													style={{
														width: "21px",
														height: "21px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Facebook Group
										</div>
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<div style={footerTittleStyles}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.75em",
									}}
								>
									Contact
								</div>
								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,

											fontSize: isMobile && "0.8em",
										}}
									>
										email@gmail.com
									</div>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
									>
										+111 000 0000000
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<div
								style={{
									...footerTittleStyles,
									fontSize: isMobile && "0.75em",
								}}
							>
								{isDesktop ? (
									<div style={footerTitletext}>Brutal Workout Suplements</div>
								) : (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											height: "25px",
											alignItems: "center",
											justifyContent: "flex-start",
										}}
									>
										<div style={{ ...footerTitletext, height: null }}>
											Brutal Workout
										</div>
										<div style={{ ...footerTitletext, height: null }}>
											Suplements
										</div>
									</div>
								)}

								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
										className="hover-style"
										onClick={() => navigate("/about")}
									>
										About Us
									</div>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
										className="hover-style "
										onClick={() => setCodeModal(true)}
									>
										Discount Codes
									</div>
									<div style={footerContentText} className="hover-style"></div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<div style={footerTittleStyles}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.75em",
									}}
								>
									Help With Shopping
								</div>
								<div style={footerContentStyles}>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/payment")}
									>
										Way of Payment
									</div>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/terms")}
									>
										Terms and Conditions
									</div>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/delivery")}
									>
										Delivery
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
						</div>
					) : (
						<div style={footerContentContainerStyles}>
							<Divider orientation="vertical" flexItem />
							<div style={{ footerTittleStyles }}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.8em",
										fontWeight: "bold",
									}}
								>
									Socials
								</div>
								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleInstagramClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<InstagramIcon
													sx={{
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Instagram
										</div>
									</div>

									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleViberGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<ViberSvg
													style={{
														width: "22px",
														height: "22px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Viber Group
										</div>
									</div>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleTelegramGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<TelegramSvg
													style={{
														width: "21px",
														height: "21px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Telegram Group
										</div>
									</div>
									<div
										style={{
											...footerContentText,
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}
										className="hover-style"
										onClick={handleFacebookGroupClick}
									>
										<div
											style={{
												display: "flex",
												alifnItems: "center",
												flexWrap: "wrap",
												textAlign: "center",
											}}
										>
											{isDesktop ? (
												<FacebookSvg
													style={{
														width: "21px",
														height: "21px",
														fontSize: "1.5em",
														cursor: "pointer",
														marginRight: "5px",
													}}
													className="hover-style"
												/>
											) : null}
											Facebook Group
										</div>
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<div style={{ footerTittleStyles }}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.8em",
										fontWeight: "bold",
									}}
								>
									Contact
								</div>
								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,

											fontSize: isMobile && "0.8em",
										}}
									>
										email@gmail.com
									</div>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
									>
										+111 000 0000000
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<Divider orientation="vertical" flexItem />
							<div
								style={{
									...footerTittleStyles,
									fontSize: isMobile && "0.75em",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "fit-content",
										alignItems: "center",
										justifyContent: "flex-start",
									}}
								>
									<div style={{}}>Brutal Workout</div>
									<div
										style={{
											...footerTitletext,
											height: null,
											marginBottom: "10px",
										}}
									>
										Suplements
									</div>
								</div>

								<div style={footerContentStyles}>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
										className="hover-style"
										onClick={() => navigate("/about")}
									>
										About Us
									</div>
									<div
										style={{
											...footerContentText,
											fontSize: isMobile && "0.8em",
										}}
										className="hover-style "
										onClick={() => setCodeModal(true)}
									>
										Discount Codes
									</div>
									<div style={footerContentText} className="hover-style"></div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
							<div style={footerTittleStyles}>
								<div
									style={{
										...footerTitletext,
										fontSize: isMobile && "0.75em",
									}}
								>
									Help With Shopping
								</div>
								<div style={footerContentStyles}>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/payment")}
									>
										Way of Payment
									</div>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/terms")}
									>
										Terms and Conditions
									</div>
									<div
										style={footerContentText}
										className="hover-style"
										onClick={() => navigate("/delivery")}
									>
										Delivery
									</div>
								</div>
							</div>
							<Divider orientation="vertical" flexItem />
						</div>
					)}
				</div>
				<div></div>
				<div style={footerRightsContainerStyles}>
					© brutalworkoutsuplemets.com | All rights reserved
				</div>
			</div>
		</div>
	);
}

export default Footer;
