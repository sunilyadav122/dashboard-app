import { Box } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import {
  useLazyGetTransactionsQuery,
} from "state/api";
import { useTheme } from "@emotion/react";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});
  const theme = useTheme();
  const [trigger, result] = useLazyGetTransactionsQuery();
  const { data, isLoading } = result;
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value?.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return `$${Number(params.value).toFixed(2)}`;
      },
    },
  ];
  console.log("Data :- ", data);

  const apiCall = useCallback((str) => {
    trigger({
      currentPage: paginationModel.page,
      pageSize: paginationModel.pageSize,
      search:str || '',
      sort: JSON.stringify({ ...sort[0] }),
    });
  }, [paginationModel.page, paginationModel.pageSize,sort?.field]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  return (
    <Box m="1.5rem 1rem">
      <Header title="Transactions" subtitle="Get your transaction list here" />
      <Box
        height="70vh"
        mt="0.3rem"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          columns={columns}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          pageSizeOptions={[20, 50, 100]}
          rowCount={(data && data.total) || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => setSort({ ...newSortModel })}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              apiCall,
              search,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
