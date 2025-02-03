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
import SoftwareEngineer from '../../assets/jobs/Software_Engineer.jpg'; 
import Doctor from '../../assets/jobs/doctor.jpg';
import Engineer from '../../assets/jobs/engineer.jpg';
import Teacher from '../../assets/jobs/teacher.jpg';
import Chef from '../../assets/jobs/chef.jpg';
import Pilot from '../../assets/jobs/pilot.jpg';


const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
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

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
            variant={isMobile ? 'h3' : 'h1'} 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              mb: 3,
              animation: `${pulse} 3s infinite`,
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
                minWidth: '200px',
                height: isMobile ? '1.2em' : '1.5em',
              }}
            />
          </Typography>

          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              mb: 4,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            "Chart your course to career success with personalized roadmaps and expert guidance"
          </Typography>

          <Button 
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              borderRadius: '50px',
              padding: '12px 40px',
              fontSize: isMobile ? '1rem' : '1.2rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px -6px rgba(33, 150, 243, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 32px -6px rgba(33, 150, 243, 0.6)',
                background: 'linear-gradient(45deg, #2196F3 40%, #21CBF3 100%)',
              }
            }}
          >
            Start Your Journey →
          </Button>

          <Box sx={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px'
          }}>
            {backgroundImages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  bgcolor: index === backgroundIndex ? 'primary.main' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.3)'
                  }
                }}
                onClick={() => setBackgroundIndex(index)}
              />
            ))}
          </Box>
        </Container>
      </Fade>
    </HomeBackground>
  );
}

export default Home;