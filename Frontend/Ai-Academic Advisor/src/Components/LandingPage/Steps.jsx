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
  keyframes
} from '@mui/material';
// Update icon imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

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
  const [expandedStep, setExpandedStep] = useState(null);

  const steps = [
    {
      icon: <AccountCircleIcon fontSize="large"  />,
      title: 'Create Account',
      description: 'Start your journey by creating your personal account',
      details: 'Sign up with your email or social media accounts. Set up a secure password and verify your email to get started.',
      color: theme.palette.primary.main,
    },
    {
      icon: <EditIcon fontSize="large" />,
      title: 'Add your Details',
      description: 'Fill in your academic background, interests, and career goals',
      details: 'Tell us about your academic history, skills, interests, and what you hope to achieve in your career.',
      color: theme.palette.secondary.main,
    },
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: 'Wait For Results',
      description: 'Our AI analyzes your profile',
      details: 'Our advanced AI algorithms process your information to generate personalized recommendations tailored just for you.',
      color: theme.palette.success.main,
    },
    {
      icon: <CheckCircleIcon fontSize="large" />,
      title: 'Follow them',
      description: 'Take action on your path',
      details: 'Review your personalized recommendations and start following the suggested academic and career pathway.',
      color: theme.palette.warning.main,
    },
    {
      icon: <LoopIcon fontSize="large" />,
      title: 'Adjust if needed',
      description: 'Fine-tune your journey',
      details: 'Your path isn\'t set in stone. Adjust your preferences and get new recommendations as your goals evolve.',
      color: theme.palette.info.main,
    }
  ];

  const StepCard = ({ step, index }) => (
    <Box sx={{ 
      position: 'relative',
      zIndex: 1,
      mb: 8,
      '&:last-child': { mb: 0 }
    }}>
      {/* Timeline Dot */}
      <Box sx={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translate(-50%, -50%)',
        width: 48,  // Increased size for better centering
        height: 48, // Increased size for better centering
        borderRadius: '50%',
        bgcolor: 'background.paper',
        border: `3px solid ${step.color}`,
        display: 'flex',
        alignItems: 'center',    // Ensure vertical centering
        justifyContent: 'center', // Ensure horizontal centering
        boxShadow: theme.shadows[4],
        animation: `${pulse} 2s infinite`,
        zIndex: 3, // Increase z-index to ensure visibility
        '&:hover': {
          transform: 'translate(-50%, -50%) scale(1.1)'
        }
      }}>
        {React.cloneElement(step.icon, { 
          sx: { 
            color: step.color,
            fontSize: 30,     // Adjusted size
            display: 'block', // Ensure icon is displayed
            margin: 'auto',   // Added for better centering
          } 
        })}
      </Box>

      <Card
        sx={{
          width: { xs: '90%', md: '400px' },
          mx: 'auto',
          p: 3,
          borderRadius: 4,
          boxShadow: theme.shadows[4],
          transition: 'all 0.3s ease',
          transformOrigin: 'center top',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
        onClick={() => setExpandedStep(expandedStep === index ? null : index)}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: step.color,
            mb: 1
          }}>
            {step.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {step.description}
          </Typography>
        </Box>

        <Collapse in={expandedStep === index}>
          <Typography
            variant="body1"
            sx={{
              p: 2,
              bgcolor: 'background.default',
              borderRadius: 2,
              borderLeft: `3px solid ${step.color}`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: -3,
                width: 16,
                height: 16,
                bgcolor: step.color,
                borderRadius: '50%'
              }
            }}
          >
            {step.details}
          </Typography>
        </Collapse>

        <Box sx={{ 
          textAlign: 'center',
          mt: 2,
          color: expandedStep === index ? step.color : 'text.secondary'
        }}>
          <ExpandMoreIcon sx={{
            transform: expandedStep === index ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s ease'
          }} />
        </Box>
      </Card>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 800,
          mb: 8,
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: 100,
            height: 4,
            bgcolor: 'primary.main',
            mx: 'auto',
            mt: 2,
            borderRadius: 2
          }
        }}
      >
        Your Pathway to Success
      </Typography>

      {/* Main Timeline */}
      <TimelineConnector sx={{
        height: `calc(100% - ${theme.spacing(16)})`,
        top: theme.spacing(16),
        display: { xs: 'none', md: 'block' }
      }} />

      <Box sx={{ 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '100%',
          width: '4px',
          bgcolor: 'primary.main',
          display: { xs: 'block', md: 'none' }
        }
      }}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <StepCard step={step} index={index} />
            {index < steps.length - 1 && (
              <TimelineConnector sx={{
                height: 40,
                left: '50%',
                top: { xs: 'auto', md: `calc(${index * 20}% + 160px)` },
                bottom: { xs: -40, md: 'auto' },
                display: { xs: 'none', md: 'block' }
              }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
}

export default Steps;