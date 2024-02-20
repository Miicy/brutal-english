import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CustomLoginButton = ({ textButton, disabled, onClick, isAdmin }) => {
  const theme = useTheme();

  const buttonLoginStyles = {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.white.main,
    },
    "&:disabled": {
      backgroundColor: theme.palette.primaryLighter.main,
      border: `solid 1px ${theme.palette.white.opacity20}`,
      color: theme.palette.white.opacity20,
    },
    marginBottom: isAdmin && "30px"
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      disabled={disabled}
      onClick={onClick}
      sx={buttonLoginStyles}
    >
      {textButton ? textButton : "Login"}
    </Button>
  );
};

export default CustomLoginButton;
