import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  Rating,
  Fade,
  Grow
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import PersonOne from "../../assets/Reviews/person_One.png";
import PersonTwo from "../../assets/Reviews/person_Two.png";
import PersonThree from "../../assets/Reviews/person_Three.png";
import PersonFour from "../../assets/Reviews/person_Four.png";
import StarRating from "../../assets/Reviews/markedStar.png";
import StarRatingUnmark from "../../assets/Reviews/unmarkedStar.png"; 

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const reviews = [
    {
        image: PersonOne,
        text: "This platform helped me navigate my career path in education. I was able to get personalized recommendations that matched my interests and skills. It made the entire decision-making process much clearer and easier. Highly recommended for anyone uncertain about their academic future!",
        name: "Ayesha Ali",
        star: 5
    },
    {
        image: PersonTwo,
        text: "I was looking for guidance on choosing a postgraduate program, and this tool provided me with valuable insights. It suggested programs based on my academic background and career goals. The recommendations were spot on. Definitely a great resource for anyone looking to advance their education.",
        name: "John Smith",
        star: 4
    },
    {
        image: PersonThree,
        text: "The Education Advisor app is fantastic! I found it super helpful when choosing between different career paths in education. The system takes your preferences into account and provides tailored suggestions that make sense. It's easy to use and incredibly accurate!",
        name: "Maria Lopez",
        star: 5
    },
    {
        image: PersonFour,
        text: "I used the platform to explore different career options in education, and I must say, it exceeded my expectations. The recommendations were aligned with my aspirations, and it helped me make informed decisions. The user interface is also intuitive and friendly.",
        name: "Raj Kumar",
        star: 4
    }
];


function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (newDirection) => {
    setDirection(newDirection);
    setTimeout(() => {
      setCurrentIndex(prev => newDirection === 'next' 
        ? (prev + 1) % reviews.length 
        : (prev - 1 + reviews.length) % reviews.length
      );
    }, 300);
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: 8,
      position: 'relative',
      fontFamily: 'Poppins, sans-serif',
      background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, #f8f9fe 100%)`,
      borderRadius: 4,
      boxShadow: '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
      my: 6
    }}>
      <Typography variant="h3" sx={{
        textAlign: 'center',
        mb: 6,
        fontWeight: 700,
        color: theme.palette.text.primary,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          background: theme.palette.primary.main,
          borderRadius: 2
        }
      }}>
        Client Reviews
      </Typography>

      <Box sx={{ 
        position: 'relative', 
        minHeight: 400,
        display: 'flex',
        alignItems: 'center',
        px: isMobile ? 0 : 4
      }}>
        <IconButton
          onClick={() => handleNavigation('prev')}
          sx={{
            position: 'absolute',
            left: isMobile ? 8 : -48,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-50%) scale(1.1)'
            },
            transition: 'all 0.3s ease',
            boxShadow: 3
          }}
        >
          <ArrowBackIos fontSize={isMobile ? 'medium' : 'large'} />
        </IconButton>

        <Box sx={{ width: '100%', mx: 'auto', position: 'relative' }}>
          <Fade in={true} key={currentIndex} timeout={500}>
            <Box sx={{
              textAlign: 'center',
              animation: `${fadeIn} 0.6s ease`,
              px: isMobile ? 2 : 6
            }}>
              <Avatar
                src={reviews[currentIndex].image}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 4,
                  mx: 'auto',
                  border: `4px solid ${theme.palette.primary.main}`,
                  boxShadow: 3
                }}
              />
              <Grow in={true} timeout={600}>
                <Typography variant="h5" sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  {reviews[currentIndex].name}
                </Typography>
              </Grow>

              <Rating
                value={reviews[currentIndex].star}
                readOnly
                size="large"
                sx={{ mb: 3, color: theme.palette.secondary.main }}
              />

              <Typography variant="body1" sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                maxWidth: 800,
                mx: 'auto',
                mb: 4,
                px: isMobile ? 1 : 4,
                position: 'relative',
                '&:before, &:after': {
                  content: '"\\201C"',
                  fontSize: '3rem',
                  color: theme.palette.primary.light,
                  position: 'absolute',
                  opacity: 0.3
                },
                '&:before': { left: -20, top: -10 },
                '&:after': { right: -20, bottom: -10 }
              }}>
                {reviews[currentIndex].text}
              </Typography>
            </Box>
          </Fade>
        </Box>

        <IconButton
          onClick={() => handleNavigation('next')}
          sx={{
            position: 'absolute',
            right: isMobile ? 8 : -48,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-50%) scale(1.1)'
            },
            transition: 'all 0.3s ease',
            boxShadow: 3
          }}
        >
          <ArrowForwardIos fontSize={isMobile ? 'medium' : 'large'} />
        </IconButton>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 1.5,
        mt: 4
      }}>
        {reviews.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: currentIndex === index ? 'primary.main' : 'action.disabled',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.3)'
              }
            }}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Review;


