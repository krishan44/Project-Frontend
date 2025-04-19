import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
  CircularProgress,
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

const BASE_URL = 'http://127.0.0.1:5001';
const TIMEOUT_DURATION = 100000;

const Setting = () => {
  const [student, setStudent] = useState({
    fullName: '',
    email: '',
    studentID: '',
    userID: '',
    phone: '',
    address: '',
    firstName: '',
    lastName: '',
  });
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  // Add new state variables for photo upload
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  // Add state variables for password management
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  // Helper function to normalize confidence values with repetitions
  const normalizeConfidence = (confidence) => {
    if (!confidence || typeof confidence !== 'string') return confidence;
    
    // Find patterns of repeated words (words that start with capital letters)
    const matches = confidence.match(/([A-Z][a-z]+)/g);
    if (matches && matches.length > 1 && matches[0] === matches[1]) {
      // Return just the first occurrence if there's repetition
      return matches[0];
    }
    
    // If the confidence is unusually long (likely a repetition error)
    if (confidence.length > 20) {
      // Try to find the first word that starts with capital letter
      const firstWord = confidence.match(/([A-Z][a-z]+)/);
      if (firstWord) return firstWord[0];
      
      // If all else fails, return a trimmed version
      return confidence.substring(0, 15) + '...';
    }
    
    return confidence;
  };

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        // Get student data from localStorage with correct case sensitivity
        // Try both camelCase and PascalCase variations
        const storedStudent = {
          fullName: localStorage.getItem('FullName') || localStorage.getItem('fullName') || '',
          email: localStorage.getItem('email') || localStorage.getItem('Email') || '',
          studentID: localStorage.getItem('studentID') || localStorage.getItem('StudentID') || '',
          userID: localStorage.getItem('userID') || localStorage.getItem('UserID') || '',
        };

        // Check if we have data in global window object
        if (window.studentData) {
          console.log('Found student data in window object:', window.studentData);
          Object.assign(storedStudent, window.studentData);
        }

        console.log('Raw localStorage items:', {
          FullName: localStorage.getItem('FullName'),
          fullName: localStorage.getItem('fullName'),
          email: localStorage.getItem('email'),
          Email: localStorage.getItem('Email'),
          studentID: localStorage.getItem('studentID'),
          StudentID: localStorage.getItem('StudentID'),
          userID: localStorage.getItem('userID'),
          UserID: localStorage.getItem('UserID'),
        });

        // Parse data that might be stored as strings but should be numbers
        if (storedStudent.studentID) {
          storedStudent.studentID = typeof storedStudent.studentID === 'string' 
            ? parseInt(storedStudent.studentID, 10) 
            : storedStudent.studentID;
        }
        
        if (storedStudent.userID) {
          storedStudent.userID = typeof storedStudent.userID === 'string' 
            ? parseInt(storedStudent.userID, 10) 
            : storedStudent.userID;
        }

        console.log('Student data from localStorage after processing:', storedStudent);

        // Fallback to Overview.jsx's Target data if available
        const target = localStorage.getItem('Target');
        if (target && !storedStudent.fullName) {
          console.log('Using Target as fallback:', target);
        }

        // If we have user ID, fetch additional data from API
        if (storedStudent.userID) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

          try {
            const response = await fetch(
              `${BASE_URL}/api/setting`, 
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: storedStudent.userID }),
                signal: controller.signal,
              }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Student data from API:', data);
            
            // Merge localStorage data with API data
            if (data.student) {
              // Set photoURL from the student photo field
              if (data.student.photo) {
                setPhotoURL(data.student.photo);
              }
              
              // Set student data
              setStudent({
                ...storedStudent,
                ...data.student,
                // Keep firstName and lastName from API response
                phone: data.student.phone || '',
                address: data.student.address || ''
              });
            }

            // Set career preferences if available from API
            if (data.careers && Array.isArray(data.careers)) {
              setCareers(data.careers.map(career => ({
                ...career,
                // Ensure confidence is a number, not a string
                confidence: typeof career.confidence === 'number' 
                  ? career.confidence 
                  : (parseInt(career.confidence) || 0)
              })));
            }
          } catch (err) {
            console.error('Error fetching student data:', err);
            throw err; // Re-throw to be caught by outer try/catch
          }
        } else {
          // No userID, use what we have or mock data
          const nameParts = storedStudent.fullName ? storedStudent.fullName.split(' ') : ['', ''];
          
          // If we don't have anything, use hard-coded data from log
          if (!storedStudent.fullName && !storedStudent.email) {
            console.log('Using hardcoded data as fallback');
            storedStudent.fullName = 'Krishan Jay';
            storedStudent.email = 'testing@gmail.com';
            storedStudent.studentID = 6;
            storedStudent.userID = 7;
            nameParts[0] = 'Krishan';
            nameParts[1] = 'Jay';
          }
          
          setStudent({
            ...storedStudent,
            firstName: nameParts[0] || '',
            lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
          });
          
          // Store data in localStorage for future use
          if (storedStudent.fullName) localStorage.setItem('FullName', storedStudent.fullName);
          if (storedStudent.email) localStorage.setItem('email', storedStudent.email);
          if (storedStudent.studentID) localStorage.setItem('studentID', storedStudent.studentID);
          if (storedStudent.userID) localStorage.setItem('userID', storedStudent.userID);
        }
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError(err.message);
        setSnackbar({
          open: true,
          message: `Failed to load student data: ${err.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const response = await fetch(
        `${BASE_URL}/api/update_setting`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: student.userID,
            studentID: student.studentID,
            fullName: `${student.firstName} ${student.lastName}`.trim(),
            email: student.email,
            phone: student.phone,
            address: student.address,
            careers: careers
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Update localStorage with new values
      localStorage.setItem('FullName', `${student.firstName} ${student.lastName}`.trim());
      localStorage.setItem('email', student.email);

      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setSnackbar({
        open: true,
        message: `Failed to update profile: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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

  // Function to handle photo selection
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      setPhotoURL(objectUrl);
      
      // Upload the photo immediately
      handlePhotoUpload(file);
    }
  };

  // Function to upload photo to server
  const handlePhotoUpload = async (file) => {
    if (!file || !student.userID) return;
    
    setPhotoUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('userID', student.userID);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const response = await fetch(
        `${BASE_URL}/api/upload_photo`,
        {
          method: 'POST',
          body: formData, // Using FormData for file upload
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.photoURL) {
        // Update the photo URL in state and student object
        setPhotoURL(data.photoURL);
        setStudent(prev => ({
          ...prev,
          photo: data.photoURL
        }));
        
        setSnackbar({
          open: true,
          message: 'Profile photo updated successfully!',
          severity: 'success'
        });
      }
    } catch (err) {
      console.error('Error uploading photo:', err);
      setSnackbar({
        open: true,
        message: `Failed to upload photo: ${err.message}`,
        severity: 'error'
      });
    } finally {
      setPhotoUploading(false);
    }
  };

  // Function to trigger the file input
  const handlePhotoButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle password change
  const handlePasswordChange = async () => {
    // Reset errors
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    // Validate passwords
    let hasError = false;
    const errors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
      hasError = true;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
      hasError = true;
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
      hasError = true;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    if (hasError) {
      setPasswordErrors(errors);
      return;
    }

    setChangingPassword(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const response = await fetch(
        `${BASE_URL}/api/update_password`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: student.userID,
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server responded with status: ${response.status}`);
      }

      // Close dialog and show success message
      setPasswordDialog(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSnackbar({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.message === 'Current password is incorrect') {
        setPasswordErrors({
          ...passwordErrors,
          currentPassword: 'Current password is incorrect'
        });
      } else {
        setSnackbar({
          open: true,
          message: `Failed to change password: ${err.message}`,
          severity: 'error'
        });
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // Function to handle password dialog open
  const handlePasswordDialogOpen = () => {
    setPasswordDialog(true);
  };

  // Function to handle password dialog close
  const handlePasswordDialogClose = () => {
    setPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
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

  if (isLoading) {
    return (
      <Dashboard 
        content={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading your profile...</Typography>
          </Box>
        } 
        initialTab="Settings" 
      />
    );
  }

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
                    src={photoURL ? `${BASE_URL}${photoURL}` : null}
                  >
                    {student.firstName && student.lastName 
                      ? `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`
                      : 'U'}
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
                    onClick={handlePhotoButtonClick}
                    disabled={photoUploading}
                  >
                    {photoUploading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <PhotoCamera color="primary" />
                    )}
                  </IconButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handlePhotoSelect}
                  />
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>{student.fullName || 'User'}</Typography>
                <Typography variant="body2" color="text.secondary">Student</Typography>
                {student.studentID && (
                  <Typography variant="body2" color="text.secondary">ID: {student.studentID}</Typography>
                )}
              </Box>

              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mb: 2 }}
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
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
                      value={student.firstName || ''}
                      onChange={(e) => setStudent({...student, firstName: e.target.value})}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={student.lastName || ''}
                      onChange={(e) => setStudent({...student, lastName: e.target.value})}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={student.email || ''}
                      onChange={(e) => setStudent({...student, email: e.target.value})}
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
                      value={student.phone || ''}
                      onChange={(e) => setStudent({...student, phone: e.target.value})}
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
                      value={student.address || ''}
                      onChange={(e) => setStudent({...student, address: e.target.value})}
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
                <Button variant="outlined" sx={{ mb: 2 }} onClick={handlePasswordDialogOpen}>Change Password</Button>
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

  // Password change dialog
  const passwordChangeDialog = (
    <Dialog open={passwordDialog} onClose={handlePasswordDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            error={!!passwordErrors.currentPassword}
            helperText={passwordErrors.currentPassword}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            error={!!passwordErrors.newPassword}
            helperText={passwordErrors.newPassword}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            error={!!passwordErrors.confirmPassword}
            helperText={passwordErrors.confirmPassword}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePasswordDialogClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handlePasswordChange}
          disabled={changingPassword}
        >
          {changingPassword ? 'Changing...' : 'Change Password'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Dashboard content={settingContent} initialTab="Settings" />
      {careerDialog}
      {passwordChangeDialog}
    </>
  );
};

export default Setting;
