import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Social media icon images can be replaced with MUI icons
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'hsla(213, 82%, 45%, 0.521)',
  color: '#fff',
  padding: '20px 0 10px',
  marginTop: '30px',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  minWidth: '250px',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const FooterLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'rgb(59, 12, 226)',
  },
});

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FooterContainer component="footer">
      <Container>
        <Grid 
          container 
          spacing={2} 
          justifyContent={isMobile ? 'center' : 'space-around'}
          direction={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
        >
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>Quick Links</Typography>
              <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
                {['Home', 'About', 'Services', 'Reviews'].map((link) => (
                  <Box key={link} component="li" sx={{ mb: 1 }}>
                    <FooterLink href={`#${link.toLowerCase()}`}>
                      {link}
                    </FooterLink>
                  </Box>
                ))}
              </Box>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>Contact Us</Typography>
              <Typography variant="body1">Email: info@example.com</Typography>
              <Typography variant="body1">Phone: +94 123 456 789</Typography>
              <Typography variant="body1">Address: Colombo, Sri Lanka</Typography>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>Follow Us</Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <IconButton href="#" sx={{ color: 'white' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href="#" sx={{ color: 'white' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton href="#" sx={{ color: 'white' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 3, 
            pt: 2, 
            borderTop: '1px solid #555' 
          }}
        >
          <Typography variant="body2">
            © 2024 JobCc. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}

export default Footer;