import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useApiCalendar } from "@/hooks/useApiCalendar";

const Profile = () => {
  const { handleSignOut } = useApiCalendar({ loadEvents: false })
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [authUser, setAuthUser] = useState(null)
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    const loggedUser = window.sessionStorage.getItem('auth');
    const user = JSON.parse(loggedUser);
    if (user) {
      console.log('user|||: ', user)
      return () => setAuthUser(user);
    }
  }, []);
  

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
      <Typography sx={{
        fontSize: '14px',
        fontWeight: 600
      }}>
        {authUser?.dataProfile?.email}
        </Typography>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        {
          authUser && (
            <Avatar
              src={authUser.dataProfile.picture}
              alt={authUser.dataProfile.fullname}
              sx={{
                width: 35,
                height: 35,
              }}
            />
          )
        }
      </IconButton>
      </Box>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
