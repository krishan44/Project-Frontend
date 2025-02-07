import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  useMediaQuery,
  useTheme,
  Fade
} from '@mui/material';
import Typed from 'typed.js';
import { styled, keyframes } from '@mui/material/styles';

// Update these imports according to your actual file structure
import SoftwareEngineer from '../../assets/jobs/Software_Engineer.jpg'; 
import Doctor from '../../assets/jobs/doctor.jpg';
import Engineer from '../../assets/jobs/engineer.jpg';
import Teacher from '../../assets/jobs/teacher.jpg';
import Chef from '../../assets/jobs/chef.jpg';
import Pilot from '../../assets/jobs/pilot.jpg';

const backgroundImages = [
  SoftwareEngineer,
  Doctor,
  Engineer,
  Teacher,
  Chef,
  Pilot
];

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const HomeBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.common.white,
  overflow: 'hidden',
  fontFamily: 'Poppins, sans-serif',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    zIndex: 1,
  }
}));

const BackgroundSlide = styled(Box)(({ theme, backgroundimage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `url(${backgroundimage})`,
  transition: 'opacity 1.5s ease-in-out',
  opacity: 0,
  '&.active': {
    opacity: 1,
  }
}));

function Home({ openAuthDialog }) { // Add openAuthDialog prop here
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const typedRef = useRef(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Developer", "Doctor", "Engineer", "Teacher", "Chef", "Pilot"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    const backgroundInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => {
      typed.destroy();
      clearInterval(backgroundInterval);
    };
  }, []);
  
  const handleGetStarted = () => {
    if (openAuthDialog) {
      openAuthDialog();
    }
  };

  return (
    <HomeBackground component="section" id="home">
      {backgroundImages.map((img, index) => (
        <BackgroundSlide 
          key={index}
          backgroundimage={img}
          className={index === backgroundIndex ? 'active' : ''}
        />
      ))}
      
      <Fade in={fadeIn} timeout={1000}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant={isMobile ? 'h4' : 'h2'} 
            sx={{ 
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              mb: 3,
              animation: `${pulse} 3s infinite`,
              px: 2
            }}
          >
            <Box component="span" sx={{ display: 'block', mb: 1 }}>
              Dreaming of Becoming a
            </Box>
            <Box
              component="span"
              ref={typedRef}
              sx={{
                background: 'linear-gradient(45deg, #FFD700 30%, #FF8C00 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                minWidth: isMobile ? '160px' : '200px',
                height: isMobile ? '1.2em' : '1.5em',
                fontSize: isMobile ? '1.8rem' : 'inherit',
                lineHeight: 1.2
              }}
            />
          </Typography>

          <Typography 
            variant={isMobile ? 'body1' : 'h5'} 
            sx={{ 
              mb: 4,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5,
              px: 2,
              fontSize: isMobile ? '1rem' : '1.25rem'
            }}
          >
            "Chart your course to career success with personalized roadmaps and expert guidance"
          </Typography>

          <Button 
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            onClick={handleGetStarted}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              borderRadius: '50px',
              padding: isMobile ? '8px 32px' : '12px 40px',
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px -6px rgba(33, 150, 243, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px -6px rgba(33, 150, 243, 0.6)',
                background: 'linear-gradient(45deg, #2196F3 40%, #21CBF3 100%)',
              }
            }}
          >
            Start Your Journey →
          </Button>
        </Container>
      </Fade>
    </HomeBackground>
  );
}

export default Home;