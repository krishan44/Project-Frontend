import React from 'react';
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
  ListItemText,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle,
  TrendingUp,
  Schedule,
  EmojiEvents,
  ChevronRight,
  School as SchoolIcon
} from '@mui/icons-material';

const Overview = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="600" gutterBottom>
                Welcome back, Kavidu! 👋
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                You have 3 new courses to explore this week
              </Typography>
              <Chip
                label="Continue Learning"
                variant="outlined"
                sx={{ 
                  mt: 2, 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
                clickable
              />
            </Box>
            <SchoolIcon sx={{ fontSize: 80, opacity: 0.2, display: { xs: 'none', sm: 'block' } }} />
          </Paper>
        </Grid>

        {/* Stats Cards */}
        {[
          { title: 'Courses Completed', value: '12', icon: <CheckCircle fontSize="large" />, progress: 60 },
          { title: 'Hours Learned', value: '48', icon: <Schedule fontSize="large" />, progress: 30 },
          { title: 'Current Streak', value: '7 days', icon: <TrendingUp fontSize="large" />, progress: 70 },
          { title: 'Achievement Points', value: '850', icon: <EmojiEvents fontSize="large" />, progress: 85 },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: 2,
              '&:hover': { boxShadow: 4 },
              transition: '0.3s',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography variant="h5" color="primary">{stat.value}</Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {stat.title}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: 'primary.light',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" fontWeight="600">Recent Activity</Typography>
              <Chip label="View All" size="small" clickable />
            </Box>
            <List>
              {[
                'Completed React Advanced Course',
                'Started Machine Learning Fundamentals',
                'Earned Achievement: Problem Solver'
              ].map((activity, index) => (
                <ListItem 
                  key={index} 
                  divider={index < 2}
                  sx={{ 
                    px: 0,
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      borderRadius: 2
                    }
                  }}
                >
                  <ListItemText 
                    primary={activity} 
                    secondary={`${index + 1} day${index === 0 ? '' : 's'} ago`}
                  />
                  <ChevronRight color="action" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" fontWeight="600">Upcoming Tasks</Typography>
              <Chip label="View All" size="small" clickable />
            </Box>
            <List>
              {[
                'Complete Profile Details',
                'Take Skill Assessment',
                'Review Learning Goals'
              ].map((task, index) => (
                <ListItem 
                  key={index} 
                  divider={index < 2}
                  sx={{ 
                    px: 0,
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      borderRadius: 2
                    }
                  }}
                >
                  <ListItemText primary={task} />
                  <ChevronRight color="action" />
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