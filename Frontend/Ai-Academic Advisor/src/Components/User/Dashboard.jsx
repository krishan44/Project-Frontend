import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,
  useTheme,
  useMediaQuery,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
  ChevronRight as ChevronRightIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '#' },
    { text: 'Profile', icon: <PersonIcon />, href: '#' },
    { text: 'Learning Path', icon: <SchoolIcon />, href: '#' },
    { text: 'Career Path', icon: <WorkIcon />, href: '#' },
    { text: 'Chat', icon: <ChatIcon />, href: '#' },
    { text: 'Settings', icon: <SettingsIcon />, href: '#' },
  ];

  const drawer = (
    <Box sx={{ 
      bgcolor: 'background.default', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Avatar 
          sx={{ 
            width: 56, 
            height: 56, 
            bgcolor: 'primary.main',
            boxShadow: 3
          }}
        >
          JD
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">John Doe</Typography>
          <Chip 
            label="Student" 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            selected={activeSection === item.text}
            onClick={() => setActiveSection(item.text)}
            sx={{
              borderRadius: 2,
              m: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.main',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <ListItem 
          button 
          sx={{ 
            borderRadius: 2,
            bgcolor: 'error.light',
            color: 'white',
            '&:hover': {
              bgcolor: 'error.main',
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 2,
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
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {activeSection}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
              bgcolor: 'background.paper',
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
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Welcome Card with Streak */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 2,
                }}
              >
                <Box flex={1}>
                  <Typography variant="h4" gutterBottom>
                    Welcome back, John!
                  </Typography>
                  <Typography variant="body1">
                    Continue your learning journey and stay motivated!
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FireIcon sx={{ fontSize: 40, color: 'orange' }} />
                  <Typography variant="h5">7 Day Streak</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Quick Stats with Enhanced Design */}
            {[
              { label: 'Courses Completed', value: 12 },
              { label: 'Hours Learned', value: 48 },
              { label: 'Current Streak', value: '7 days' },
              { label: 'Achievement Points', value: 850 },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Card 
                  sx={{ 
                    borderRadius: 2, 
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;