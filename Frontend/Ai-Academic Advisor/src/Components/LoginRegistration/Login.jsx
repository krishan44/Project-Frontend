import React, { useState } from "react";
import { 
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { 
  LockOutlined, 
  Visibility, 
  VisibilityOff,
  EmailOutlined,
  Google,
  Facebook
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#4f46e5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
  },
});

const LoginForm = ({  open, closeForm , openRegistrationForm = () => {}  }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log("Login data:", formData);
      alert("Login successful!");
      closeForm(); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={open}
        onClose={closeForm}
        fullWidth
        maxWidth="xs"
        keepMounted={false} 
        closeAfterTransition 
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'visible',
            position: 'relative'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 5 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockOutlined 
              sx={{ 
                fontSize: 40, 
                color: "primary.main",
                mb: 2,
                bgcolor: "rgba(99, 102, 241, 0.1)",
                p: 1.5,
                borderRadius: "50%"
              }} 
            />
            <Typography component="h1" variant="h5" fontWeight="600">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please sign in to continue
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
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
              variant="outlined"
            />

            <Grid container justifyContent="space-between" sx={{ mt: 1, cursor: "pointer" }}>
              <Grid item>
                <Link href="#" variant="body2" underline="hover">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
              <Link 
                href="#" 
                variant="body2" 
                underline="hover" 
                onClick={(e) => {
                    e.preventDefault();              
                    openRegistrationForm();        
                    closeForm();  
                }}
                >
                Create Account
                </Link>
              </Grid>
            </Grid>

            <Box sx={{ position: "relative", mt: 4, mb: 3 }}>
              <Box sx={{ 
                position: "absolute", 
                top: "50%", 
                left: 0, 
                right: 0, 
                height: "1px", 
                bgcolor: "divider" 
              }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  position: "relative", 
                  display: "inline-block", 
                  px: 2, 
                  bgcolor: "background.paper",
                  color: "text.secondary"
                }}
              >
                Or continue with
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          flexDirection: 'column', 
          gap: 2,
          pb: 4,
          px: 3
        }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ 
              py: 1.5,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: 3,
              }
            }}
          >
            Sign In
          </Button>
          
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            justifyContent: "center", 
            width: '100%'
          }}>
            <Button
              variant="outlined"
              startIcon={<Google />}
              fullWidth
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(99, 102, 241, 0.04)"
                }
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<Facebook color="primary" />}
              fullWidth
              sx={{
                borderColor: "divider",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(99, 102, 241, 0.04)"
                }
              }}
            >
              Facebook
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default LoginForm;