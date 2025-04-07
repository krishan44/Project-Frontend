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

    const createSkillObject = (skillData) => ({
      name: skillData.keyword,
      jobCount: skillData.count,
      trending: skillData.count > 2,
      level: skillData.count >= 3 ? 'Very High Demand' 
           : skillData.count >= 2 ? 'High Demand'
           : skillData.count >= 1 ? 'Growing Demand'
           : 'Moderate Demand'
    });

    useEffect(() => {
      const fetchSkills = async () => {
        setIsLoading(true);
        try {
          const career = localStorage.getItem('Target');
          if (!career) {
            throw new Error('No career target found. Please set your career goal first.');
          }

          const jobDescriptions = JSON.parse(localStorage.getItem('JobDescriptions') || '[]');

          const response = await fetch(`${BASE_URL}/api/skills`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              career: career,
              descriptions: jobDescriptions
            })
          });

          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Skills data:', data);
          
          if (data && data.matched_categories) {
            const categoriesArray = Object.entries(data.matched_categories).map(([category, skills]) => ({
              category,
              skills: Array.isArray(skills) 
                ? skills.map(skill => createSkillObject(skill))
                : []
            }));
            setSkillsData(categoriesArray);
          } else {
            setSkillsData([]);
            console.warn('Invalid skills data structure', data);
          }
        } catch (err) {
          console.error('Error fetching skills:', err);
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

    const handleCloseSnackbar = () => {
      setSnackbar(prev => ({ ...prev, open: false }));
    };

    const calculateDemandPercentage = (jobCount) => {
      const maxCount = 5; // Adjust based on typical maximum counts
      return Math.min((jobCount / maxCount) * 100, 100);
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
              <Typography variant="h6" sx={{ ml: 2 }}>Loading skills analysis...</Typography>
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
          initialTab="Skills" 
        />
      );
    }

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
                    {category?.category || 'Uncategorized'}
                  </Typography>

                  <Grid container spacing={3}>
                    {(category?.skills || []).map((skill, skillIndex) => {
                      // Ensure skill is an object with required properties
                      if (!skill || typeof skill !== 'object') return null;

                      const {
                        name = 'Unnamed Skill',
                        jobCount = 0,
                        trending = false,
                        level = 'Moderate Demand'
                      } = skill;

                      return (
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
                                {name}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                {trending && (
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
                                  label={`${jobCount.toLocaleString()} jobs`}
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
                                    color: getLevelColor(level),
                                    fontWeight: 500
                                  }}
                                >
                                  {level}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={calculateDemandPercentage(jobCount)}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: 'rgba(0,0,0,0.05)',
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    bgcolor: getLevelColor(level),
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
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
