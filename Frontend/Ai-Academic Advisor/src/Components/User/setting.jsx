import React, { useState } from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  Divider,
  TextField,
  Button,
  Avatar,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Rating,
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Security,
  Language,
  Palette,
  PhotoCamera,
  Email,
  Phone,
  LocationOn,
  Work as CareerIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Setting = () => {
  const [careers, setCareers] = useState([
    { id: 1, title: 'Software Engineer', confidence: 85 },
    { id: 2, title: 'Data Scientist', confidence: 75 },
    { id: 3, title: 'Web Developer', confidence: 90 },
  ]);

  const [openCareerDialog, setOpenCareerDialog] = useState(false);
  const [newCareerChoice, setNewCareerChoice] = useState({
    profession: '',
    knowledge: 0,
    specifications: [],
    interests: [],
  });

  const professionOptions = [
    'Software Engineer',
    'Data Scientist',
    'Web Developer',
    'AI Engineer',
    'Cloud Architect',
    'Cybersecurity Specialist',
    'DevOps Engineer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Mobile App Developer',
  ];

  const handleOpenCareerDialog = () => {
    setOpenCareerDialog(true);
  };

  const handleCloseCareerDialog = () => {
    setOpenCareerDialog(false);
    setNewCareerChoice({
      profession: '',
      knowledge: 0,
      specifications: [],
      interests: [],
    });
  };

  const handleAddNewCareer = () => {
    if (newCareerChoice.profession) {
      setCareers([...careers, {
        id: Date.now(),
        title: newCareerChoice.profession,
        confidence: newCareerChoice.knowledge * 20, // Convert 0-5 rating to percentage
      }]);
      handleCloseCareerDialog();
    }
  };

  const handleDeleteCareer = (id) => {
    setCareers(careers.filter(career => career.id !== id));
  };

  const careerDialog = (
    <Dialog open={openCareerDialog} onClose={handleCloseCareerDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Explore New Career Path</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Desired Profession</InputLabel>
            <Select
              value={newCareerChoice.profession}
              label="Desired Profession"
              onChange={(e) => setNewCareerChoice({
                ...newCareerChoice,
                profession: e.target.value
              })}
            >
              {professionOptions.map((profession) => (
                <MenuItem key={profession} value={profession}>
                  {profession}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1" gutterBottom>
            Knowledge Level in This Field
          </Typography>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Rating
              value={newCareerChoice.knowledge}
              onChange={(event, newValue) => {
                setNewCareerChoice({
                  ...newCareerChoice,
                  knowledge: newValue
                });
              }}
              max={5}
              size="large"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              {newCareerChoice.knowledge === 0 && 'No Experience'}
              {newCareerChoice.knowledge === 1 && 'Beginner'}
              {newCareerChoice.knowledge === 2 && 'Intermediate'}
              {newCareerChoice.knowledge === 3 && 'Advanced'}
              {newCareerChoice.knowledge === 4 && 'Expert'}
              {newCareerChoice.knowledge === 5 && 'Master'}
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Specifications & Requirements"
            placeholder="Enter any specific requirements or interests related to this profession..."
            value={newCareerChoice.specifications}
            onChange={(e) => setNewCareerChoice({
              ...newCareerChoice,
              specifications: e.target.value
            })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCareerDialog}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleAddNewCareer}
          disabled={!newCareerChoice.profession || !newCareerChoice.knowledge}
        >
          Add Career Path
        </Button>
      </DialogActions>
    </Dialog>
  );

  const settingContent = (
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
        Account Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto',
                      boxShadow: 3,
                    }}
                    src="/path-to-profile-image.jpg"
                  >
                    JD
                  </Avatar>
                  <IconButton 
                    sx={{ 
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                      '&:hover': { bgcolor: 'background.paper' }
                    }}
                  >
                    <PhotoCamera color="primary" />
                  </IconButton>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>John Doe</Typography>
                <Typography variant="body2" color="text.secondary">Student</Typography>
              </Box>

              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mb: 2 }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Sections */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Personal Information */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountCircle color="primary" />
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      defaultValue="John"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      defaultValue="Doe"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue="john.doe@example.com"
                      size="small"
                      InputProps={{
                        startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      defaultValue="+1 234 567 890"
                      size="small"
                      InputProps={{
                        startAdornment: <Phone sx={{ color: 'action.active', mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      defaultValue="123 Main St, City, Country"
                      size="small"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: 'action.active', mr: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Security */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  Security
                </Typography>
                <Button variant="outlined" sx={{ mb: 2 }}>Change Password</Button>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                  }}
                >
                  <Typography>Two-Factor Authentication</Typography>
                  <Switch />
                </Box>
              </CardContent>
            </Card>

            {/* Career Preferences - New Section */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CareerIcon color="primary" />
                  Career Preferences
                </Typography>
                
                {careers.map((career) => (
                  <Box
                    key={career.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">{career.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confidence: {career.confidence}%
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteCareer(career.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCareerDialog}
                  sx={{ mt: 2 }}
                >
                  Explore More Career Options
                </Button>
              </CardContent>
            </Card>

          </Stack>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <>
      <Dashboard content={settingContent} initialTab="Settings" />
      {careerDialog}
    </>
  );
};

export default Setting;
