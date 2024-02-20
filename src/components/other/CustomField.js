import { TextField, IconButton, InputAdornment } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const CustomField = ({
  label,
  width,
  size,
  error,
  margin,
  password,
  value,
  ...rest
}) => {
  const errorMessageStyles = {
    color: "red",
    fontSize: "0.7em",
    height: "20px",
  };

  const fieldContainer = {
    margin: margin,
    width: width,
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div style={fieldContainer}>
      <Field
        as={TextField}
        {...rest}
        placeholder={label}
        variant="outlined"
        size={size ? size : "small"}
        fullWidth
        type={password ? (showPassword ? "text" : "password") : "text"}
        value={value}
        InputProps={{
          endAdornment: password && (
            <InputAdornment position="end" sx={{ marginRight: -1 }}>
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {!error ? null : (
        <div style={errorMessageStyles}>
          <ErrorMessage name={rest.name} component="div" className="error" />
        </div>
      )}
    </div>
  );
};

export default CustomField;
