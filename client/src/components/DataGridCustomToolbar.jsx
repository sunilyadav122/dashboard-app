import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { useEffect } from "react";

function DataGridCustomToolbar({ apiCall, search, setSearch }) {
  const debounce = (fn, delay) => {
    let id;
    return (value) => {
      clearTimeout(id);
      id = setTimeout(() => fn(value), delay);
    };
  };

//   useEffect(() => {
//     debounce(apiCall, 1000)(search);
//   }, [apiCall, search]);

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          sx={{ mb: "0.5rem", width: "15rem" }}
          label="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;
