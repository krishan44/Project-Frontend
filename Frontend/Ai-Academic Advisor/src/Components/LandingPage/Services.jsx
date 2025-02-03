import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { keyframes } from '@emotion/react';
import Degree from "../../assets/services/degree.png";
import Skill from "../../assets/services/skill.png";
import Certificate from "../../assets/services/certificate.png";
import Demand from "../../assets/services/demand.png";
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const services = [
    {
        icon: Skill,
        title: "Based on Skills",
        description: "Provides real-time insights into required skills for specific jobs"
    },
    {
        icon: Degree,
        title: "Personalized Degree's",
        description: "Recommends relevant degrees for chosen careers"
    },
    {
        icon: Certificate,
        title: "Certificate Finding",
        description: "Highlights key certifications to boost employability"
    },
    {
        icon: Demand,
        title: "Future Demand",
        description: "Predicts future demand for various professions"
    }
];

function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box id="services" sx={{
      py: 8,
      background: `linear-gradient(45deg, ${theme.palette.background.default} 0%, #f8fafe 100%)`,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Poppins'
    }}>
      <Container maxWidth="lg">
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
          Key Features
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: 'none',
                borderRadius: 4,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.1)',
                background: theme.palette.background.paper,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 32px -8px ${theme.palette.primary.light}`
                }
              }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  mt: 4,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                  borderRadius: '50%',
                  animation: `${float} 4s ease-in-out infinite`,
                  '& img': {
                    width: 60,
                    height: 60,
                    objectFit: 'contain'
                  }
                }}>
                  <img src={service.icon} alt={service.title} />
                </Box>

                <CardContent sx={{ px: 3, pb: '24px !important' }}>
                  <Typography variant="h5" sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{
          position: 'absolute',
          bottom: -500,
          left: '-10%',
          right: '-10%',
          height: '1000px',
          background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.light} 0%, transparent 60%)`,
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
      </Container>
    </Box>
  );
}

export default Services;