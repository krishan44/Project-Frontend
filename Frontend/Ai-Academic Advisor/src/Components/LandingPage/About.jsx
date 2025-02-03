import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const AboutSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  overflowX: 'hidden',
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  textAlign: 'center',
  paddingTop: '20px',
  marginBottom: '20px',
  color: 'rgb(66, 62, 62)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.5rem',
  },
}));

const AboutContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '60px',
  width: '100%',
  marginTop: '3rem',
  marginBottom: '3rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '10px',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  textAlign: 'center',
  fontWeight: 400,
  lineHeight: 1.9,
  width: '50%',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 0px 0px -9px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(108, 132, 177, 0.764)',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    fontSize: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    fontSize: '12px',
  },
}));

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="section" id="about">
      <Container>
        <AboutSection>
          <AboutTitle variant="h2">About Us</AboutTitle>
          <AboutContent>
            <Typography 
              variant="h3" 
              sx={{ 
                fontSize: isMobile ? '20px' : '30px',
                textAlign: 'center',
                width: 'auto'
              }}
            >
              "Let Us Handle the Complexity <br /> 
              <Box component="span" sx={{ color: 'rgb(68, 207, 103)' }}>
                While You Focus on Your Goals
              </Box>"
            </Typography>
            <AboutDescription>
              "This project is the culmination of our BEng in Software Engineering program. 
              Through this initiative, we aim to provide essential guidance to individuals who lack a 
              clear understanding of their future career paths. By simplifying decision-making processes, we aspire to empower users with the knowledge and tools"
              <Box 
                component="div" 
                sx={{ 
                  marginTop: '10px', 
                  textAlign: 'center' 
                }}
              >
                <Link 
                  href="#" 
                  sx={{
                    color: 'rgba(78, 76, 76, 0.501)',
                    fontSize: isMobile ? '0.7rem' : '1rem',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#3238e0b7'
                    }
                  }}
                >
                  Learn More
                </Link>
              </Box>
            </AboutDescription>
          </AboutContent>
        </AboutSection>
      </Container>
    </Box>
  );
}

export default About;