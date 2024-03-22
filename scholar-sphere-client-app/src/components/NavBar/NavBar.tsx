import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import SchoolIcon from "@mui/icons-material/School";
import "./NavBar.scss";
import {
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import axiosInstance from "../../services/axiosInstance";
import { IUser } from "../../interfaces/IUser";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Feed from "../Feed/Feed";
import Home from "../Home/Home";
import userService from "../../services/userService";

const NavBar = () => {
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const pages = ["Home", "Feed"];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    setToken(localStorage.getItem("jwtToken")?.toString());
    if (token != null || token != "") {
      fetchData();
    }
  }, []);

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters>
          <SchoolIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ScholaricSphere
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/Feed";
                }}
              >
                <Typography textAlign="center">Feed</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ScholaricSphere
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/Feed";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Feed
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <DrawerComponent username={user?.userName} />
            ) : (
              <div>
                <Button href="/signin" variant="contained">
                  Sign in
                </Button>
                <Button href="/register" variant="contained">
                  Register
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
