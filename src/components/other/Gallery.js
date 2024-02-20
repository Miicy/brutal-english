import { isDesktop } from "react-device-detect";

import { useCallback, useEffect, useRef, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import SquareIcon from "@mui/icons-material/Square";
import { useDispatch } from "react-redux";
import { dispatchGetAllGalleryImages } from "../../adminPanel/adminPanel.actions";

function Gallery() {
	const dispatch = useDispatch();
	// const slides = useMemo(() => {
	// 	if (isDesktop) {
	// 		return [image1, image2, image3, image4, image5];
	// 	} else {
	// 		return [
	// 			mobileImage1,
	// 			mobileImage2,
	// 			mobileImage3,
	// 			mobileImage4,
	// 			mobileImage5,
	// 		];
	// 	}
	// }, []);
	const [slides, setSlides] = useState([]);
	const timeRef = useRef(null);

	useEffect(() => {
		dispatch(dispatchGetAllGalleryImages()).then((data) => {
			const galleryImagesArray = data.galleryImages;
			console.log(galleryImagesArray);
			setSlides(galleryImagesArray.map((image) => image.imageURL));
		});
	}, [dispatch]);

	const [currentImage, setCurrentImage] = useState(0);

	const handlePreviosClick = () => {
		const isFirstSlide = currentImage === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentImage - 1;
		setCurrentImage(newIndex);
	};

	const handleNextClick = useCallback(() => {
		const isLastSlide = currentImage === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentImage + 1;
		setCurrentImage(newIndex);
	}, [currentImage, slides]);

	const handleSquareClick = (slideIndex) => {
		setCurrentImage(slideIndex);
	};

	useEffect(() => {
		if (timeRef.current) {
			clearTimeout(timeRef.current);
		}
		timeRef.current = setTimeout(() => {
			handleNextClick();
		}, 3000);
		return () => {
			clearTimeout(timeRef.current);
		};
	}, [handleNextClick]);

	//styles
	const theme = useTheme();
	const galleryContainer = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: isDesktop ? "50em" : "25em",
		width: "100%",
		backgroundImage: `url(${slides[currentImage]})`,
		backgroundPosition: "center",
		transition: isDesktop ? "background-image 0.8s ease" : null,
		backgroundSize: "cover",
		borderTopRightRadius:"5px",
		borderTopLeftRadius:"5px",
		position: "relative",
	};

	const arrowContainerStyles = {
		backgroundColor: theme.palette.primaryLighter.opacity60,
		height: "100%",
		display: "flex",
		alignItems: "center",
		borderTopLeftRadius: "5px",
	};

	const arrowContainerRightStyles = {
		...arrowContainerStyles,
		borderTopLeftRadius: "0px",
		borderTopRightRadius: "5px",
	};
	const arrowStyles = {
		position: "absolute",
		width: "100%",
		height: "100%",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		color: theme.palette.white.main,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const sliderSquareStyles = {
		position: "absolute",
		bottom: "10px",
		left: "50%",
		transform: "translateX(-50%)",
		width: isDesktop ? "17%" : "50%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	};

	return (
		<div style={galleryContainer}>
			<div style={arrowStyles}>
				<div style={arrowContainerStyles}>
					<NavigateBeforeIcon
						sx={{
							fontSize: isDesktop ? "5.5em" : "3em",
							cursor: "pointer",
							transition: "color 0.3s",
						}}
						className="hover-style"
						onClick={handlePreviosClick}
					/>
				</div>
				<div style={arrowContainerRightStyles}>
					<NavigateNextIcon
						sx={{
							fontSize: isDesktop ? "5.5em" : "3em",
							cursor: "pointer",
							transition: "color 0.3s",
						}}
						className="hover-style"
						onClick={handleNextClick}
					/>
				</div>
			</div>
			<div style={sliderSquareStyles}>
				{slides.map((slide, slideIndex) => (
					<div key={slideIndex}>
						{slideIndex === currentImage ? (
							<SquareIcon
								sx={{
									fontSize: isDesktop ? "2.1em" : "1.6em",
									cursor: "pointer",
									transition: "color 0.3s",
									color: theme.palette.secondary.main,
								}}
								onClick={() => handleSquareClick(slideIndex)}
							/>
						) : (
							<SquareOutlinedIcon
								sx={{
									fontSize: isDesktop ? "2em" : "1.5em",
									cursor: "pointer",
									transition: "color 0.3s",
									color: theme.palette.white.main,
								}}
								className="hover-style"
								onClick={() => handleSquareClick(slideIndex)}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Gallery;
