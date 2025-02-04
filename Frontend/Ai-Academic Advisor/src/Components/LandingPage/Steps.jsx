import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  IconButton,
  Collapse,
  useTheme,
  styled,
  keyframes,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Create Emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
});

// Enhanced theme configuration
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    h3: {
      fontWeight: 900,
      letterSpacing: '-1.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Inter', sans-serif !important;
        }
        body {
          background: #f9faff;
        }
      `
    }
  }
});

// Styled components
const GradientCard = styled(Card)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${color} 0%, ${theme.palette.background.paper} 100%)`,
  position: 'relative',
  overflow: 'visible',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, ${color}, ${theme.palette.background.paper})`,
    borderRadius: theme.shape.borderRadius * 2,
    zIndex: -1,
  }
}));

const TimelineConnector = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '4px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '2px',
  zIndex: 0,
}));

function Steps() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedStep, setExpandedStep] = useState(null);

  // Update the steps array with new colors
  const steps = [
    {
      icon: <AccountCircleIcon />,
      title: 'Create Account',
      description: 'Begin your personalized journey',
      details: 'Provide Basic Details about you and your Education ',
      color: '#4f46e5', // Rich indigo
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
    },
    {
      icon: <EditIcon />,
      title: 'Build Profile',
      description: 'Showcase your academic journey',
      details: 'Dynamic form with progress tracking and smart suggestions',
      color: '#0891b2', // Vibrant cyan
      gradient: 'linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'AI Analysis',
      description: 'Smart profile evaluation',
      details: 'Real-time processing indicators with estimated completion time',
      color: '#ea580c', // Bright orange
      gradient: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
    },
    {
      icon: <CheckCircleIcon />,
      title: 'Get Roadmap',
      description: 'Personalized success plan',
      details: 'Interactive roadmap with milestone tracking and resource links',
      color: '#16a34a', // Rich green
      gradient: 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)',
    },
    {
      icon: <LoopIcon />,
      title: 'Iterate & Grow',
      description: 'Continuous improvement',
      details: 'If the current selected profession is not a Fit change it to another one',
      color: '#7c3aed', // Deep purple
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    }
  ];

  const StepCard = ({ step, index }) => (
    <Box sx={{ 
      position: 'relative',
      zIndex: 1,
      mb: { xs: 4, md: 8 },
      width: { xs: '100%', md: 'auto' },
      '&:last-child': { mb: 0 }
    }}>
      {/* Timeline Dot */}
      <Box sx={{
        position: 'absolute',
        left: { xs: 0, md: '50%' },
        top: 0,
        transform: {
          xs: 'translate(0, -50%)',
          md: 'translate(-50%, -50%)'
        },
        width: { xs: 40, md: 48 },
        height: { xs: 40, md: 48 },
        borderRadius: '50%',
        bgcolor: 'background.paper',
        border: `3px solid ${step.color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme.shadows[4],
        zIndex: 3
      }}>
        {React.cloneElement(step.icon, { 
          sx: { 
            color: step.color,
            fontSize: { xs: 24, md: 30 }
          }
        })}
      </Box>

      <Card
        sx={{
          width: { xs: '90%', md: '400px' },
          ml: { xs: 5, md: 'auto' },
          mr: { xs: 2, md: 'auto' },
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          background: step.gradient,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at top left, ${step.color}20, transparent 50%)`,
            opacity: 0.8
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, transparent, ${step.color}30)`,
            opacity: 0.6
          },
          boxShadow: `0 8px 32px ${step.color}40`,
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: `0 12px 40px ${step.color}60`,
          },
          transition: 'all 0.3s ease'
        }}
        onClick={() => setExpandedStep(expandedStep === index ? null : index)}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: 'white',
            mb: 1
          }}>
            {step.title}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255,255,255,0.9)',
            mb: 2
          }}>
            {step.description}
          </Typography>

          <Collapse in={expandedStep === index}>
            <Box sx={{
              mt: 2,
              p: 2,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${step.color}20, transparent)`,
                opacity: 0.5
              }
            }}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {step.details}
              </Typography>
            </Box>
          </Collapse>

          <Box sx={{ 
            textAlign: 'center',
            mt: 2,
            color: 'rgba(255,255,255,0.8)',
            transition: 'all 0.3s ease'
          }}>
            <ExpandMoreIcon sx={{
              transform: expandedStep === index ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease'
            }} />
          </Box>
        </Box>
      </Card>
    </Box>
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, position: 'relative' }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              mb: { xs: 4, md: 8 },
              fontSize: { xs: '2rem', md: '3rem' },
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: 120,
                height: 4,
                background: theme.palette.primary.main,
                mx: 'auto',
                mt: 3,
                borderRadius: 2
              }
            }}
          >
            Your Pathway to Success
          </Typography>

          <Box sx={{ 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: 20, md: '50%' },
              transform: 'translateX(-50%)',
              height: '100%',
              width: '4px',
              bgcolor: 'primary.main'
            }
          }}>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <StepCard step={step} index={index} />
                {!isMobile && index < steps.length - 1 && (
                  <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    top: `calc(${(index * 20)}% + 160px)`,
                    height: 80,
                    width: 4,
                    background: `linear-gradient(to bottom, ${steps[index].color}, ${steps[index + 1].color})`,
                    transform: 'translateX(-50%)'
                  }} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default Steps;