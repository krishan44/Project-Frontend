import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  BusinessCenter,
  LocationOn,
  WorkOutline,
  AttachMoney,
  Schedule,
  Apartment,
  TrendingUp,
  SaveAlt as SaveIcon,
} from '@mui/icons-material';

const BASE_URL = 'http://127.0.0.1:5001';
const TIMEOUT_DURATION = 10000;

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
  },
}));

const Careers = () => {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        const career = localStorage.getItem('Target');
        if (!career) {
          throw new Error('No career target found. Please set your career goal first.');
        }

        const response = await fetch(`${BASE_URL}/api/careers?career=${encodeURIComponent(career)}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Career opportunities:', data);

        if (data && Array.isArray(data.jobs)) {
          setJobData(data.jobs);
        } else {
          setJobData([]);
          console.warn('Invalid jobs data structure', data);
        }
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError(err.message);
        setSnackbar({
          open: true,
          message: `Failed to load career opportunities: ${err.message}`,
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message: 'Career preferences saved successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save preferences. Please try again.',
        severity: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Loading state
  if (isLoading) {
    return (
      <Dashboard
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading career opportunities...
            </Typography>
          </Box>
        }
        initialTab="Careers"
      />
    );
  }

  // Error state
  if (error && jobData.length === 0) {
    return (
      <Dashboard
        content={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70vh',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Alert severity="error" sx={{ maxWidth: '500px', width: '100%' }}>
              {error}
            </Alert>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        }
        initialTab="Careers"
      />
    );
  }

  const careersContent = (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
        {`Career Opportunities for ${localStorage.getItem('Target') || 'Your Career'} in Worldwide`}
      </Typography>

      {!jobData || jobData.length === 0 ? (
        <Alert severity="info" sx={{ my: 4 }}>
          No job opportunities found. Please check back later.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {jobData.map((job, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="600">
                      {job.title || 'Position Not Specified'}
                    </Typography>
                    {job.trending && (
                      <Chip icon={<TrendingUp />} label="Trending" color="primary" size="small" sx={{ fontWeight: 500 }} />
                    )}
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Apartment color="action" />
                    <Typography variant="subtitle1" color="text.primary">
                      {job.company || 'Company Not Specified'}
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">{job.location || 'Location Not Specified'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkOutline fontSize="small" color="action" />
                      <Typography variant="body2">{job.contract_type || 'Type Not Specified'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney fontSize="small" color="action" />
                      <Typography variant="body2">{job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max}` : 'Salary Not Specified'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2">Experience: {job.experience || 'Not Specified'}</Typography>
                    </Box>
                  </Stack>

                  {job.skills && job.skills.length > 0 && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Required Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {job.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            sx={{ bgcolor: 'primary.lighter', color: 'primary.main', fontWeight: 500 }}
                          />
                        ))}
                      </Box>
                    </>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted {job.created ? new Date(job.created).toLocaleDateString() : 'Recently'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {/* job.applicants || '0' */} 0 applicants
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<BusinessCenter />}
                    sx={{ borderRadius: 2, py: 1, textTransform: 'none', fontWeight: 500 }}
                    onClick={() => window.open(job.redirect_url || '#', '_blank')}
                    disabled={!job.redirect_url}
                  >
                    Apply Now
                  </Button>
                </CardContent>
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
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );

  return <Dashboard content={careersContent} initialTab="Careers" />;
};

export default Careers;