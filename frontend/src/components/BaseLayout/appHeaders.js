import React, { useContext, useState } from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  Modal,
  TextField,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";

import { AccountCircle, Category, Home, ListAlt } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/authContextProvider";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import useRequestAuth from "../../hooks/useRequestAuth";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AppHeaders(props) {
  const { window } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, logoutPending } = useRequestAuth();

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;
  const navItems = [
    { key: "home", name: "Home", to: "", icon: <Home /> },
    {
      key: "categories",
      name: "Categories",
      to: "/categories",
      icon: <Category />,
    },
    { key: "tasks", name: "Tasks", to: "/tasks", icon: <ListAlt /> },
  ];

  const modal = (
    <Modal open={modalIsOpen} onClose={handleCloseModal}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          Profile
        </Typography>
        <TextField
          id="username"
          variant="outlined"
          label="username"
          value={user ? user.username : ""}
          disabled
          sx={{ mb: 3, width: "100%" }}
        />
      </Box>
    </Modal>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Dashboard
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.to}
              key={item.key}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
                <MenuItem
                  disabled={logoutPending}
                  onClick={() => {
                    logout();
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {logoutPending ? (
                      <CircularProgress size={20} sx={{ mr: 2 }} />
                    ) : null}
                  </Box>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        {modal}
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
