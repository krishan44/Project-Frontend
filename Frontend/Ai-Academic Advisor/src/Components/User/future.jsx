import React from 'react';
import Dashboard from './Dashboard';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  Timeline,
  Analytics,
  Speed,
  MonetizationOn,
  ShowChart,
  WorkOutline,
  Assessment,
} from '@mui/icons-material';

const futureData = [
  {
    field: "Artificial Intelligence",
    growthRate: 95,
    salary: {
      current: "$120,000",
      projected: "$180,000",
    },
    demandTrend: "Exponential Growth",
    timeframe: "2024-2030",
    skills: ["Machine Learning", "Python", "Deep Learning"],
    industries: ["Tech", "Healthcare", "Finance"],
    outlook: "Very High",
    jobSecurity: 90,
    marketSaturation: "Low",
    futureProspects: [
      "AI Research Lead",
      "ML Engineer",
      "AI Ethics Officer"
    ]
  },
  {
    field: "Cloud Computing",
    growthRate: 88,
    salary: {
      current: "$115,000",
      projected: "$160,000",
    },
    demandTrend: "Steady Growth",
    timeframe: "2024-2028",
    skills: ["AWS", "Azure", "DevOps"],
    industries: ["Technology", "Banking", "E-commerce"],
    outlook: "High",
    jobSecurity: 85,
    marketSaturation: "Medium",
    futureProspects: [
      "Cloud Architect",
      "DevOps Engineer",
      "Cloud Security Specialist"
    ]
  },
  {
    field: "Cybersecurity",
    growthRate: 92,
    salary: {
      current: "$125,000",
      projected: "$170,000",
    },
    demandTrend: "Rapid Growth",
    timeframe: "2024-2029",
    skills: ["Network Security", "Ethical Hacking", "Security Frameworks"],
    industries: ["Defense", "Banking", "Healthcare"],
    outlook: "Very High",
    jobSecurity: 95,
    marketSaturation: "Low",
    futureProspects: [
      "Security Architect",
      "Incident Response Manager",
      "Security Analyst"
    ]
  }
];

const Future = () => {
  const getColorByGrowthRate = (rate) => {
    if (rate >= 90) return 'success';
    if (rate >= 70) return 'primary';
    return 'warning';
  };

  const futureContent = (
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
        Future Job Market Analysis
      </Typography>

      <Grid container spacing={3}>
        {futureData.map((field, index) => (
          <Grid item xs={12} key={index}>
            <Card 
              sx={{ 
                borderRadius: 3,
                boxShadow: 2,
                '&:hover': { boxShadow: 4 },
                transition: '0.3s',
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h5" fontWeight="600" color="primary.main" gutterBottom>
                        {field.field}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip 
                          icon={<TrendingUp />} 
                          label={`${field.growthRate}% Growth`}
                          color={getColorByGrowthRate(field.growthRate)}
                        />
                        <Chip 
                          icon={<Timeline />} 
                          label={field.timeframe}
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Salary Projection
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MonetizationOn color="primary" />
                        <Typography variant="body1">
                          Current: {field.salary.current}
                        </Typography>
                        <ShowChart color="success" />
                        <Typography variant="body1" color="success.main">
                          Future: {field.salary.projected}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Market Indicators
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Job Security</Typography>
                            <Typography variant="body2" color="primary">
                              {field.jobSecurity}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={field.jobSecurity}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Market Saturation: {field.marketSaturation}
                          </Typography>
                          <Typography variant="body2">
                            Demand Trend: {field.demandTrend}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Future Prospects
                      </Typography>
                      <Stack spacing={1}>
                        {field.futureProspects.map((prospect, idx) => (
                          <Chip
                            key={idx}
                            icon={<WorkOutline />}
                            label={prospect}
                            variant="outlined"
                            sx={{ justifyContent: 'flex-start' }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Key Industries
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {field.industries.map((industry, idx) => (
                          <Chip
                            key={idx}
                            label={industry}
                            size="small"
                            sx={{ 
                              bgcolor: 'primary.lighter',
                              color: 'primary.main',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  return <Dashboard content={futureContent} initialTab="Future" />;
};

export default Future;
