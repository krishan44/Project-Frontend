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
  Snackbar,
  Alert,
  CircularProgress,  
  styled,
} from '@mui/material';
import { AccessTime, AttachMoney, SaveAlt as SaveIcon, School } from '@mui/icons-material';

// Remove static degreeData array since we'll fetch dynamically

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
const TIMEOUT_DURATION = 10000;

const Degree = () => {
  const [degreeData, setDegreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Add state for selected link
  const [selectedLinks, setSelectedLinks] = useState({});

  useEffect(() => {
    const fetchDegrees = async () => {
      setIsLoading(true);
      try {
        const career = localStorage.getItem('Target');
        if (!career) {
          throw new Error('No career target found. Please set your career goal first.');
        }
        
        // Get country from localStorage, default to "USA" if not found
        const country = localStorage.getItem('Country') || "USA";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

        const response = await fetch(
          `${BASE_URL}/api/degrees?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`, 
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
        console.log('Degree data:', data);
        
        if (data && Array.isArray(data.degrees)) {
          setDegreeData(data.degrees);
        } else {
          setDegreeData([]);
          console.warn('Invalid degree data structure', data);
        }
        
      } catch (err) {
        console.error('Error fetching degrees:', err);
        setError(err.message);
        setSnackbar({
          open: true,
          message: `Failed to load degrees: ${err.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDegrees();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Add function to handle link selection
  const handleLearnMore = (index, links) => {
    if (!links || !links.length) return;
    
    // If there's only one link, open it directly
    if (links.length === 1) {
      window.open(links[0], '_blank', 'noopener,noreferrer');
      return;
    }
    
    // If multiple links, open the first one or toggle between them
    const currentLinkIndex = selectedLinks[index] || 0;
    const nextLinkIndex = (currentLinkIndex + 1) % links.length;
    
    setSelectedLinks(prev => ({
      ...prev,
      [index]: nextLinkIndex
    }));
    
    window.open(links[nextLinkIndex], '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading degree programs...</Typography>
          </Box>
        } 
        initialTab="Degrees" 
      />
    );
  }

  if (error && degreeData.length === 0) {
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
        initialTab="Degrees" 
      />
    );
  }

  const degreeContent = (
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
        {`Degree Programs for ${localStorage.getItem('Target') || ''} in ${localStorage.getItem('Country') || ''}`}
      </Typography>

      {degreeData.length === 0 ? (
        <Alert severity="info" sx={{ my: 4 }}>
          No specific degree programs found for this career path. Please contact an advisor for more information.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {degreeData.map((degree, index) => (
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
                  image={degree.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"}
                  alt={degree.universityName}
                  sx={{
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop";
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
                    {degree.universityName}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="text.primary"
                    sx={{ mb: 2, fontWeight: 500 }}
                  >
                    {degree.degree}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Duration: {degree.duration || "Not specified"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AttachMoney fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Tuition: {degree.cost || "Not specified"}
                    </Typography>
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
                    onClick={() => handleLearnMore(index, degree.links)}
                    disabled={!degree.links || degree.links.length === 0}
                  >
                    Learn More {degree.links && degree.links.length > 1 ? `(${selectedLinks[index] + 1 || 1}/${degree.links.length})` : ''}
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

  return <Dashboard content={degreeContent} initialTab="Degrees" />;
};

export default Degree;
