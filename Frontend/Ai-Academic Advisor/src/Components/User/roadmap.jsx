import React, { useState } from 'react';
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
  SaveAlt as SaveIcon
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
  maxWidth: '560px', // Add this line to limit width
  margin: '0 auto', // Add this line to center the video
  borderRadius: '12px',
  overflow: 'hidden',
  marginTop: theme.spacing(2),
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    aspectRatio: '16/9', // Add this line to maintain aspect ratio
  },
  '&:hover .play-button': {
    transform: 'translate(-50%, -50%) scale(1.1)',
  }
}));

const PlayButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px', // Reduced from 60px
  height: '50px', // Reduced from 60px
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

const roadmapData = [
  {
    id: 1,
    title: 'Step 1: Programming Fundamentals',
    description: 'Master the basics of programming and computer science concepts',
    skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
    status: 'completed',
    icon: <Code />,
    estimatedTime: '12 weeks',
    resources: ['CS50: Introduction to Computer Science'],
    video: {
      thumbnail: 'https://img.youtube.com/vi/zOjov-2OZ0E/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
      title: 'Introduction to Programming'
    },
    projects: ['Build a CLI calculator', 'Implement basic data structures'],
    jobRoles: ['softwareEngineer', 'fullstack', 'backend']
  },
  {
    id: 2,
    title: 'Step 2: Web Development',
    description: 'Learn frontend and backend web development',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
    status: 'current',
    icon: <Web />,
    estimatedTime: '16 weeks',
    resources: ['Full Stack Web Development Bootcamp'],
    video: {
      thumbnail: 'https://img.youtube.com/vi/Q8NPQ2RgWyg/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Q8NPQ2RgWyg',
      title: 'Web Development Roadmap'
    },
    projects: ['Portfolio website', 'Full-stack CRUD application'],
    jobRoles: ['softwareEngineer', 'frontend', 'fullstack']
  },
  {
    id: 3,
    title: 'Step 3: Software Architecture',
    description: 'Understand system design and architecture patterns',
    skills: ['System Design', 'Design Patterns', 'APIs', 'Databases'],
    status: 'pending',
    icon: <Architecture />,
    estimatedTime: '10 weeks',
    resources: ['Software Architecture Fundamentals'],
    video: {
      thumbnail: 'https://img.youtube.com/vi/FLtqAi7WNBY/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=FLtqAi7WNBY',
      title: 'System Design Interview'
    },
    projects: ['Design a scalable application', 'Implement design patterns'],
    jobRoles: ['softwareEngineer', 'backend', 'fullstack']
  }
];

const Roadmap = () => {
  const theme = useTheme();
  const [expandedNode, setExpandedNode] = useState(null);
  const [selectedJob, setSelectedJob] = useState('softwareEngineer');
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleNodeClick = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const handleVideoClick = (url) => {
    window.open(url, '_blank');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Roadmap progress saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save progress. Please try again.',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
        Software Engineer Career Path
      </Typography>

      <RoadmapContainer>
        {roadmapData.filter(node => node.jobRoles.includes(selectedJob)).map((node) => (
          <Grid container key={node.id} justifyContent="center">
            <Grid item xs={12} md={10}>
              <RoadmapNode 
                status={node.status} 
                onClick={() => handleNodeClick(node.id)}
                sx={{ mb: 4 }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {React.cloneElement(node.icon, { 
                      color: node.status === 'completed' ? 'success' : 'primary',
                      sx: { fontSize: 32 } 
                    })}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="600">{node.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Estimated Time: {node.estimatedTime}
                      </Typography>
                    </Box>
                    {node.status === 'completed' ? (
                      <CheckCircle color="success" />
                    ) : (
                      <RadioButtonUnchecked color="disabled" />
                    )}
                  </Box>

                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {node.description}
                  </Typography>

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
                    <VideoPreview onClick={() => handleVideoClick(node.video.url)}>
                      <img src={node.video.thumbnail} alt={node.video.title} />
                      <PlayButton className="play-button">
                        <PlayArrow sx={{ fontSize: 24 }} /> 
                      </PlayButton>
                    </VideoPreview>

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
      <Box sx={{ 
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
          {saving ? 'Saving...' : 'Save Progress'}
        </StyledSaveButton>
      </Box>

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
