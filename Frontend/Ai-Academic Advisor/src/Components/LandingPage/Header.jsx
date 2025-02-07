import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: '0 10px',
  textTransform: 'none',
  fontWeight: 500,
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main
  }
}));

function Header({ openAuthDialog }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGetStarted = () => {
    openAuthDialog();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#Home' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#services' },
    { label: 'Reviews', href: '#Review' }
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={1}
        sx={{ 
          background: 'white', 
          borderBottom: '1px solid #f0f0f0',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                color: 'primary.main',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              FutureTrack
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <NavButton 
                    key={link.label} 
                    href={link.href} 
                    variant="text"
                  >
                    {link.label}
                  </NavButton>
                ))}
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleGetStarted}
                  sx={{ 
                    borderRadius: '8px', 
                    ml: 2,
                    textTransform: 'none',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}

            {isMobile && (
              <IconButton onClick={toggleMenu}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={toggleMenu}
        >
          <List sx={{ width: 250, fontFamily: 'Poppins, sans-serif' }}>
            {navLinks.map((link) => (
              <ListItem 
                key={link.label} 
                button 
                component="a" 
                href={link.href}
                onClick={toggleMenu}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleGetStarted}>
              <ListItemText primary="Get Started" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
}

export default Header;