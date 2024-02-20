import { useTheme } from "@mui/material/styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchInput from "./SearchInput";

function SearchMobile({ onClickSearchMobile, searchOpen }) {
  const theme = useTheme();
  const SearchContainerMobile = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
    width: "100%",
    borderBottom: "1px solid black",
    borderRadius: "0px 0px 2px 2px",
    backgroundColor: theme.palette.grey.opacity70,
    zIndex: 20,
    boxShadow: "0px -1.5px 5px 0px rgba(0, 0, 0, 0.9)",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginTop: 55,
    position:"fixed"

  };

  const handleClickSearchMobile = () => {
    onClickSearchMobile();
  };
  return (
    <div style={SearchContainerMobile}>
      <div style={{ width: "15%" }}>
        {searchOpen && (
          <div
          style={{ display: "flex", justifyContent: "center" }}
            onClick={handleClickSearchMobile}
          >
            <ArrowBackIcon sx={{ color: theme.palette.primary.main }} />
          </div>
        )}
      </div>
      <div
        style={{ width: "70%", display: "flex", justifyContent: "center" }}
        onClick={handleClickSearchMobile}
      >
        <SearchInput />
      </div>
      <div style={{ width: "15%", backgroundColor: "yellow" }}></div>
    </div>
  );
}

export default SearchMobile;
