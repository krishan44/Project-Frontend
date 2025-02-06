import React from 'react';
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
} from '@mui/material';
import { AccessTime, AttachMoney } from '@mui/icons-material';

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

const Degree = () => {
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
    </Container>
  );

  return <Dashboard content={degreeContent} initialTab="Degrees" />;
};

export default Degree;
