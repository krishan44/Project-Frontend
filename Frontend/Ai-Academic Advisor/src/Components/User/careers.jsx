import React, { useState } from 'react';
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
  PlayArrow,
  SaveAlt as SaveIcon
} from '@mui/icons-material';

const jobData = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    experience: "5+ years",
    skills: ["React", "Node.js", "Cloud Computing", "System Design"],
    description: "Join our team to build next-generation web applications...",
    postedDate: "2 days ago",
    applicants: 145,
    trending: true,
    requirements: [
      "Bachelor's in Computer Science or related field",
      "Strong problem-solving skills",
      "Experience with distributed systems"
    ]
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Hybrid",
    salary: "$130,000 - $180,000",
    experience: "3-5 years",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    description: "Looking for an experienced data scientist to join our AI team...",
    postedDate: "1 week ago",
    applicants: 89,
    trending: true,
    requirements: [
      "MS/PhD in Data Science, Statistics, or related field",
      "Experience with deep learning frameworks",
      "Strong analytical skills"
    ]
  },
  {
    id: 3,
    title: "Cloud Solutions Architect",
    company: "Amazon AWS",
    location: "Remote",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    experience: "4+ years",
    skills: ["AWS", "Azure", "DevOps", "Microservices"],
    description: "Design and implement cloud-native solutions...",
    postedDate: "3 days ago",
    applicants: 56,
    trending: false,
    requirements: [
      "AWS Certifications preferred",
      "Experience with containerization",
      "Strong communication skills"
    ]
  },
];

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

const Careers = () => {
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
        message: 'Career preferences saved successfully!',
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

  const careersContent = (
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
        Featured Career Opportunities
      </Typography>

      <Grid container spacing={3}>
        {jobData.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
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
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h6" fontWeight="600">
                    {job.title}
                  </Typography>
                  {job.trending && (
                    <Chip 
                      icon={<TrendingUp />} 
                      label="Trending" 
                      color="primary" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  )}
                </Box>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Apartment color="action" />
                  <Typography variant="subtitle1" color="text.primary">
                    {job.company}
                  </Typography>
                </Stack>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkOutline fontSize="small" color="action" />
                    <Typography variant="body2">{job.type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoney fontSize="small" color="action" />
                    <Typography variant="body2">{job.salary}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="body2">Experience: {job.experience}</Typography>
                  </Box>
                </Stack>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Required Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {job.skills.map((skill, index) => (
                    <Chip
                      key={index}
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

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Posted {job.postedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.applicants} applicants
                  </Typography>
                </Box>

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
                >
                  Apply Now
                </Button>
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
                {saving ? 'Saving...' : 'Save Preferences'}
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

  return <Dashboard content={careersContent} initialTab="Careers" />;
};

export default Careers;
