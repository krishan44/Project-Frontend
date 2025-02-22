import React, { useState } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  AccessTime,
  Public,
  School,
  Timeline,
  WorkspacePremium,
  SaveAlt as SaveIcon,
} from '@mui/icons-material';

const certificateData = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    duration: "6 months",
    method: "Online",
    level: "Professional",
    cost: "$300",
    image: "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    skills: ["Cloud Architecture", "AWS Services", "Security"],
    type: "Professional Certification"
  },
  {
    id: 2,
    title: "Google Cloud Professional Architect",
    provider: "Google Cloud",
    duration: "8 months",
    method: "Hybrid",
    level: "Expert",
    cost: "$400",
    image: "https://www.gstatic.com/cloud/images/certification/badge-professional-cloud-architect.png",
    skills: ["Cloud Infrastructure", "GCP", "System Design"],
    type: "Professional Certification"
  },
  {
    id: 3,
    title: "Microsoft Azure Solutions Expert",
    provider: "Microsoft",
    duration: "7 months",
    method: "Online",
    level: "Expert",
    cost: "$350",
    image: "https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-expert-badge.svg",
    skills: ["Azure Services", "Cloud Security", "DevOps"],
    type: "Professional Certification"
  },
];

const StyledSaveButton = styled(Button)(({ theme }) => ({
  minWidth: 200,
  padding: '12px 24px',
  borderRadius: '12px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

const Certificate = () => {
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Certificate preferences saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save preferences. Please try again.',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const certificateContent = (
    <Container maxWidth="xl">
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          fontWeight: 600,
          color: 'primary.main' 
        }}
      >
        Professional Certificates
      </Typography>

      <Grid container spacing={3}>
        {certificateData.map((cert) => (
          <Grid item xs={12} sm={6} md={4} key={cert.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={cert.image}
                alt={cert.title}
                sx={{
                  objectFit: 'contain',
                  bgcolor: '#f8fafc',
                  p: 2
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main'
                  }}
                >
                  {cert.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    size="small" 
                    label={cert.level} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    size="small" 
                    label={cert.method} 
                    color="secondary" 
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <School fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Offered by: {cert.provider}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Duration: {cert.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <WorkspacePremium fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Cost: {cert.cost}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Skills you'll gain:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {cert.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.lighter',
                          color: 'primary.main',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mt: 4,
        mb: 2
      }}>
        <StyledSaveButton
          onClick={handleSave}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
        >
          {saving ? 'Saving...' : 'Save Certificates'}
        </StyledSaveButton>
      </Box> */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );

  return <Dashboard content={certificateContent} initialTab="Certificates" />;
};

export default Certificate;
