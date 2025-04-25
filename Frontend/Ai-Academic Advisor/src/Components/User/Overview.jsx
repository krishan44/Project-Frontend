import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    Lightbulb,
    TrendingUp,
    WorkOutline,
    Psychology,
    Assignment,
    Timeline,
    School,
    Star,
    CheckCircle,
} from '@mui/icons-material';
import axios from 'axios';

const Overview = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [overviewData, setOverviewData] = useState({
        job: '',
        skills: [],
        roadmap: [],
    });

    useEffect(() => {
        let isMounted = true;

        const fetchOverviewData = async () => {
            if (!isMounted) return;
            setIsLoading(true);

            try {
                const userID = localStorage.getItem('UserId');
                if (!userID) {
                    console.error('User ID not found in local storage');
                    setIsLoading(false);
                    return;
                }

                const response = await axios.post('http://localhost:5001/api/overview', {
                    userID: userID,
                });

                if (isMounted && response.data) {
                    setOverviewData(response.data);
                }
            } catch (error) {
                console.error('Error fetching overview data:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchOverviewData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return (
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                zIndex: 9999
            }}>
                <CircularProgress />
            </Box>
        );
    }

    const { job, skills, roadmap } = overviewData;

    const careerTips = [
        {
            title: "Technical Skills",
            description: "Focus on mastering programming fundamentals and stay updated with latest technologies",
            icon: <School />,
        },
        {
            title: "Soft Skills",
            description: "Develop communication, teamwork, and problem-solving abilities",
            icon: <Psychology />,
        },
        {
            title: "Industry Trends",
            description: "Keep track of AI, cloud computing, and cybersecurity developments",
            icon: <TrendingUp />,
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Grid container spacing={3}>
                {/* Career Overview Card */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 4,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}40`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <WorkOutline sx={{ fontSize: 40 }} />
                            <Typography variant="h4" fontWeight="700">
                                {job}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                            Career Success Roadmap
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {['High Demand', 'Growing Field', 'Remote Opportunities'].map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    variant="outlined"
                                    size="small"
                                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Career Tips
                {careerTips.map((tip, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{
                            height: '100%',
                            borderRadius: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}20`,
                            },
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    {React.cloneElement(tip.icon, { color: 'primary', sx: { fontSize: 30 } })}
                                    <Typography variant="h6" fontWeight="600">
                                        {tip.title}
                                    </Typography>
                                </Box>
                                <Typography color="text.secondary">
                                    {tip.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}

                {/* Key Skills Required */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Star color="primary" />
                            <Typography variant="h6" fontWeight="600">
                                Key Skills Required
                            </Typography>
                        </Box>
                        <List>
                            {skills && skills.map((skill, index) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                    <ListItemIcon>
                                        <CheckCircle color="success" sx={{ fontSize: 20 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={skill.name} />
                                </ListItem>
                            ))}
                            {skills && skills.length === 0 && (
                                <Typography color="text.secondary">No key skills found for {job}.</Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>

                {/* Learning Path */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Timeline color="primary" />
                            <Typography variant="h6" fontWeight="600">
                                Learning Path
                            </Typography>
                        </Box>
                        <List>
                            {roadmap && roadmap.map((step, index) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                    <ListItemIcon>
                                        <Assignment color="primary" sx={{ fontSize: 20 }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={step}
                                        secondary={`Step ${index + 1}`}
                                    />
                                </ListItem>
                            ))}
                            {roadmap && roadmap.length === 0 && (
                                <Typography color="text.secondary">No learning path found for {job}.</Typography>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Overview;