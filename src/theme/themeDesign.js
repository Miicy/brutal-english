import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
	palette: {
		primary: {
			main: "#111111",
			opacity96: "rgba(17, 18, 18, 0.96)",
			opacity85: "rgba(17, 18, 18, 0.85)",
		},
		primaryLighter: {
			main: "#202121",
			opacity40: "rgba(32, 33, 33, 0.40)",
			opacity60: "rgba(32, 33, 33, 0.60)",
			opacity75: "rgba(32, 33, 33, 0.75)",
			opacity80: "rgba(32, 33, 33, 0.88)",
			opacity95: "rgba(32, 33, 33, 0.95)",
		},
		secondary: {
			main: "#ff6600",
			secondary: "#f25100",
			opacity80: "rgba(255, 102, 0, 0.80)",
			opacity50: "rgba(255, 102, 0, 0.50)",
		},
		white: {
			main: "#FFFFFF",
			second: "#ebebeb",
			opacity20: "rgba(255, 255, 255, 0.20)",
			opacity50: "rgba(255, 255, 255, 0.50)",
			opacity70: "rgba(255, 255, 255, 0.70)",
		},
		grey: {
			main: "#D5D4D4",
			opacity70: "rgba(213, 212, 212, 0.70)",
			darker: "#949393",
			darkerOpacity85: "rgba(148, 147, 147, 0.85)",
		},
		yellow: {
			main: "#f7ca00",
			opacity80: "rgba(247, 202, 0, 0.80)",
		},
		customRed: {
			main: red[400],
			secondary: "#E10600",
		},
		divider: grey[400],
		text: {
			primary: grey[900],
			secondary: grey[700],
		},
	},
});

export const themeCreation = () =>
	createTheme({
		...getDesignTokens(),
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiOutlinedInput-root": {
							borderRadius: 5,
							fontSize: "0.80em",
							backgroundColor: "white",
							borderColor: "black",
							"&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
								borderColor: "rgba(17, 18, 18, 0.50)",
							},
						},
					},
				},
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						backgroundColor: "#111212",
						color: "white",
						fontSize: "0.9em",
					},
				},
			},
			MuiSlider: {
				styleOverrides: {
					thumb: {
						backgroundColor: "white",
					},
					track: {
						backgroundColor: grey[400],
					},
					rail: {
						backgroundColor: grey[600],
					},
				},
			},
		},
	});
