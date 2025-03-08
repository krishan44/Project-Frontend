import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Lightbulb,
  TrendingUp,
  WorkOutline,
  Psychology,
  Assignment,
  Timeline,
  School,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import axios from 'axios';

const Overview = () => {
  // This would come from your app's state/context
  
  let target;
  const userID = localStorage.getItem('UserId');

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch student data
      const studentResponse = await axios.get(`http://localhost:5001/api/student/getByUserID/${userID}`);
      if (studentResponse.data && studentResponse.data.studentID) 
        { 
          console.log("Data : ", studentResponse.data);
        localStorage.setItem('studentId', studentResponse.data.studentID);
        localStorage.setItem('Name', studentResponse.data.FullName);
        console.log("Student ID:", studentResponse.data.studentID);
      } else {
        console.error("No student data found.");
      }

      // Fetch target data using student ID
      const studentId = studentResponse.data.studentID;  // Ensure to use studentID here
      if (studentId) {
        const targetResponse = await axios.get(`http://localhost:5001/api/target/getByStudentId/${studentId}`);
        if (targetResponse.data && targetResponse.data.target) {
          localStorage.setItem('target', targetResponse.data.target);
          target = targetResponse.data.target;
          console.log("Target:", targetResponse.data.target);
        } else {
          console.error("No target data found.");
        }
      } else {
        console.error("Student ID is missing.");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load student data',
        severity: 'error',
      });
    }
  };

  fetchData();
}, []);

const selectedProfession = localStorage.getItem('target');

  const careerTips = [
    {
      title: "Technical Skills",
      description: "Focus on mastering programming fundamentals and stay updated with latest technologies",
      icon: <School />,
    },
    {
      title: "Soft Skills",
      description: "Develop communication, teamwork, and problem-solving abilities",
      icon: <Psychology />,
    },
    {
      title: "Industry Trends",
      description: "Keep track of AI, cloud computing, and cybersecurity developments",
      icon: <TrendingUp />,
    },
  ];

  const keySkills = [
    "Programming Languages (Java, Python, JavaScript)",
    "Data Structures & Algorithms",
    "System Design",
    "Version Control (Git)",
    "Cloud Platforms (AWS, Azure)",
  ];

  const learningPath = [
    "Master Core Programming Concepts",
    "Build Personal Projects",
    "Contribute to Open Source",
    "Gain Industry Certifications",
    "Practice System Design",
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Career Overview Card */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}40`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <WorkOutline sx={{ fontSize: 40 }} />
              <Typography variant="h4" fontWeight="700">
                {selectedProfession}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              Career Success Roadmap
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {['High Demand', 'Growing Field', 'Remote Opportunities'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant="outlined"
                  size="small"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Career Tips */}
        {careerTips.map((tip, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}20`,
              },
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {React.cloneElement(tip.icon, { color: 'primary', sx: { fontSize: 30 } })}
                  <Typography variant="h6" fontWeight="600">
                    {tip.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {tip.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Key Skills Required */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Star color="primary" />
              <Typography variant="h6" fontWeight="600">
                Key Skills Required
              </Typography>
            </Box>
            <List>
              {keySkills.map((skill, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Learning Path */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Timeline color="primary" />
              <Typography variant="h6" fontWeight="600">
                Learning Path
              </Typography>
            </Box>
            <List>
              {learningPath.map((step, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <Assignment color="primary" sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={step}
                    secondary={`Step ${index + 1}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Overview;