import ModalCart from "../../header/ModalCart";
import backgroundImage from "../../../media/dumbbells-gym.jpg";

function CartPageMobile() {
	const CartPageMobileContainerStyles = {
		backgroundImage: `url(${backgroundImage})`,
		height: "95vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10,
	};

	return (
		<div style={CartPageMobileContainerStyles}>
			<ModalCart />
		</div>
	);
}

export default CartPageMobile;
