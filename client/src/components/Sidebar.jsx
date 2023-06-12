import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Drawer from '@mui/material/Drawer'
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { navItems } from "Contants";

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobileDevice,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    console.log(pathname);
    setActive(pathname.substring(1));
  }, [pathname]);

  const NavbarListItem = ({ text, icon }) => {
    const lcText = text.toLowerCase();
    const isActive = active === lcText;
    return (
      <ListItem
        disablePadding
        onClick={() => {
          navigate(`/${lcText}`);
          setActive(lcText);
        }}
      >
        <ListItemButton
          sx={{
            backgroundColor: isActive
              ? theme.palette.secondary[300]
              : "transparent",
            color: isActive
              ? theme.palette.primary[600]
              : theme.palette.secondary[100],
          }}
        >
          <ListItemIcon
            sx={{
              ml: "1.3rem",
              color: isActive
                ? theme.palette.primary[600]
                : theme.palette.secondary[200],
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
          {isActive && <ChevronRightOutlined />}
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Drawer
    open={isSidebarOpen}
    onClose={() => setIsSidebarOpen(false)}
    variant="persistent"
    anchor="left"
    sx={{
      width: drawerWidth,
      "& .MuiDrawer-paper": {
        color: theme.palette.secondary[200],
        backgroundColor: theme.palette.background.alt,
        boxSizing: "border-box",
        borderWidth: isNonMobileDevice ? 0 : "2px",
        width: drawerWidth,
      },
      transition: "width 0.5s",
    }}
  >
    <Box width="100%">
      <Box m="1rem 1.5rem 1.5rem 2.5rem">
        <FlexBetween color={theme.palette.secondary.main}>
          <Box display="flex" alignItems="center" gap="0.4rem">
            <Typography variant="h4" fontWeight="bold">
              DashBoard
            </Typography>
            {!isNonMobileDevice && (
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <ChevronLeft />
              </IconButton>
            )}
          </Box>
        </FlexBetween>
      </Box>
      <List>
        {navItems.map(({ text, icon }) => {
          if (!icon) {
            return (
              <Typography key={text} sx={{ m: "1rem 0 0.5rem 1rem" }}>
                {text}
              </Typography>
            );
          }
          return <NavbarListItem key={text} text={text} icon={icon} />;
        })}
      </List>
    </Box>
    <Box>
      <Divider />
      <FlexBetween margin="1rem 2rem 1.2rem 2rem">
        <Box
          component="img"
          src={profileImage}
          alt="Profile Image"
          width="40px"
          height="40px"
          sx={{
            objectFit: "cover",
          }}
          borderRadius="50%"
        />
        <Box textAlign="left">
          <Typography
            fontWeight="bold"
            fontSize="0.9rem"
            sx={{
              color: theme.palette.secondary[100],
            }}
          >
            {user.name}
          </Typography>
          <Typography
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            {user.occupation}
          </Typography>
        </Box>
        <SettingsOutlined
          sx={{
            color: theme.palette.secondary[300],
            fontSize: "22px",
          }}
        />
      </FlexBetween>
    </Box>
  </Drawer>
  )

  return (<Box component="nav">
      {isSidebarOpen && (
      drawer
      )}
    </Box>
  );
};

export default Sidebar;
