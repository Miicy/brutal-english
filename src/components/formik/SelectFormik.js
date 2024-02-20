import * as React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText, ListItemText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5,
			width: 250,
		},
	},
};

export default function SelectFormik({
	values,
	field,
	form,
	title,
	edit = false,
}) {
	const [chosenValue, setChosenValue] = React.useState("");
	const { name, onBlur } = field;
	const { getFieldMeta } = form;
	const { error, touched, value } = getFieldMeta(name);

	const handleChange = (event) => {
		setChosenValue(event.target.value);
		form.setFieldValue(name, event.target.value);
	};

	const handleErrorDetection = () => {
		if (error) {
			return error;
		} else {
			return " ";
		}
	};

	const handleEditValueChange = () => {
		if (touched && chosenValue !== "") {
			return chosenValue;
		}
		return value;
	};

	return (
		<Box sx={{ minWidth: "49%", }} >
			<FormControl fullWidth size="small">
				<InputLabel id="demo-simple-select-label">{title}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={edit ? handleEditValueChange() : chosenValue}
					label={title}
					onChange={handleChange}
					onFocus={() => form.setFieldTouched(name, true)}
					onBlur={onBlur}
					error={!!error && touched}
					MenuProps={MenuProps}
					style={{ height: 40 }}
				>
					{values.map((value) => (
						<MenuItem value={value._id} key={value._id} >							
							<ListItemText  primary={value.name} />
						</MenuItem>
					))}
				</Select>
				{touched && error ? (
					<FormHelperText sx={{ color: "#d32f2f" }}>
						{handleErrorDetection()}
					</FormHelperText>
				) : null}
			</FormControl>
		</Box>
	);
}
