import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  useTheme 
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shine = keyframes`
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
`;

// Styled components
const StyledCard = styled(Card)(({ theme, isActive, color }) => ({
  width: 280,
  height: 320,
  position: 'relative',
  cursor: 'pointer',
  background: `linear-gradient(135deg, ${color}15, ${color}25)`,
  transition: 'all 0.4s ease-in-out',
  overflow: 'hidden',
  borderRadius: theme.spacing(4),
  boxShadow: isActive 
    ? `0 20px 40px ${color}35`
    : `0 10px 20px ${color}15`,
  transform: isActive ? 'translateY(-10px)' : 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 40px ${color}35`,
    '& .step-icon': {
      animation: `${rotate} 4s linear infinite`
    }
  }
}));

const IconWrapper = styled(Box)(({ color }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${color}30, ${color}15)`,
  marginBottom: 20,
  transition: 'all 0.3s ease-in-out',
  '& svg': {
    fontSize: 40,
    color: color,
    transition: 'all 0.3s ease-in-out'
  }
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  animation: `${shine} 3s linear infinite`,
  fontWeight: 800,
  marginBottom: theme.spacing(8),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -15,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
    borderRadius: 2
  }
}));

const Steps = () => {
  const [activeStep, setActiveStep] = useState(null);
  const theme = useTheme();

  const steps = [
    {
      icon: <AccountCircleIcon />,
      title: 'Create Account',
      description: 'Begin your personalized journey',
      color: theme.palette.primary.main
    },
    {
      icon: <EditIcon />,
      title: 'Build Profile',
      description: 'Showcase your academic journey',
      color: theme.palette.success.main
    },
    {
      icon: <AccessTimeIcon />,
      title: 'AI Analysis',
      description: 'Smart profile evaluation',
      color: theme.palette.warning.main
    },
    {
      icon: <CheckCircleIcon />,
      title: 'Get Roadmap',
      description: 'Personalized success plan',
      color: theme.palette.info.main
    },
    {
      icon: <LoopIcon />,
      title: 'Iterate & Grow',
      description: 'Continuous improvement',
      color: theme.palette.secondary.main
    }
  ];

  const StepCard = ({ step, index }) => (
    <StyledCard
      isActive={activeStep === index}
      color={step.color}
      onMouseEnter={() => setActiveStep(index)}
      onMouseLeave={() => setActiveStep(null)}
    >
      <CardContent sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <IconWrapper className="step-icon" color={step.color}>
          {step.icon}
        </IconWrapper>
        
        <Typography variant="h5" sx={{
          fontWeight: 'bold',
          mb: 2,
          color: step.color,
          textAlign: 'center'
        }}>
          {step.title}
        </Typography>
        
        <Typography variant="body1" sx={{
          color: 'text.secondary',
          textAlign: 'center',
          opacity: 0.9,
          transition: 'all 0.3s ease-in-out'
        }}>
          {step.description}
        </Typography>

        {/* Connection line */}
        {index < steps.length - 1 && (
          <Box sx={{
            position: 'absolute',
            right: -30,
            top: '50%',
            width: 60,
            height: 2,
            background: `linear-gradient(90deg, ${step.color}50, transparent)`,
            display: { xs: 'none', md: 'block' }
          }} />
        )}
      </CardContent>
    </StyledCard>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <GradientTitle variant="h3" align="center">
        How to Start
      </GradientTitle>
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </Box>
    </Container>
  );
};

export default Steps;