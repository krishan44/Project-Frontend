import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Saman Kumara',
      email: 'saman@example.com',
      role: 'Student',
      status: 'Active',
      avatar: 'J',
    },
    {
        id: 1,
        name: 'Saman Kumara',
        email: 'saman@example.com',
        role: 'Student',
        status: 'Active',
        avatar: 'J',
      },
      {
        id: 1,
        name: 'Saman Kumara',
        email: 'saman@example.com',
        role: 'Student',
        status: 'Active',
        avatar: 'J',
      },
      {
        id: 1,
        name: 'Saman Kumara',
        email: 'saman@example.com',
        role: 'Student',
        status: 'Active',
        avatar: 'J',
      },
    // Add more mock users as needed
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Users Management
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ 
              '&:hover': { 
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: 'primary.main',
                      fontSize: '1.5rem',
                    }}
                  >
                    {user.avatar}
                  </Avatar>
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={user.role}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={user.status}
                    size="small"
                    color={user.status === 'Active' ? 'success' : 'error'}
                  />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
