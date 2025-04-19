import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  Button,
  Tooltip,
  Fade,
  useTheme,
  Paper,
  Snackbar,
  Alert,
  styled,
} from '@mui/material';
import {
  TrendingUp,
  WorkOutline,
  Timeline,
  CompareArrows,
  Info,
  Insights,
  Psychology,
  Speed as SpeedIcon,
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

// This will be used as fallback data if API call fails
const fallbackJobData = {
  mainJob: {
    title: "Software Engineer",
    demandPercentage: 92,
    growthRate: "High",
    timeframe: "2024-2030",
    description: "Software Engineers are in high demand due to digital transformation across industries.",
    keyFactors: [
      { label: "Job Security", value: 95, icon: <SpeedIcon /> },
      { label: "Work-Life Balance", value: 85, icon: <Psychology /> },
      { label: "Remote Work", value: 90, icon: <Insights /> },
    ]
  },
  relatedJobs: [
    { title: "Full Stack Developer", demand: 88 },
    { title: "DevOps Engineer", demand: 85 },
    { title: "Cloud Engineer", demand: 90 },
    { title: "Mobile Developer", demand: 82 },
    { title: "Frontend Developer", demand: 86 },
    { title: "Backend Developer", demand: 87 },
    { title: "System Architect", demand: 89 },
    { title: "QA Engineer", demand: 80 },
  ]
};

const Future = () => {
  const theme = useTheme();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
        const fetchFutureData = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const career = localStorage.getItem('Target');
            if (!career) {
              throw new Error('No career target found. Please set your career goal first.');
            }
    
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
    
            const response = await fetch(
              `${BASE_URL}/api/get_career_data`,
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ target: career }),
                signal: controller.signal,
              }
            );
    
            clearTimeout(timeoutId);
    
            if (!response.ok) {
              let errorMessage = `Server responded with status: ${response.status}`;
              try {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                  errorMessage = errorData.error;
                }
              } catch (e) {
                console.error('Failed to parse error JSON:', e);
              }
              throw new Error(errorMessage);
            }
    
            const data = await response.json();
            console.log('Future career data:', data);
    
            if (data && typeof data === 'object' && data.careerData && data.careerData[career]) {
              const mainJobData = data.careerData[career];
              const latestFutureDemand = Object.values(mainJobData.future).pop() || 0; // Get the latest future demand
              const latestHistoricalDemand = Object.values(mainJobData.historical).pop() || 0;
              const growth = mainJobData.growth || 0;
              const growthRate = growth > 5 ? 'High' : growth > 2 ? 'Medium' : 'Low';
    
              const processedMainJob = {
                title: data.targetJob,
                demandPercentage: Math.round(latestFutureDemand),
                growthRate: growthRate,
                timeframe: Object.keys(mainJobData.future).join('-'),
                // Use keyFactors from API if available, otherwise use empty array
                keyFactors: mainJobData.keyFactors || [],
              };
    
              const processedRelatedJobs = Object.entries(data.relatedJobsData).map(([title, jobData]) => ({
                title: title,
                demand: Math.round(Object.values(jobData.future).pop() || Object.values(jobData.historical).pop() || 0),
              }));
    
              setSelectedJob({ mainJob: processedMainJob, relatedJobs: processedRelatedJobs });
            } else {
              console.warn('Invalid API response format:', data);
              setSelectedJob(fallbackJobData);
            }
          } catch (err) {
            console.error('Error fetching future data:', err);
            setError(err.message);
            setSelectedJob(fallbackJobData);
            setSnackbar({ open: true, message: `Failed to load future career data: ${err.message}`, severity: 'error' });
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchFutureData();
      }, []);


  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Future career path saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save career path. Please try again.',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading future career insights...</Typography>
          </Box>
        } 
        initialTab="Future" 
      />
    );
  }

  if (!selectedJob) {
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
              sx={{ maxWidth: '500px', width: '100%' }}
            >
              {error || 'Failed to load future career data'}
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Box>
        } 
        initialTab="Future" 
      />
    );
  }

  const futureContent = (
    <Container maxWidth="xl">
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 2, 
            fontWeight: 600, 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Future Career Insights
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore the future demand and growth potential for your career path
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Job Card */}
        <Grid item xs={12}>
          <Card 
            sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8faff 100%)',
              boxShadow: theme.shadows[3],
              '&:hover': { boxShadow: theme.shadows[6] },
              transition: 'all 0.3s ease'
            }}
          >
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft:'500px',
                marginRight:'100px',
                gap: 4,
                mb: 4,
              }}>
                {/* Left side - Main Circle */}
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                      textAlign: 'center',
                      mb: 3
                    }}
                  >
                    {selectedJob.mainJob.title}
                  </Typography>

                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={250}
                      thickness={4}
                      sx={{ color: 'grey.200', position: 'absolute' }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={selectedJob.mainJob.demandPercentage}
                      size={250}
                      thickness={4}
                      sx={{ 
                        color: 'primary.main',
                        position: 'relative',
                        transform: 'rotate(-90deg)',
                        circle: {
                          strokeLinecap: 'round',
                          transition: 'all 0.5s ease-in-out',
                        }
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      width: '100%'
                    }}>
                      <Typography variant="h2" color="primary.main" fontWeight="bold">
                        {selectedJob.mainJob.demandPercentage}%
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          textAlign: 'center',
                          width: '100%',
                          display: 'block',
                          mx: 'auto'
                        }}
                      >
                        Market Demand
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Right side - Key Factors */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                    {selectedJob.mainJob.description}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {selectedJob.mainJob.keyFactors.map((factor, idx) => (
                      <Grid item xs={12} sm={4} key={idx}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            bgcolor: 'background.default',
                            borderRadius: 2,
                          }}
                        >
                          <Box sx={{ mb: 1, color: 'primary.main' }}>
                            {factor.icon}
                          </Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {factor.label}
                          </Typography>
                          <Typography variant="h6" color="primary.main" fontWeight="bold">
                            {factor.value}%
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>

              {/* Related Jobs Section */}
              <Divider sx={{ my: 4 }}>
                <Chip 
                  icon={<CompareArrows />}
                  label="Related Career Paths"
                  color="primary"
                  variant="outlined"
                  sx={{ px: 2 }}
                />
              </Divider>

              <Grid container spacing={2}>
                {selectedJob.relatedJobs.map((job, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Tooltip 
                      title="Click to explore this career path"
                      placement="top"
                      TransitionComponent={Fade}
                      arrow
                    >
                      <Card 
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4,
                            bgcolor: 'primary.lighter',
                          }
                        }}
                      >
                        <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WorkOutline color="primary" />
                            <Typography variant="subtitle1" fontWeight="500">
                              {job.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Demand:
                            </Typography>
                            <Chip
                              label={`${job.demand}%`}
                              color={job.demand >= 90 ? "success" : 
                                     job.demand >= 80 ? "primary" : "warning"}
                              size="small"
                            />
                          </Box>
                        </Stack>
                      </Card>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

  return <Dashboard content={futureContent} initialTab="Future" />;
};

export default Future;

