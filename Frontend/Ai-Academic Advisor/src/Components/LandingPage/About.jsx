import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Fade 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

function About() {
  const cardStyle = {
    height: '100%',
    p: 4,
    borderRadius: 2,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 8,
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Fade in={true} timeout={1000}>
        <Typography 
          variant="h3" 
          align="center" 
          color="textPrimary" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -15,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 5,
              bgcolor: 'primary.main',
              borderRadius: 2
            }
          }}
        >
          Our Vision & Mission
        </Typography>
      </Fade>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={cardStyle}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <VisibilityIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" color="textPrimary" gutterBottom>
                Vision
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                To be the global leader in empowering individuals to make informed educational 
                and career decisions by providing innovative, data-driven insights that transform 
                personal and professional development.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={cardStyle}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <TrackChangesIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" color="textPrimary" gutterBottom>
                Mission
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                We are dedicated to bridging the gap between academic potential and career success 
                by delivering personalized, intelligent guidance. Our platform leverages advanced 
                technology to provide comprehensive career insights, skill recommendations, and 
                educational pathways tailored to individual aspirations and market dynamics.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;