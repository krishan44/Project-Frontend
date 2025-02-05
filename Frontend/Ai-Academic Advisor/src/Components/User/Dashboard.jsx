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
  Badge,
  LinearProgress,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle,
  TrendingUp,
  TaskAlt,
  EmojiEvents,
  Schedule,
  Code as CodeIcon, // Add this import
  Bookmark as BookmarkIcon, // Add this import for Degrees icon
  WorkspacePremium as CertificateIcon, // Add this import for Certificates icon
  Business as BusinessIcon, // Add this import for Careers icon
  LocalLibrary as CoursesIcon, // Add this import for Courses icon
  Timeline as FutureIcon, // Add this import for Future icon
} from '@mui/icons-material';

const drawerWidth = 280; // Increased width for better readability

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Degrees', icon: <BookmarkIcon />, badge: '3' }, // Replace Profile with Degrees
    { text: 'Certificates', icon: <CertificateIcon />, badge: '8' }, // Replace Learning Path with Certificates
    { text: 'Courses', icon: <CoursesIcon />, badge: '15' }, // Add Courses section
    { text: 'Careers', icon: <BusinessIcon />, badge: '12' }, // Replace Career Path with Careers
    { text: 'Skills', icon: <CodeIcon />, badge: '5' }, // Add this new item
    { text: 'Future', icon: <FutureIcon />, badge: '4' }, // Add Future section
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      height: '100%',
      background: '#ffffff',
      borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    }}>
      {/* Profile Section */}
      <Box sx={{ 
        p: 3, 
        mb: 2,
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
        }}>JD</Avatar>
        <Box>
          <Typography variant="h6" fontWeight="600">John Doe</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5 
          }}>
            <SchoolIcon sx={{ fontSize: 16 }} />
            Student Level 3
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => setActiveTab(item.text)}
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
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 40,
              color: activeTab === item.text ? 'primary.main' : 'text.secondary',
              transition: 'color 0.2s ease-in-out',
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
              <Chip
                label={item.badge}
                size="small"
                color={item.text === activeTab ? "primary" : "default"}
                sx={{ 
                  height: 20,
                  minWidth: 20,
                  fontSize: '0.75rem',
                }}
              />
            )}
          </ListItem>
        ))}
      </List>

      {/* Bottom Section */}
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
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ minHeight: '64px!important' }}>
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
            <Badge badgeContent={3} color="error">
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
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 0, 0, 0.05)',
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
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {/* Welcome Card */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: theme.shadows[4],
                }}
              >
                <Box>
                  <Typography variant="h4" fontWeight="600" gutterBottom>
                    Welcome back, John! 👋
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    You have 3 new courses to explore this week
                  </Typography>
                  <Chip
                    label="Continue Learning"
                    variant="outlined"
                    sx={{ 
                      mt: 2, 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    clickable
                  />
                </Box>
                <SchoolIcon sx={{ fontSize: 80, opacity: 0.2, display: { xs: 'none', sm: 'block' } }} />
              </Paper>
            </Grid>

            {/* Stats Cards */}
            {[
              { title: 'Courses Completed', value: '12', icon: <CheckCircle fontSize="large" />, progress: 60 },
              { title: 'Hours Learned', value: '48', icon: <Schedule fontSize="large" />, progress: 30 },
              { title: 'Current Streak', value: '7 days', icon: <TrendingUp fontSize="large" />, progress: 70 },
              { title: 'Achievement Points', value: '850', icon: <EmojiEvents fontSize="large" />, progress: 85 },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  '&:hover': { boxShadow: theme.shadows[4] },
                  transition: '0.3s',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2
                    }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="600">
                          {stat.value}
                        </Typography>
                      </Box>
                      <Avatar sx={{ 
                        bgcolor: 'primary.light', 
                        color: 'primary.main',
                        width: 48,
                        height: 48,
                      }}>
                        {stat.icon}
                      </Avatar>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.progress} 
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'action.selected',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Recent Activity */}
            <Grid item xs={12} md={8}>
              <Paper 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight="600">Recent Activity</Typography>
                  <Chip label="View All" size="small" clickable />
                </Box>
                <List sx={{ p: 0 }}>
                  {[
                    { text: 'Completed React Fundamentals', time: '2h ago' },
                    { text: 'Achieved JavaScript Expert Badge', time: '1d ago' },
                    { text: 'Started Node.js Course', time: '3d ago' },
                  ].map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          '&:hover': { 
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <TaskAlt color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.text}
                          secondary={activity.time}
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                        <ChevronRightIcon sx={{ color: 'action.active' }} />
                      </ListItem>
                      {index < 2 && <Divider variant="inset" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Upcoming Tasks */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight="600">Upcoming Tasks</Typography>
                  <Chip label="View All" size="small" clickable />
                </Box>
                <List sx={{ p: 0 }}>
                  {[
                    { task: 'Complete Profile Setup', progress: 80 },
                    { task: 'Take Final Assessment', progress: 45 },
                    { task: 'Review Career Goals', progress: 20 },
                  ].map((task, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        '&:hover': { 
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemText
                        primary={task.task}
                        secondary={
                          <LinearProgress 
                            variant="determinate" 
                            value={task.progress} 
                            sx={{ 
                              mt: 1,
                              height: 6,
                              borderRadius: 4,
                            }}
                          />
                        }
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;