import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Snackbar,
  Alert,
  CircularProgress,
  styled,
} from '@mui/material';
import { AccessTime, AttachMoney, SaveAlt as SaveIcon } from '@mui/icons-material';

const degreeData = [
  {
    id: 1,
    universityName: "Harvard University",
    degree: "Bachelor of Computer Science",
    duration: "4 years",
    cost: "$58,000/year",
    image: "https://www.harvard.edu/wp-content/uploads/2021/02/091520_Stock_KS_0404_2500.jpg"
  },
  {
    id: 2,
    universityName: "MIT",
    degree: "Bachelor of Software Engineering",
    duration: "4 years",
    cost: "$55,000/year",
    image: "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Dome-Twilight-1024.jpg"
  },
  {
    id: 3,
    universityName: "Stanford University",
    degree: "Bachelor of AI & Machine Learning",
    duration: "4 years",
    cost: "$56,000/year",
    image: "https://www.stanford.edu/wp-content/uploads/2022/04/Stanford-Memorial-Church-Silicon-Valley.jpg"
  },
  // Add more universities as needed
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

const Degree = () => {
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const degreeContent = (
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
        Available Degrees
      </Typography>

      <Grid container spacing={3}>
        {degreeData.map((degree) => (
          <Grid item xs={12} sm={6} md={4} key={degree.id}>
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
              <CardMedia
                component="img"
                height="200"
                image={degree.image}
                alt={degree.universityName}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main'
                  }}
                >
                  {degree.universityName}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="text.primary"
                  sx={{ mb: 2, fontWeight: 500 }}
                >
                  {degree.degree}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Duration: {degree.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Tuition: {degree.cost}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
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
          {saving ? 'Saving...' : 'Save Degrees'}
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

  return <Dashboard content={degreeContent} initialTab="Degrees" />;
};

export default Degree;
