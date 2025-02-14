import React, { useState } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Stack,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  AccessTime,
  OndemandVideo,
  Language,
  Star,
  PersonOutline,
  Download,
  PlayCircleOutline,
  SaveAlt as SaveIcon
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

const courseData = [
  {
    id: 1,
    title: "Learn Python Programming: Complete Course",
    instructor: "John Smith",
    platform: "Udemy",
    rating: 4.8,
    reviews: 45678,
    price: "$29.99",
    originalPrice: "$99.99",
    students: "245,678",
    duration: "22 hours",
    lectures: 185,
    level: "Beginner",
    image: "https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg",
    languages: ["English", "Spanish"],
    updatedDate: "Last updated 11/2023",
    features: ["Certificate", "Downloadable Resources", "Full Lifetime Access"]
  },
  {
    id: 2,
    title: "Full-Stack Web Development with React",
    instructor: "Sarah Johnson",
    platform: "Coursera",
    rating: 4.9,
    reviews: 32150,
    price: "$49/month",
    students: "189,456",
    duration: "32 hours",
    lectures: 280,
    level: "Intermediate",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/83/e258e0532611e5a5072321239ff4d4/jhep-coursera-course4.jpg",
    languages: ["English"],
    updatedDate: "Last updated 12/2023",
    features: ["Professional Certificate", "Hands-on Projects", "Flexible Schedule"]
  },
  {
    id: 3,
    title: "Advanced Data Science & Analytics",
    instructor: "David Chen",
    platform: "edX",
    rating: 4.7,
    reviews: 28934,
    price: "$199",
    students: "156,789",
    duration: "40 hours",
    lectures: 220,
    level: "Advanced",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/950e9c06-12dd-4746-9cfa-1111f106428f-6f1584d35619.small.png",
    languages: ["English", "German"],
    updatedDate: "Last updated 10/2023",
    features: ["Industry Partners", "Real-world Projects", "Expert Instruction"]
  }
];

const Courses = () => {
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
        message: 'Course selections saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save selections. Please try again.',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const coursesContent = (
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
        Featured Courses
      </Typography>

      <Grid container spacing={3}>
        {courseData.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
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
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={course.image}
                  alt={course.title}
                />
                <Chip
                  label={course.platform}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 600
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6"
                  sx={{ 
                    fontWeight: 600,
                    minHeight: 56,
                    lineHeight: 1.4,
                    fontSize: '1.1rem'
                  }}
                >
                  {course.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PersonOutline fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {course.instructor}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Rating value={course.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({course.reviews.toLocaleString()})
                  </Typography>
                </Stack>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <OndemandVideo fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {course.lectures} lectures
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {course.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{ 
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Language fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {course.languages.join(", ")}
                  </Typography>
                </Box>
              </CardContent>

              <Divider />

              <CardActions sx={{ p: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2, gap: 1 }}>
                    <Typography variant="h6" color="primary.main" fontWeight={600}>
                      {course.price}
                    </Typography>
                    {course.originalPrice && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {course.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth
                    startIcon={<PlayCircleOutline />}
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Enroll Now
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          {saving ? 'Saving...' : 'Save Courses'}
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
    </Container>
  );

  return <Dashboard content={coursesContent} initialTab="Courses" />;
};

export default Courses;
