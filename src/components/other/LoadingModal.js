import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { DATA_STATE } from "../../helpers/app.constants";
import { selectDataState } from "../../store/reducers/notificationSlice";

const LoadingModal = () => {
	const dataState = useSelector(selectDataState);

	return (
		<Backdrop
			sx={{
				color: "#fff",
				zIndex: (theme) => theme.zIndex.drawer + 1,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
			open={dataState === DATA_STATE.DATA_STATE_LOADING ? true : false}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LoadingModal;
