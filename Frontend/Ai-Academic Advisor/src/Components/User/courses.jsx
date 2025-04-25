import React, { useState, useEffect } from 'react';
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
    Chip,
    Rating,
    Stack,
    Divider,
    Snackbar,
    Alert,
    CircularProgress,
    styled,
} from '@mui/material';
import {
    AccessTime,
    OndemandVideo,
    Language,
    Star,
    PersonOutline,
    Download,
    PlayCircleOutline,
    SaveAlt as SaveIcon
} from '@mui/icons-material';

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

const Courses = () => {
    const [loading, setLoading] = useState(true);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [coursesBySkill, setCoursesBySkill] = useState({});
    const [career, setCareer] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchRecommendedCourses = async () => {
            setLoading(true);
            try {
                const career = localStorage.getItem('Target');
                if (!career) {
                    throw new Error('No career target found. Please set your career goal first.');
                }
                setCareer(career);

                const response = await fetch('http://127.0.0.1:5001/api/courses', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        career,
                        courses: [] // Empty array as we're just requesting Udemy recommendations
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API response:', data); // For debugging
                
                // Set all recommended courses from the API
                setRecommendedCourses(data.recommended_courses || []);
                
                // Group courses by skill for better organization in the UI
                const skillGroups = {};
                (data.recommended_courses || []).forEach(course => {
                    if (course.skill) {
                        if (!skillGroups[course.skill]) {
                            skillGroups[course.skill] = [];
                        }
                        skillGroups[course.skill].push(course);
                    }
                });
                // Limit each skill group to maximum 3 courses to ensure better row distribution
                Object.keys(skillGroups).forEach(skill => {
                    if (skillGroups[skill].length > 3) {
                        skillGroups[skill] = skillGroups[skill].slice(0, 3);
                    }
                });
                setCoursesBySkill(skillGroups);
                
            } catch (error) {
                console.error('Error fetching recommended courses:', error);
                setSnackbar({
                    open: true,
                    message: `Failed to fetch recommended courses: ${error.message}`,
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedCourses();
    }, []); // Run once when component mounts

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const coursesContent = (
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
                Recommended Courses for {career}
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Display courses grouped by skill */}
                    {Object.keys(coursesBySkill).length > 0 ? (
                        Object.entries(coursesBySkill).map(([skill, courses], index) => (
                            <Box key={index} sx={{ mb: 6 }}>
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        mb: 3, 
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <Chip 
                                        label={skill} 
                                        color="secondary" 
                                        sx={{ fontWeight: 'bold' }} 
                                    />
                                    <span>Related Courses</span>
                                </Typography>
                                
                                <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    {courses.map((course, courseIndex) => (
                                        <Grid item xs={12} sm={6} md={4} lg={4} key={courseIndex}>
                                            {/* Existing card component with course data */}
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
                                                {/* ...existing card content... */}
                                                <Box sx={{ position: 'relative' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="180"
                                                        image={course.image || 'https://via.placeholder.com/480x270?text=No+Image'}
                                                        alt={course.title}
                                                    />
                                                    {course.platform && (
                                                        <Chip
                                                            label={course.platform}
                                                            color="primary"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 16,
                                                                right: 16,
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    )}
                                                </Box>

                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            minHeight: 56,
                                                            lineHeight: 1.4,
                                                            fontSize: '1.1rem'
                                                        }}
                                                    >
                                                        {course.title || 'No Title'}
                                                    </Typography>

                                                    {course.instructor && (
                                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                                            <PersonOutline fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {course.instructor}
                                                            </Typography>
                                                        </Stack>
                                                    )}

                                                    {course.rating && (
                                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                                            <Rating value={course.rating} precision={0.1} readOnly size="small" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                ({course.num_subscribers ? course.num_subscribers.toLocaleString() : 'N/A'})
                                                            </Typography>
                                                        </Stack>
                                                    )}

                                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                        {course.duration && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                <AccessTime fontSize="small" color="action" />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {course.duration}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {course.features && course.features.length > 0 && (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                                            {course.features.map((feature, idx) => (
                                                                <Chip
                                                                    key={idx}
                                                                    label={feature}
                                                                    size="small"
                                                                    sx={{
                                                                        bgcolor: 'primary.lighter',
                                                                        color: 'primary.main',
                                                                        fontWeight: 500
                                                                    }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}

                                                    {course.languages && course.languages.length > 0 && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Language fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {course.languages.join(", ")}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>

                                                <Divider />

                                                <CardActions sx={{ p: 2 }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        {course.url && (
                                                            <Button
                                                                variant="contained"
                                                                fullWidth
                                                                startIcon={<PlayCircleOutline />}
                                                                href={course.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    py: 1,
                                                                    textTransform: 'none',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                Enroll Now
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))
                    ) : (
                        // If no skill groupings, display all courses linearly
                        <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                            {recommendedCourses.map((course, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
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
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={course.image || 'https://via.placeholder.com/480x270?text=No+Image'}
                                                alt={course.title}
                                            />
                                            {course.platform && (
                                                <Chip
                                                    label={course.platform}
                                                    color="primary"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 16,
                                                        right: 16,
                                                        fontWeight: 600
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    minHeight: 56,
                                                    lineHeight: 1.4,
                                                    fontSize: '1.1rem'
                                                }}
                                            >
                                                {course.title || 'No Title'}
                                            </Typography>

                                            {course.instructor && (
                                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                                    <PersonOutline fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {course.instructor}
                                                    </Typography>
                                                </Stack>
                                            )}

                                            {course.rating && (
                                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                                    <Rating value={course.rating} precision={0.1} readOnly size="small" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        ({course.num_subscribers ? course.num_subscribers.toLocaleString() : 'N/A'})
                                                    </Typography>
                                                </Stack>
                                            )}

                                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                {course.duration && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <AccessTime fontSize="small" color="action" />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {course.duration}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>

                                            {course.features && course.features.length > 0 && (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                                    {course.features.map((feature, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={feature}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: 'primary.lighter',
                                                                color: 'primary.main',
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            )}

                                            {course.languages && course.languages.length > 0 && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Language fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {course.languages.join(", ")}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>

                                        <Divider />

                                        <CardActions sx={{ p: 2 }}>
                                            <Box sx={{ width: '100%' }}>
                                                {course.url && (
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        startIcon={<PlayCircleOutline />}
                                                        href={course.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            borderRadius: 2,
                                                            py: 1,
                                                            textTransform: 'none',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        Enroll Now
                                                    </Button>
                                                )}
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            {recommendedCourses.length === 0 && !loading && (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        No recommended courses found for the selected career.
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    )}
                </>
            )}

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

    return <Dashboard content={coursesContent} initialTab="Courses" />;
};

export default Courses;