import React, { useState } from 'react';
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

const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", jobCount: 25000, trending: true, level: "High Demand" },
      { name: "Python", jobCount: 28000, trending: true, level: "Very High Demand" },
      { name: "Java", jobCount: 20000, trending: false, level: "High Demand" },
      { name: "C++", jobCount: 15000, trending: false, level: "Moderate Demand" },
    ]
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "React", jobCount: 18000, trending: true, level: "Very High Demand" },
      { name: "Node.js", jobCount: 16000, trending: true, level: "High Demand" },
      { name: "Angular", jobCount: 12000, trending: false, level: "Moderate Demand" },
      { name: "Vue.js", jobCount: 8000, trending: true, level: "Growing Demand" },
    ]
  },
  {
    category: "Cloud Technologies",
    skills: [
      { name: "AWS", jobCount: 22000, trending: true, level: "Very High Demand" },
      { name: "Azure", jobCount: 19000, trending: true, level: "High Demand" },
      { name: "Google Cloud", jobCount: 15000, trending: true, level: "High Demand" },
      { name: "Docker", jobCount: 17000, trending: true, level: "High Demand" },
    ]
  },
  {
    category: "Data Science",
    skills: [
      { name: "Machine Learning", jobCount: 14000, trending: true, level: "High Demand" },
      { name: "SQL", jobCount: 30000, trending: false, level: "Very High Demand" },
      { name: "Data Visualization", jobCount: 12000, trending: true, level: "Growing Demand" },
      { name: "TensorFlow", jobCount: 8000, trending: true, level: "Moderate Demand" },
    ]
  }
];

const Skills = () => {
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

  const skillsContent = (
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
        In-Demand Skills
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
          {saving ? 'Saving...' : 'Save Skills'}
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

  return <Dashboard content={skillsContent} initialTab="Skills" />;
};

export default Skills;
