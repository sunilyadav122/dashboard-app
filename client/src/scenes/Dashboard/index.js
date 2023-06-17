import { Box, Grid, Paper } from "@mui/material";
import StatBox from "components/StatBox";
import React from "react";
import OverviewChart from "components/OverviewChart";
import { Email } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import BreakdownChart from "components/BreakdownChart";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminsQuery } from "state/api";

const Dashboard = () => {
  const {data,isLoading} = useGetAdminsQuery()
  const theme = useTheme();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];  
  return (
    <Box m="1rem 2rem">
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Grid container spacing={2}>
                <Grid item sx={12} md={6}>
                  <StatBox
                    title="Total Customers"
                    // value={data && data.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                      <Email
                        sx={{
                          color: theme.palette.secondary[300],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item sx={12} md={6}>
                  <StatBox
                    title="Total Customers"
                    // value={data && data.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                      <Email
                        sx={{
                          color: theme.palette.secondary[300],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item sx={12} md={6}>
                  <StatBox
                    title="Total Customers"
                    // value={data && data.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                      <Email
                        sx={{
                          color: theme.palette.secondary[300],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item sx={12} md={6}>
                  <StatBox
                    title="Total Customers"
                    // value={data && data.totalCustomers}
                    increase="+14%"
                    description="Since last month"
                    icon={
                      <Email
                        sx={{
                          color: theme.palette.secondary[300],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={12} md={6}>
              <Paper
                sx={{
                  height: "43vh",
                  background: theme.palette.background.alt,
                }}
              >
                <OverviewChart isDashboard={true} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item sx={12} md={6}>
            <Paper
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
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
          height:'40vh'
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(rows) => rows._id}
          columns={columns}
          rows={data || []}
        />
      </Paper>
            </Grid>
            <Grid item sx={12} md={6}>
              <Paper
                sx={{
                  height: "40vh",
                  background: theme.palette.background.alt,
                }}
              >
                <BreakdownChart isDashboard={true} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
