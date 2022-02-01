import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Box } from '@mui/system';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const AvailableOption = (props) => {
    const {name, people, cost, img} = props.vehicles;
    return (
        <Card sx={{ display: 'flex', padding:1, marginBottom:'20px' }}>
            <CardMedia
                component="img"
                sx={{ width: 170 }}
                image={img}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                    {name}
                </Typography>
                <Typography component="div" variant="h6">
                    <PeopleIcon />  {people}
                </Typography>
                <Typography component="div" variant="h6">
                    {cost}
                </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default AvailableOption;