import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getCookie } from '../utils/cookieHelper';

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chans
        </Typography>
        <Box>
            <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {getCookie("user_name")}
                </Typography>
            </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;