import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ActivityGrid = ({ activities, onCardClick, isSelected }) => {
 
  return (
    <Grid container spacing={2}>
      {activities.map((activity, index) => (
        <div style={{padding:"2px"}}>
        <Grid item xs={2} sm={2} md={2} key={index}>
          <Card 
          sx={{ maxWidth: 150, borderRadius: 3, cursor: 'pointer', boxShadow: (isSelected === activity.id) ? "0 0 10px #FF5F00" : "0 0 3px #FF5F00", border: (isSelected === activity.id) ? "3px solid #FF5F00" : "none"}}
          onClick={() => onCardClick(activity)}
          >
            <CardMedia
              component="img"
              height="100"
              image={activity.img}
              alt={activity.title}
            />
            <CardContent>
              <Typography variant="h6" sx={{fontSize:"20px"}} component="div">
                {activity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points: {activity.points}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </div>
      ))}
    </Grid>
  );
};

export default ActivityGrid;
