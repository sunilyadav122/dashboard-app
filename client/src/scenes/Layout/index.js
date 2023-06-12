import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; //Render's Children Component
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useSelector } from "react-redux";
import { userIdSelector } from "state/selectors";

const Layout = () => {
  const isNonMobileDevice = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector(userIdSelector);
  const { data } = useGetUserQuery(userId);
  console.log(data);
  return (
    <Box
      display={isNonMobileDevice ? "flex" : "block"}
      width="100%"
      height="100%"
    >
      <Sidebar
        user={data || {}}
        isNonMobileDevice={isNonMobileDevice}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
      flexGrow={1}
      >
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
