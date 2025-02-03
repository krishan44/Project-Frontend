import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Home,
  Info,
  Work,
  RateReview
} from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0a2e6b 0%, #1a4a8d 100%)',
  color: '#fff',
  padding: '40px 0 20px',
  fontFamily: 'Poppins, sans-serif',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  minWidth: '250px',
  padding: '20px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#e0e0e0',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#ffffff',
    transform: 'translateX(5px)',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff !important',
  margin: '0 8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
}));

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const quickLinks = [
    { text: 'Home', icon: <Home fontSize="small" /> },
    { text: 'About', icon: <Info fontSize="small" /> },
    { text: 'Services', icon: <Work fontSize="small" /> },
    { text: 'Reviews', icon: <RateReview fontSize="small" /> },
  ];

  return (
    <FooterContainer component="footer">
      <Container>
        <Box textAlign="center" mb={4}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{
              borderRadius: '30px',
              padding: '12px 40px',
              fontWeight: '600',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            Get Started Today
          </Button>
        </Box>

        <Grid 
          container 
          spacing={4}
          justifyContent="space-around"
          direction={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
        >
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h5" gutterBottom sx={{ 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                mb: 3,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: isMobile ? '50%' : '0',
                  transform: isMobile ? 'translateX(-50%)' : 'none',
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                }
              }}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                {quickLinks.map((link) => (
                  <Box key={link.text} component="li" sx={{ mb: 2 }}>
                    <FooterLink href={`#${link.text.toLowerCase()}`}>
                      {link.icon}
                      {link.text}
                    </FooterLink>
                  </Box>
                ))}
              </Box>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h5" gutterBottom sx={{ 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                mb: 3,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: isMobile ? '50%' : '0',
                  transform: isMobile ? 'translateX(-50%)' : 'none',
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                }
              }}>
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: theme.palette.primary.main }} />
                  <FooterLink href="mailto:info@example.com">
                    info@example.com
                  </FooterLink>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: theme.palette.primary.main }} />
                  <FooterLink href="tel:+94123456789">
                    +94 123 456 789
                  </FooterLink>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                    Colombo, Sri Lanka
                  </Typography>
                </Box>
              </Box>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h5" gutterBottom sx={{ 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                mb: 3,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: isMobile ? '50%' : '0',
                  transform: isMobile ? 'translateX(-50%)' : 'none',
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                }
              }}>
                Connect With Us
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: isMobile ? 'center' : 'flex-start',
                flexWrap: 'wrap',
                gap: 2,
                mt: 2
              }}>
                <SocialButton href="#">
                  <Facebook fontSize="large" />
                </SocialButton>
                <SocialButton href="#">
                  <Instagram fontSize="large" />
                </SocialButton>
                <SocialButton href="#">
                  <LinkedIn fontSize="large" />
                </SocialButton>
              </Box>
              <Typography variant="body1" sx={{ 
                mt: 3,
                color: '#e0e0e0',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Subscribe to our newsletter
              </Typography>
              <Box 
                component="form" 
                sx={{ 
                  mt: 2,
                  display: 'flex',
                  gap: 1,
                  flexDirection: isMobile ? 'column' : 'row'
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    padding: '10px 15px',
                    borderRadius: '25px',
                    border: 'none',
                    outline: 'none',
                    flexGrow: 1,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '25px',
                    textTransform: 'none',
                    fontWeight: '500',
                    px: 3,
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 4, 
            pt: 3, 
            borderTop: `1px solid ${theme.palette.primary.main}`,
            background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)'
          }}
        >
          <Typography variant="body2" sx={{ 
            color: '#e0e0e0',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300
          }}>
            © 2024 JobCc. All rights reserved. | 
            <FooterLink href="#" sx={{ ml: 1 }}>Privacy Policy</FooterLink> | 
            <FooterLink href="#" sx={{ ml: 1 }}>Terms of Service</FooterLink>
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}

export default Footer;