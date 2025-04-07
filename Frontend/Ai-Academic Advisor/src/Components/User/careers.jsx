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

        const country = localStorage.getItem('Country') || "USA";

        const response = await fetch(`${BASE_URL}/api/careers?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Career opportunities:', responseData);

        if (responseData && responseData.jobs && Array.isArray(responseData.jobs)) {
          setJobData(responseData.jobs);
          // Store job descriptions in localStorage
          const descriptions = responseData.jobs
            .map(job => job.job_description)
            .filter(desc => desc != null && desc !== '');
          localStorage.setItem('JobDescriptions', JSON.stringify(descriptions));
        } else {
          setJobData([]);
          localStorage.removeItem('JobDescriptions');
          console.warn('Invalid jobs data structure', responseData);
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
        {`Career Opportunities for ${localStorage.getItem('Target') || 'Your Career'} in ${localStorage.getItem('Country') || 'USA'}`}
      </Typography>

      {!jobData || jobData.length === 0 ? (
        <Alert severity="info" sx={{ my: 4 }}>
          No job opportunities found. Please check back later.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {jobData.map((job, index) => (
            <Grid item xs={12} md={6} lg={4} key={job.job_id || index}>
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
                  position: 'relative'
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 7 }}>
                  {job.employer_logo && (
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      <img 
                        src={job.employer_logo} 
                        alt={`${job.employer_name} logo`}
                        style={{ maxHeight: '60px', objectFit: 'contain' }}
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3
                      }}
                    >
                      {job.job_title || 'Position Not Specified'}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Apartment color="action" />
                    <Typography 
                      variant="subtitle1" 
                      color="text.primary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {job.employer_name || 'Company Not Specified'}
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">
                        {[job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ') || 'Location Not Specified'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkOutline fontSize="small" color="action" />
                      <Typography variant="body2">{job.job_employment_type || 'Type Not Specified'}</Typography>
                    </Box>
                    {(job.job_min_salary || job.job_max_salary) && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney fontSize="small" color="action" />
                        <Typography variant="body2">
                          {`${job.job_min_salary || ''} - ${job.job_max_salary || ''} ${job.job_salary_currency || ''} ${job.job_salary_period ? `per ${job.job_salary_period}` : ''}`}
                        </Typography>
                      </Box>
                    )}
                    {job.job_required_experience && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Schedule fontSize="small" color="action" />
                        <Typography variant="body2">Experience: {job.job_required_experience}</Typography>
                      </Box>
                    )}
                  </Stack>

                  {job.job_description && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Description:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 2
                        }}
                      >
                        {job.job_description}
                      </Typography>
                    </Box>
                  )}

                  {job.job_highlights && job.job_highlights.qualifications && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Qualifications:
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {job.job_highlights.qualifications.slice(0, 3).map((qual, idx) => (
                          <Typography 
                            key={idx} 
                            component="li" 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {qual}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {job.job_required_skills && job.job_required_skills.length > 0 && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Required Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {job.job_required_skills.map((skill, skillIndex) => (
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

                  {job.job_benefits && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Benefits:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {job.job_benefits.map((benefit, benefitIndex) => (
                          <Chip
                            key={benefitIndex}
                            label={benefit}
                            size="small"
                            sx={{ bgcolor: 'success.lighter', color: 'success.main', fontWeight: 500 }}
                          />
                        ))}
                      </Box>
                    </>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted by: {job.job_publisher || 'Unknown'}
                    </Typography>
                    {job.job_offer_expiration_date && (
                      <Typography variant="body2" color="text.secondary">
                        Expires: {new Date(job.job_offer_expiration_date).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                <Stack 
                  direction="row" 
                  spacing={1}
                  sx={{
                    p: 2,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<BusinessCenter />}
                    sx={{ 
                      borderRadius: 2, 
                      py: 1, 
                      textTransform: 'none', 
                      fontWeight: 500 
                    }}
                    onClick={() => window.open(job.job_apply_link || job.job_google_link || '#', '_blank')}
                    disabled={!job.job_apply_link && !job.job_google_link}
                  >
                    Apply Now
                  </Button>
                </Stack>
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