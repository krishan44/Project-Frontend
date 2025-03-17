import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  styled,
  useTheme,
  Collapse,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Code,
  Web,
  Storage,
  Architecture,
  CheckCircle,
  RadioButtonUnchecked,
  PlayCircleOutline,
  PlayArrow,
  SaveAlt as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const RoadmapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  fontFamily: 'Poppins, sans-serif',
}));

const RoadmapNode = styled(Card)(({ theme, status }) => ({
  position: 'relative',
  width: '100%',
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

const VideoPreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '560px',
  margin: '0 auto',
  borderRadius: '12px',
  overflow: 'hidden',
  marginTop: theme.spacing(2),
  cursor: 'pointer',
  '& img': {
    width: '100%',
    height: '315px',
    objectFit: 'cover',
    display: 'block',
  }
}));

const PlayButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px',
  height: '50px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'white',
  }
}));

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

const StepTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  '& .step-number': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    fontSize: '1.5rem',
    minWidth: '40px',
  },
  '& .step-description': {
    flex: 1,
    fontWeight: 600,
    fontSize: '1.1rem',
    color: theme.palette.text.primary,
  }
}));

const StepSummary = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1rem',
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  lineHeight: 1.5,
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontFamily: 'Poppins, sans-serif',
}));

// Map for icons based on keywords in step descriptions
const getIconForStep = (stepDesc) => {
  const lowerDesc = stepDesc.toLowerCase();
  
  if (lowerDesc.includes('code') || lowerDesc.includes('program') || lowerDesc.includes('develop')) {
    return <Code />;
  } else if (lowerDesc.includes('web') || lowerDesc.includes('frontend') || lowerDesc.includes('html')) {
    return <Web />;
  } else if (lowerDesc.includes('database') || lowerDesc.includes('data') || lowerDesc.includes('sql')) {
    return <Storage />;
  } else if (lowerDesc.includes('design') || lowerDesc.includes('architect') || lowerDesc.includes('system')) {
    return <Architecture />;
  } else {
    return <Code />;  // Default icon
  }
};

const BASE_URL = 'http://127.0.0.1:5001'; 
const TIMEOUT_DURATION = 10000; 

const Roadmap = () => {
  const theme = useTheme();
  const [expandedNode, setExpandedNode] = useState(null);
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [careerTitle, setCareerTitle] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [totalSteps, setTotalSteps] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const fetchWithRetry = async (career, attempt = 0) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
      career = localStorage.getItem('Target') || career;
      const response = await fetch(`${BASE_URL}/api/career-roadmap?career=${encodeURIComponent(career)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        credentials: 'include',
      });

      clearTimeout(timeoutId);
      
      if (response.status === 404) {
        throw new Error('Career roadmap not found. Please try a different career.');
      }
      
      if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format from server");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection.');
      }

      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Cap at 10 seconds
        await new Promise(resolve => setTimeout(resolve, delay));
        
        setSnackbar({
          open: true,
          message: `Retrying connection (${attempt + 1}/${maxRetries})...`,
          severity: 'warning'
        });
        
        return fetchWithRetry(career, attempt + 1);
      }

      throw new Error(
        `Unable to load roadmap: ${error.message}. ` +
        'Please check your connection and try again.'
      );
    }
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const career = localStorage.getItem('Target');
        if (!career) {
          throw new Error('No career target found. Please set your career goal first.');
        }

        const data = await fetchWithRetry(career);
        console.log('API Response:', data); // Debug log

        const transformedData = data.steps.map((step, index) => {
          console.log('Step videos:', step.videos); // Debug video data
          return {
            id: index + 1,
            title: step.step,
            summary: `Brief overview of ${step.step.split('.')[1]?.trim() || step.step}`,  // Generate summary
            skills: step.skills || [],
            status: step.status || 'pending',
            video: step.videos?.[0] || null, // Store single video object
            projects: [`Project related to ${step.step}`, `Implementation of ${step.step} concepts`]
          };
        });

        console.log('Transformed Data:', transformedData); // Debug transformed data
        setRoadmapData(transformedData);
        setCareerTitle(data.career);
        setTotalSteps(data.totalSteps);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setSnackbar({
          open: true,
          message: `Failed to load roadmap: ${err.message}`,
          severity: 'error'
        });
      }
    };

    fetchRoadmap();
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
    window.location.reload();
  };

  const handleNodeClick = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const handleVideoClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    } else {
      setSnackbar({
        open: true,
        message: 'No video available for this step',
        severity: 'info'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatStepTitle = (title) => {
    const match = title.match(/^(\d+)\.\s*(.+)$/);
    if (match) {
      const [, number, description] = match;
      return (
        <StepTitle variant="h6">
          <span className="step-number">Step {number}</span>
          <span className="step-description">{description}</span>
        </StepTitle>
      );
    }
    return title;
  };

  if (loading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading career roadmap...</Typography>
          </Box>
        } 
        initialTab="Roadmap" 
      />
    );
  }

  if (error && roadmapData.length === 0) {
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
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
            >
              Retry Loading Roadmap
            </Button>
          </Box>
        } 
        initialTab="Roadmap" 
      />
    );
  }

  const roadmapContent = (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ 
        fontWeight: 700, 
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 6
      }}>
        {careerTitle || 'Software Engineer'} Career Path
      </Typography>

      <RoadmapContainer>
        {roadmapData.map((node) => (
          <Grid container key={node.id} justifyContent="center">
            <Grid item xs={12} md={10}>
              <RoadmapNode 
                status={node.status} 
                onClick={() => handleNodeClick(node.id)}
                sx={{ mb: 4 }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {formatStepTitle(node.title)}
                    <StepSummary>
                      {node.summary}
                    </StepSummary>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                    {node.skills.map((skill, index) => (
                      <StyledChip
                        key={index}
                        label={skill}
                        color={node.status === 'completed' ? 'success' : 'primary'}
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Collapse in={expandedNode === node.id}>
                    {node.video ? (
                      <VideoPreview onClick={() => handleVideoClick(node.video.url)}>
                        <Box sx={{ position: 'relative' }}>
                          <img 
                            src={node.video.thumbnail}
                            alt={node.video.title}
                            onError={(e) => {
                              console.error('Thumbnail load error:', e);
                              e.target.src = 'https://via.placeholder.com/640x360?text=No+Thumbnail';
                            }}
                          />
                          <PlayButton className="play-button">
                            <PlayArrow sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                          </PlayButton>
                        </Box>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            mt: 1, 
                            display: 'block', 
                            textAlign: 'center',
                            color: theme.palette.text.secondary 
                          }}
                        >
                          {node.video.title}
                        </Typography>
                      </VideoPreview>
                    ) : (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        No video resource available for this step.
                      </Alert>
                    )}

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Key Projects:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2 }}>
                        {node.projects.map((project, index) => (
                          <li key={index}>
                            <Typography variant="body2" color="text.secondary">
                              {project}
                            </Typography>
                          </li>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </CardContent>
              </RoadmapNode>
            </Grid>
          </Grid>
        ))}
      </RoadmapContainer>

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
    </Box>
  );

  return <Dashboard content={roadmapContent} initialTab="Roadmap" />;
};

export default Roadmap;