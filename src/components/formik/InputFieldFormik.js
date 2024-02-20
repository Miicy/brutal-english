import { TextField } from "@mui/material";

const InputFieldFormik = ({ field, form, type, helperText, sx, ...rest }) => {
	const { value, name, onBlur, onChange } = field;
	const { getFieldMeta } = form;
	const { error, touched } = getFieldMeta(name);

	const handleErrorDetection = () => {
		if (error) {
			return error;
		} else {
			return " ";
		}
	};

	const handleHelperText = () => {
		if (helperText) {
			return helperText;
		} else {
			return " ";
		}
	};

	return (
		<TextField
			sx={sx ? sx : null}
			type={type}
			name={name}
			title={error}
			onBlur={onBlur}
			onChange={onChange}
			value={value ? value : ""}
			error={!!error && touched}
			helperText={touched ? handleErrorDetection() : handleHelperText()}
			{...rest}
		/>
	);
};

export default InputFieldFormik;
