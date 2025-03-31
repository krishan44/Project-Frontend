import React, { useState, useEffect } from 'react';
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

const BASE_URL = 'http://127.0.0.1:5001'; 
const TIMEOUT_DURATION = 100000;

const Certificate = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const career = localStorage.getItem('Target');
        if (!career) {
          throw new Error('No career target found. Please set your career goal first.');
        }
        
        const country = localStorage.getItem('Country') || "";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

        const response = await fetch(
          `${BASE_URL}/api/certificates?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`, 
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Certificate data:', data);
        
        if (data && Array.isArray(data.certificates)) {
          setCertificateData(data.certificates);
        } else {
          setCertificateData([]);
          console.warn('Invalid certificate data structure', data);
        }
        
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError(err.message);
        setSnackbar({
          open: true,
          message: `Failed to load certificates: ${err.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);


  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleLearnMore = (accessLink) => {
    if (accessLink) {
      window.open(accessLink, '_blank', 'noopener,noreferrer');
    } else {
      setSnackbar({
        open: true,
        message: 'No additional information available',
        severity: 'info'
      });
    }
  };

  if (isLoading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading certificate programs...</Typography>
          </Box>
        } 
        initialTab="Certificates" 
      />
    );
  }

  if (error && certificateData.length === 0) {
    return (
      <Dashboard 
        content={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '70vh', 
            flexDirection: 'column',
            gap: 2 
          }}>
            <Alert 
              severity="error" 
              sx={{ 
                maxWidth: '500px',
                width: '100%' 
              }}
            >
              {error}
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Box>
        } 
        initialTab="Certificates" 
      />
    );
  }

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
        {`Professional Certificates for ${localStorage.getItem('Target') || 'Your Career'} in ${localStorage.getItem('Country') || 'USA'}`}
      </Typography>

      {certificateData.length === 0 ? (
        <Alert severity="info" sx={{ my: 4 }}>
          No specific certificate programs found for this career path. Please check back later or contact an advisor.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {certificateData.map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  image={cert.image_link || "https://images.unsplash.com/photo-1607435097405-db48f377bff6?q=80&w=1931&auto=format&fit=crop"}
                  alt={cert.name}
                  sx={{
                    objectFit: 'contain',
                    bgcolor: '#f8fafc',
                    p: 2
                  }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1607435097405-db48f377bff6?q=80&w=1931&auto=format&fit=crop";
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
                    {cert.name}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {cert.level && (
                      <Chip 
                        size="small" 
                        label={cert.level} 
                        color="primary" 
                        variant="outlined"
                      />
                    )}
                    {cert.method && (
                      <Chip 
                        size="small" 
                        label={cert.method} 
                        color="secondary" 
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <School fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Offered by: {cert.offered_by || "Not specified"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Duration: {cert.duration || "Not specified"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <WorkspacePremium fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Cost: {cert.cost || "Not specified"}
                    </Typography>
                  </Box>

                  {cert.skills && cert.skills.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Skills you'll gain:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {cert.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
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
                  )}
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
                    onClick={() => handleLearnMore(cert.access_link)}
                    disabled={!cert.access_link}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

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
