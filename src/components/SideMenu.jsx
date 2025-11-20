import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../providers/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicationIcon from '@mui/icons-material/Medication';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import { getCookie } from '../utils/cookieHelper';

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon />, access: 'all' },
  { text: 'Users', path: '/users', icon: <PeopleIcon />, access: 'admin' },
  { text: 'Doctors', path: '/doctors', icon: <MedicationIcon />, access: 'admin' },
  { text: 'Services', path: '/services', icon: <VaccinesIcon />, access: 'admin' },
  { text: 'Appointments', path: '/appointments', icon: <BookOnlineIcon />, access: 'user' },
];

const SideMenu = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // Height of the header
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map((item) => {
          if (item.access === getCookie('user_role') || item.access === 'all') 
            return (
              <ListItem
                button={Button}
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
        })}
        <ListItem
          button={Button}
          key="logout"
          onClick={handleLogout}
          sx={{
            '&.Mui-selected': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;