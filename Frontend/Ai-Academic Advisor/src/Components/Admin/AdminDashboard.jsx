import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  useMediaQuery,
  Badge,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const AdminDashboard = ({ content }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Users', icon: <GroupIcon />, path: '/admin/users', badge: '24' },
    { text: 'Profile', icon: <PersonIcon />, path: '/admin/profile' },
  ];

  const handleMenuClick = (path, text) => {
    setActiveTab(text);
    navigate(path);
  };

  const drawer = (
    <Box sx={{ height: '100%', background: '#ffffff' }}>
      <Box sx={{ 
        p: 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Avatar sx={{ 
          width: 56,
          height: 56,
          bgcolor: 'primary.main',
          fontSize: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>A</Avatar>
        <Box>
          <Typography variant="h6" fontWeight="600">Admin</Typography>
          <Typography variant="body2" color="text.secondary">System Administrator</Typography>
        </Box>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleMenuClick(item.path, item.text)}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.5,
              position: 'relative',
              bgcolor: activeTab === item.text ? 'primary.lighter' : 'transparent',
              '&:before': activeTab === item.text ? {
                content: '""',
                position: 'absolute',
                left: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                height: '60%',
                width: 4,
                bgcolor: 'primary.main',
                borderRadius: '0 4px 4px 0',
              } : {},
              '&:hover': {
                bgcolor: activeTab === item.text ? 'primary.lighter' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 40,
              color: activeTab === item.text ? 'primary.main' : 'text.secondary',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: activeTab === item.text ? 600 : 500,
                color: activeTab === item.text ? 'primary.main' : 'text.primary',
              }}
            />
            {item.badge && (
              <Badge badgeContent={item.badge} color="primary" />
            )}
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'error.lighter',
              color: 'error.main',
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
