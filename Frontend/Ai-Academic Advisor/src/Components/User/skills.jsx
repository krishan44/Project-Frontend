import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Divider,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  Work,
  TrendingUp,
  Stars,
  Assessment,
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
const TIMEOUT_DURATION = 10000;

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchSkills = async () => {
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
          `${BASE_URL}/api/skills?career=${encodeURIComponent(career)}&country=${encodeURIComponent(country)}`, 
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
        if (data && Array.isArray(data.skills)) {
          setSkillsData(data.skills);
        } else {
          setSkillsData([]);
          console.warn('Invalid skills data structure', data);
        }
      } catch (err) {
        setError(err.message);
        setSnackbar({
          open: true,
          message: `Failed to load skills: ${err.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Skills preferences saved successfully!',
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

  const calculateDemandPercentage = (jobCount) => {
    const maxJobs = 30000; // Maximum number of jobs in the dataset
    return (jobCount / maxJobs) * 100;
  };

  const getLevelColor = (level) => {
    const colors = {
      'Very High Demand': '#4caf50',
      'High Demand': '#2196f3',
      'Moderate Demand': '#ff9800',
      'Growing Demand': '#9c27b0'
    };
    return colors[level] || '#757575';
  };

  if (isLoading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading skills data...</Typography>
          </Box>
        } 
        initialTab="Skills" 
      />
    );
  }

  if (error && skillsData.length === 0) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column', gap: 2 }}>
            <Alert severity="error" sx={{ maxWidth: '500px', width: '100%' }}>{error}</Alert>
            <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
          </Box>
        } 
        initialTab="Skills" 
      />
    );
  }

  const skillsContent = (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
        {`In-Demand Skills for ${localStorage.getItem('Target') || 'Your Career'} in ${localStorage.getItem('Country') || 'USA'}`}
      </Typography>

      <Grid container spacing={3}>
        {skillsData.map((category, index) => (
          <Grid item xs={12} key={index}>
            <Card 
              sx={{ 
                borderRadius: 3,
                boxShadow: 2,
                '&:hover': { boxShadow: 4 },
                transition: '0.3s',
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  <Assessment />
                  {category.category}
                </Typography>

                <Grid container spacing={3}>
                  {category.skills.map((skill, skillIndex) => (
                    <Grid item xs={12} md={6} key={skillIndex}>
                      <Box 
                        sx={{ 
                          p: 2, 
                          bgcolor: 'background.paper',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="500">
                            {skill.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {skill.trending && (
                              <Chip
                                icon={<TrendingUp sx={{ fontSize: '1rem !important' }} />}
                                label="Trending"
                                size="small"
                                color="primary"
                                sx={{ height: 24 }}
                              />
                            )}
                            <Chip
                              icon={<Work sx={{ fontSize: '1rem !important' }} />}
                              label={`${skill.jobCount.toLocaleString()} jobs`}
                              size="small"
                              sx={{ 
                                height: 24,
                                bgcolor: 'background.default'
                              }}
                            />
                          </Box>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Market Demand
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: getLevelColor(skill.level),
                                fontWeight: 500
                              }}
                            >
                              {skill.level}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={calculateDemandPercentage(skill.jobCount)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(0,0,0,0.05)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                bgcolor: getLevelColor(skill.level),
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
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

  return <Dashboard content={skillsContent} initialTab="Skills" />;
};

export default Skills;
