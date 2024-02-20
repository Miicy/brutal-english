import Login from "../../auth/Login";
import { useTheme } from "@emotion/react";
import backgroundImageMobile from "../../../media/gym-phone.jpg";

function LoginPageMobile() {
  const theme = useTheme();
  const loginPageMobileContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    width: "100vw",
		backgroundImage:`url(${backgroundImageMobile})`,

    zIndex: 5,
  };
  const loginPageContainer={
    width:"95%",
    borderRadius: "5px",
    height:"95%",
		backgroundColor: theme.palette.primaryLighter.opacity95,
  }
  return (
    <div style={loginPageMobileContainer}>
      <div style={loginPageContainer}>
      <Login
        width={"100%"}
        size={"medium"}
        error={true}
        margin={"5px 0 5px 0"}

      />
      </div>
    </div>
  );
}

export default LoginPageMobile;
