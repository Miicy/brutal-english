import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/SearchOutlined";

const SearchInput = ({ searchValue, setSearchValue, onSearch }) => {
	const theme = useTheme();
	const isScreenSmall = useMediaQuery("(max-width:1000px)");

	return (
		<TextField
			type="text"
			size="small"
			placeholder="Search..."
			onChange={(e) => setSearchValue(e.target.value)}
			value={searchValue}
			color="secondary"
			sx={{ width: isScreenSmall ? "220px" : "60%" }}
			InputProps={{
				sx: { backgroundColor: theme.palette.secondary.main },
				endAdornment: [
					searchValue && (
						<InputAdornment>
							<ClearIcon
								onClick={() => setSearchValue("")}
								sx={{ fontSize: "1em" }}
							/>
						</InputAdornment>
					),
					<InputAdornment
						key="searchIcon"
						position="end"
						sx={{ marginRight: -1, height: "2em", ":hover": "orange" }}
					>
						<Divider
							sx={{ ml: 0.5, mr: 0.5, height: "80%" }}
							orientation="vertical"
							variant="middle"
						/>
						<SearchIcon
							onClick={() => onSearch()}
							sx={{
								fontSize: "1.3em",
								cursor: "pointer",
								color: "black",
								transition: "color 0.3s",
								":hover": {
									color: theme.palette.secondary.main,
								},
							}}
						/>
					</InputAdornment>,
				],
			}}
		/>
	);
};

export default SearchInput;
