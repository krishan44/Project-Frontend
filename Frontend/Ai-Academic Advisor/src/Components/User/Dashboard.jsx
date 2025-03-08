import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  CircularProgress,  // Add this import
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
  Timeline as RoadmapIcon, // Add this import
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Overview from './Overview'; // Add this import at the top

const drawerWidth = 280; // Increased width for better readability

const Dashboard = ({ content, initialTab = 'Dashboard' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    let isMounted = true;
    
    const initializeData = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      
      try {
        const userID = localStorage.getItem('UserId');
        if (!userID) {
          navigate('/');
          return;
        }
        
        // Fetch student data
        const studentResponse = await axios.get(`http://localhost:5001/api/student/getByUserID/${userID}`);
        if (isMounted && studentResponse.data && studentResponse.data.studentID) {
          localStorage.setItem('studentId', studentResponse.data.studentID);
          localStorage.setItem('Name', studentResponse.data.FullName);

          // Fetch target data using student ID
          const targetResponse = await axios.get(`http://localhost:5001/api/target/getByStudentId/${studentResponse.data.studentID}`);
          if (isMounted && targetResponse.data && targetResponse.data.target) {
            localStorage.setItem('target', targetResponse.data.target);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) {
          // Handle error state if needed
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999
      }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = async (text) => {
    setIsSectionLoading(true);
    setActiveTab(text);
    
    try {
      switch(text) {
      case 'Dashboard':
        await new Promise(resolve => setTimeout(resolve, 500)); // Add minimal delay for smoother transition
        navigate('/dashboard');
        break;
      case 'Roadmap':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/roadmap');
        break;
      case 'Degrees':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/degrees');
        break;
      case 'Certificates':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/certificates');
        break;
      case 'Courses':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/courses');
        break;
      case 'Careers':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/careers');
        break;
      case 'Skills':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/skills');
        break;
      case 'Future':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/future');
        break;
      case 'Settings':
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/settings');
        break;
      default:
        break;
      }
    } finally {
      setTimeout(() => {
        setIsSectionLoading(false);
      }, 300);
    }
  };

  const Name= localStorage.getItem('Name');

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Roadmap', icon: <RoadmapIcon />, badge: 'New' }, // Add this line after Dashboard
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
        }}>Kk</Avatar>
        <Box>
          <Typography variant="h6" fontWeight="600">{Name}</Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleMenuClick(item.text)}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.5,
              position: 'relative',
              cursor: 'pointer',
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
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
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
          position: 'relative',
        }}
      >
        {isSectionLoading && (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 9999
          }}>
            <CircularProgress />
          </Box>
        )}
        <Box sx={{ 
          opacity: isSectionLoading ? 0.3 : 1,
          transition: 'opacity 0.3s ease-in-out',
          filter: isSectionLoading ? 'blur(2px)' : 'none',
        }}>
          {content || <Overview />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;