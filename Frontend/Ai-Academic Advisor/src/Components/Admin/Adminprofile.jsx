import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Save as SaveIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Adminprofile = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    twoFactorAuth: true,
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Admin Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Personal Information Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  margin: '0 auto 16px',
                }}
              >
                A
              </Avatar>
              <Typography variant="h5" gutterBottom>
                Admin User
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                admin@example.com
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Change Avatar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Account Settings */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        defaultValue="Admin"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue="User"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        defaultValue="admin@example.com"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        defaultValue="+1 234 567 8900"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* System Settings */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    System Settings
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Email Notifications"
                        secondary="Receive email updates about system activities"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={() => handleSettingChange('emailNotifications')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Push Notifications"
                        secondary="Get push notifications for important updates"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.pushNotifications}
                          onChange={() => handleSettingChange('pushNotifications')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Two-Factor Authentication"
                        secondary="Add an extra layer of security"
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onChange={() => handleSettingChange('twoFactorAuth')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Security Settings */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={<SecurityIcon />}
                      >
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  size="large"
                >
                  Save All Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Adminprofile;
