import React from 'react';
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
} from '@mui/icons-material';

const Setting = () => {
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

            {/* Notifications */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications color="primary" />
                  Notifications
                </Typography>
                {[
                  'Email Notifications',
                  'Push Notifications',
                  'Course Updates',
                  'Newsletter',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                    }}
                  >
                    <Typography>{item}</Typography>
                    <Switch defaultChecked />
                  </Box>
                ))}
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
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );

  return <Dashboard content={settingContent} initialTab="Settings" />;
};

export default Setting;
