import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  InputAdornment
} from "@mui/material";
import {
  Close,
  ArrowBack,
  ArrowForward,
  Send,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const steps = ["Credentials", "Personal Information", "Education & Profession"];

const Registration = ({ open, closeForm, openLoginForm }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    date_of_birth: null,
    email: "",
    mobile_number: "",
    gender: "",
    address: "",
    education_level: "",
    major: "",
    learning_speed: "",
    profession: "",
    job_knowledge: "",
    country: "",
    specification: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateStep = (step) => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (step === 1) {
      if (!formData.full_name) newErrors.full_name = "Required";
      if (!formData.date_of_birth) newErrors.date_of_birth = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.mobile_number) newErrors.mobile_number = "Required";
      if (!formData.gender) newErrors.gender = "Required";
      if (!formData.address) newErrors.address = "Required";
    } else {
      if (!formData.education_level) newErrors.education_level = "Required";
      if (!formData.major) newErrors.major = "Required";
      if (!formData.learning_speed) newErrors.learning_speed = "Required";
      if (!formData.profession) newErrors.profession = "Required";
      if (!formData.job_knowledge) newErrors.job_knowledge = "Required";
      if (!formData.country) newErrors.country = "Required";
      if (!formData.specification) newErrors.specification = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(2)) {
      try {
        await axios.post("http://localhost:5001/api/submit_registration", formData);
        closeForm();
        openLoginForm(); // Add this to switch back to login after successful registration
        alert("Registration submitted successfully!");
      } catch (error) {
        console.error('Submission error:', error);
        alert("Submission failed. Please try again.");
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog 
        open={open} 
        onClose={closeForm} 
        fullWidth 
        maxWidth="md"
        sx={{ 
          '& .MuiDialog-paper': {
            overflow: 'visible'
          },
          '& .MuiSelect-select': {
            zIndex: 1400
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" color="primary">Registration Form </Typography>
            <IconButton onClick={closeForm}>
              <Close />
            </IconButton>
          </Box>
          <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            {activeStep === 0 ? (
              <Grid container spacing={3} sx={{ pt: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            ) : activeStep === 1 ? (
              <Grid container spacing={3} sx={{ pt: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={!!errors.full_name}
                    helperText={errors.full_name}
                    margin="normal"
                  />

                  <DatePicker
                    label="Date of Birth"
                    value={formData.date_of_birth}
                    onChange={(date) => 
                      setFormData(prev => ({ ...prev, date_of_birth: date }))
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: !!errors.date_of_birth,
                        helperText: errors.date_of_birth
                      },
                      popper: {
                        sx: {
                          zIndex: 1600
                        }
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    error={!!errors.mobile_number}
                    helperText={errors.mobile_number}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl component="fieldset" fullWidth margin="normal">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                    {errors.gender && (
                      <Typography color="error" variant="caption">
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3} sx={{ pt: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormControl 
                    fullWidth 
                    margin="normal" 
                    error={!!errors.education_level}
                  >
                    <InputLabel id="education-level-label">Education Level</InputLabel>
                    <Select
                      labelId="education-level-label"
                      id="education-level"
                      name="education_level"
                      value={formData.education_level}
                      label="Education Level"
                      onChange={handleChange}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        PaperProps: {
                          sx: { 
                            maxHeight: 300,
                            position: 'absolute',
                            zIndex: 9999
                          }
                        }
                      }}
                    >
                      <MenuItem value="">Select Level</MenuItem>
                      <MenuItem value="PhD">PhD</MenuItem>
                      <MenuItem value="MSc">Master's Degree</MenuItem>
                      <MenuItem value="BSc">Bachelor's Degree</MenuItem>
                      <MenuItem value="HND">HND</MenuItem>
                      <MenuItem value="Diploma">Diploma</MenuItem>
                      <MenuItem value="School Leaver">School Leaver</MenuItem>
                    </Select>
                    {errors.education_level && (
                      <Typography color="error" variant="caption">
                        {errors.education_level}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    error={!!errors.major}
                    helperText={errors.major}
                    margin="normal"
                  />

                  <FormControl 
                    fullWidth 
                    margin="normal" 
                    error={!!errors.learning_speed}
                  >
                    <InputLabel id="learning-speed-label">Learning Speed</InputLabel>
                    <Select
                      labelId="learning-speed-label"
                      id="learning-speed"
                      name="learning_speed"
                      value={formData.learning_speed}
                      label="Learning Speed"
                      onChange={handleChange}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        PaperProps: {
                          sx: { 
                            maxHeight: 300,
                            position: 'absolute',
                            zIndex: 9999
                          }
                        }
                      }}
                    >
                      <MenuItem value="">Select Speed</MenuItem>
                      <MenuItem value="Fast">Fast Learner</MenuItem>
                      <MenuItem value="Moderate">Moderate Learner</MenuItem>
                      <MenuItem value="Slow">Slow Learner</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    error={!!errors.profession}
                    helperText={errors.profession}
                    margin="normal"
                  />

                  <FormControl 
                    fullWidth 
                    margin="normal" 
                    error={!!errors.job_knowledge}
                  >
                    <InputLabel id="job-knowledge-label">Job Knowledge</InputLabel>
                    <Select
                      labelId="job-knowledge-label"
                      id="job-knowledge"
                      name="job_knowledge"
                      value={formData.job_knowledge}
                      label="Job Knowledge"
                      onChange={handleChange}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                        PaperProps: {
                          sx: { 
                            maxHeight: 300,
                            position: 'absolute',
                            zIndex: 9999
                          }
                        }
                      }}
                    >
                      <MenuItem value="">Select Knowledge Level</MenuItem>
                      <MenuItem value="Nothing">No Knowledge</MenuItem>
                      <MenuItem value="Little">Basic Knowledge</MenuItem>
                      <MenuItem value="Moderate">Moderate Knowledge</MenuItem>
                      <MenuItem value="A Lot">Advanced Knowledge</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Specifications"
                    name="specification"
                    value={formData.specification}
                    onChange={handleChange}
                    error={!!errors.specification}
                    helperText={errors.specification}
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            )}
          </form>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Registration;