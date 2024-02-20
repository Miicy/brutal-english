import * as yup from "yup";
import { useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isDesktop, isMobile } from "react-device-detect";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { getPromoCode } from "./user.actions";
import { NOTIFICATION_TYPES } from "../../helpers/app.constants";
import { displayNotification } from "../../store/reducers/notificationSlice";
import { selectIsLoggedIn } from "../../store/reducers/userSlice";

function CodeModal({ setCodeModal }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const [codeInput, setCodeInput] = useState("");
	const [errors, setErrors] = useState({ email: "" });
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const codeModalOverlayContainer = {
		height: "100%",
		width: "100%",
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: theme.palette.primaryLighter.opacity75,
		zIndex: 9999,
		minWidth: "400px",
	};

	const codeModalContainerFlex = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
	};
	const codeModalContainer = {
		height: isDesktop ? "35%" : "fit-content",
		width: isDesktop ? "25%" : "80%",
		backgroundColor: theme.palette.primary.main,
		border: `1.5px solid  ${theme.palette.secondary.main}`,
		borderRadius: "5px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		color: "white",
		padding: "0.5%",
	};

	const validationSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Email is required"),
	});

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setCodeInput(inputValue);

		validationSchema
			.validate({ email: inputValue }, { abortEarly: false })
			.then(() => {
				setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
				setIsButtonDisabled(false);
			})
			.catch((validationErrors) => {
				const errorsObj = {};
				validationErrors.inner.forEach((error) => {
					errorsObj[error.path] = error.message;
				});
				setErrors(errorsObj);
				setIsButtonDisabled(true);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		validationSchema
			.validate({ email: codeInput }, { abortEarly: false })
			.then(() => {
				dispatch(getPromoCode(codeInput))
					.then(() => {
						const notificationPayload = {
							text: "Promo kod je poslat!",
							type: NOTIFICATION_TYPES.SUCCESS,
						};
						dispatch(displayNotification(notificationPayload));
						setCodeModal(false);
					})
					.catch((error) => {
						const notificationPayload = {
							text: error.response.data.error,
							type: NOTIFICATION_TYPES.ERROR,
						};
						dispatch(displayNotification(notificationPayload));
					});
			})
			.catch((validationErrors) => {
				const errorsObj = {};
				validationErrors.inner.forEach((error) => {
					errorsObj[error.path] = error.message;
				});
				setErrors(errorsObj);
			});
	};

	return (
		<div style={codeModalOverlayContainer}>
			<div style={codeModalContainerFlex}>
				<div style={codeModalContainer}>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<CloseIcon
							sx={{ cursor: "pointer", fontSize: isDesktop ? "1em" : "1.6em" }}
							className="hover-style"
							onClick={() => setCodeModal(false)}
						/>
					</div>
					{isLoggedIn ? (					
					<div
						style={{
							height: "50%",
							width: "90%",
							display: "flex",
							justifyContent: "flex-start",
							flexDirection: "column",
							alignitems: "flex-start",
						}}
					>
						<p>Ukucajte email adresu, na koju ćemo dostaviti popust kod:</p>
						<form onSubmit={handleSubmit}>
							<div
								style={{ display: "flex", flexDirection: "row", gap: "5px" }}
							>
								<input
									type="text"
									style={{ width: isDesktop ? "70%" : "90%", height: "30px" }}
									value={codeInput}
									onChange={handleInputChange}
								/>
								<Button
									type="submit"
									variant="contained"
									style={{
										width: "fit-content",
										cursor: "pointer",
									}}
									color="secondary"
									disabled={isButtonDisabled}
								>
									Pošalji
								</Button>
							</div>
							{errors.email && (
								<div style={{ color: "red" }}>{errors.email}</div>
							)}
						</form>

						<p>Kod iskoristi prilikom potvrđivanja kupovine.</p>
					</div>) : (<div style={{
							height: "50%",
							width: "90%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignitems: "flex-start",
							fontSize: isDesktop  ? "1em" : "0.7em",
							fontWeight: "bold" ,
							padding: isMobile && "10px",
						}}>  Morate biti prijavljeni da biste mogli da dobijete popust kod!</div>)}

					<div
						style={{
							height: "35%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "flex-start",
							width: "90%",
							cursor: "pointer",
							padding: isDesktop ? "2%" : "5px",
							backgroundColor: theme.palette.primaryLighter.main,
							borderRadius: "5px",
							marginBottom: isDesktop ? null : "10px",
						}}
					>
						<div style={{ padding: "5px 0 5px 0 " }}>Nemaš nalog?</div>
						<div
							style={{ padding: "5px 0 5px 0 " }}
							className="hover-style"
							onClick={() => navigate("/register")}
						>
							Registruj se:
						</div>
						<div style={{ marginLeft: "20px", padding: "2px 0 2px 0 " }}>
							<CheckIcon
								sx={{ color: "green", fontSize: "0.9em", marginRight: "5px" }}
							/>
							Brža kupovina.
						</div>
						<div style={{ marginLeft: "20px", padding: "2px 0 2px 0 " }}>
							<CheckIcon
								sx={{ color: "green", fontSize: "0.9em", marginRight: "5px" }}
							/>
							Prati status porudžbine.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CodeModal;
