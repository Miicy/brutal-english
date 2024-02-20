import ImageUploader from "../components/other/ImagesUploader";

function AdminPanelGallery() {
	const adminPanelGalleryTabContainer = {
		height: "100%",
		minHeight: "100vh",
		width: "83%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		paddingTop: "15px",
	};
	const adminPanelGalleryInnerContainer = {
		gap: "5px",
		display: "flex",
		flexDirection: "column",
		alignContent: "center",
		flexWrap: "wrap",
		padding: "40px",
		width: "75%",
		border: "1px solid lightgrey",
		borderRadius: "5px",
		boxShadow: "0px 0px 16px 4px rgba(0,0,0,0.15)",
		minHeight:"80vh",
	};

	const adminPanelGalleryTitle = {
		fontWeight: "bold",
		fontSize: "1.2em",
		width: "75%",
		textAlign: "center",
		color: "black",
		marginBottom: "25px",
	};

	const adminPanelGalleryPicsContainer = {
		width: "75%",
		height: "95%",
		border: "1px solid grey",
		borderRadius:"5px",
	};

	return (
		<div style={adminPanelGalleryTabContainer}>
				<div style={adminPanelGalleryInnerContainer}>
					<div style={adminPanelGalleryTitle}>Gallery</div>
					<div style={adminPanelGalleryPicsContainer}>
						<ImageUploader />
					</div>
				</div>

		</div>
	);
}

export default AdminPanelGallery;
