import React from 'react';
import { Container, Grid, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; 
import Coursera from '../../assets/resources/coursera.png'
import Edx from '../../assets/resources/Edx.png'
import Seek from '../../assets/resources/seek.png'

const partners = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    link: 'https://careers.google.com/'
  },
  {
    name: 'Udemy',
    logo: 'https://cdn.worldvectorlogo.com/logos/udemy-3.svg',
    link: 'https://www.udemy.com/'
  },
  {
    name: 'Coursera',
    logo: Coursera,
    link: 'https://www.coursera.org/'
  },
  {
    name: 'Edx',
    logo: Edx, 
    link: 'https://www.edx.org/'
  },
  {
    name: 'LinkedIn',
    logo: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg',
    link: 'https://www.linkedin.com/'
  },
  {
    name: 'AWS',
    logo: 'https://cdn.worldvectorlogo.com/logos/aws-logo.svg',
    link: 'https://aws.amazon.com/'
  },
//   {
//     name: 'Seek',
//     logo: Seek, 
//     link: 'https://www.edx.org/'
//   },
//   {
//     name: 'LinkedIn',
//     logo: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg',
//     link: 'https://www.linkedin.com/'
//   },
//   {
//     name: 'AWS',
//     logo: 'https://cdn.worldvectorlogo.com/logos/aws-logo.svg',
//     link: 'https://aws.amazon.com/'
//   }
];

const LogoCircle = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: theme.shadows[3],
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[6]
  }
}));


const Partners = () => {
    const theme = useTheme(); // Get the theme first
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Now use theme
  
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" sx={{
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
                    width: '100px',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    borderRadius: 2
                  }
                }}>
                  Our Resources
                </Typography>
        
        <Grid container spacing={isMobile ? 4 : 6} justifyContent="center">
          {partners.map((partner, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton 
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ p: 0, borderRadius: '50%' }}
              >
                <LogoCircle>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{ 
                      width: '70%', 
                      height: '70%', 
                      objectFit: 'contain' 
                    }} 
                  />
                </LogoCircle>
              </IconButton>
            </Grid>
          ))}
        </Grid>
  
        <Typography variant="subtitle1" sx={{ mt: 6, color: 'text.secondary' , fontFamily:'poppins' }}>
          Collaborating with world's leading platforms to bring you the best opportunities
        </Typography>
      </Container>
    );
  };
  

export default Partners;