import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText } from "@mui/material";
import { getCategoryNameFromId } from "../../helpers/functions";

const ITEM_HEIGHT = 48;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5,
			width: 250,
		},
	},
};

export default function MultipleSelectCheckmarks({
	values,
	field,
	form,
	title,
	edit = false,
}) {
	const [valueNames, setValueNames] = React.useState([]);
	const { name, onBlur } = field;
	const { getFieldMeta } = form;
	const { error, touched, value } = getFieldMeta(name);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		form.setFieldValue(name, value);
		setValueNames(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value,
		);
	};

	const handleErrorDetection = () => {
		if (error) {
			return error;
		} else {
			return " ";
		}
	};

	const handleEditValueChange = () => {
		if (touched && valueNames.length > 0) {
			return valueNames;
		}
		return value.map((valueX) => getCategoryNameFromId(values, valueX));
	};

	const handleChecked = (category) => {
		if (edit) {
			return value.includes(category._id) ||
				valueNames.indexOf(category.name) > -1
				? true
				: false;
		}
		return valueNames.indexOf(category.name) > -1;
	};

	return (
		<FormControl sx={{ width: "49%" }} size="small">
			<InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={edit ? handleEditValueChange() : valueNames}
				onChange={handleChange}
				input={<OutlinedInput label={title} />}
				renderValue={(selected) => selected.join(", ")}
				MenuProps={MenuProps}
				onBlur={onBlur}
				error={!!error && touched}
				onFocus={() => form.setFieldTouched(name, true)}
			>
				{values.map((category) => (
					<MenuItem key={category._id} value={category.name}>
						<Checkbox checked={handleChecked(category)} />
						<ListItemText primary={category.name} />
					</MenuItem>
				))}
			</Select>
			{touched && error ? (
				<FormHelperText sx={{ color: "#d32f2f", position:"absolute", bottom:-15, }}>
					{handleErrorDetection()}
				</FormHelperText>
			) : null}
		</FormControl>
	);
}
