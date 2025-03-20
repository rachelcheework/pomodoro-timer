import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, CssBaseline, IconButton, useMediaQuery, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const drawerWidth = "250px";

const SideNavBar = ({ newSession }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // check if screen is small

  // toggle sidebar on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // close sidebar on mobile when clicking on tab
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false); // Close drawer on mobile
    };
  };

  const drawer = (
    <div>
      <Toolbar /> {/* Keeps content below AppBar */}
      <List>
        <ListItem disablePadding sx={{mb: 7}}>
          <Tooltip title={"Back to timer!"}>
            <ListItemButton onClick={() => handleNavigation("/")}
              sx={{
                "&:hover": {
                  backgroundColor: "#90caf9", 
                  transform: "scale(1.05)", 
                  transition: "all 0.3s ease-in-out",
                },
                "&:active": {
                  transition: "transform 0.1s ease-in-out",
                }
              }}
            >
              <AccessTimeIcon sx={{ml: 6, mr: 2}}/>
              <ListItemText primary="Timer" slotProps={{primary: {style: {fontSize: "20px"}}}} />
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title={newSession ? "Change timer settings here!":"Reset timer to change settings!" }>
            <div className="settings-button">
              <ListItemButton
                onClick={() => handleNavigation("/settings")}
                disabled={!newSession} // disable button when timer is running
                sx={{
                  "&:hover": {
                    backgroundColor: "#90caf9", 
                    transform: "scale(1.05)", 
                    transition: "all 0.3s ease-in-out",
                  },
                  "&:active": {
                    transition: "transform 0.1s ease-in-out",
                  }
                }}
              >
                <SettingsIcon sx={{ml: 6, mr: 2}}/>
                <ListItemText primary="Settings" slotProps={{primary: {style: {fontSize: "20px"}}}}/>
              </ListItemButton>
            </div>
          </Tooltip>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <CssBaseline />

      {/* Show menu icon only on mobile */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1300, // ensures button is above page-content & sidenavbar drawer (z-index: 1200 according to inspect)
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar - Permanent on large screens, Temporary on mobile */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? 0 : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: isMobile ? "60vw" : drawerWidth, boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default SideNavBar;
