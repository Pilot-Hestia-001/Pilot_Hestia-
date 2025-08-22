import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ActivityGrid = ({ activities, onCardClick, isSelected }) => {
 
  return (
    <Grid container spacing={2}>
      <div style={{
        maxHeight: 400, // set scrollable height
        overflowY: "auto",
        padding: 1,
        }}>
      {activities.map((activity, index) => (
        <div>
        <Grid item xs={12} key={index}>
          <Card 
          sx={{ width: 200, height:200, borderRadius: 3, cursor: 'pointer', boxShadow: (isSelected === activity.id) ? "0 0 10px #FF5F00" : "0 0 3px #FF5F00", border: (isSelected === activity.id) ? "3px solid #FF5F00" : "none", marginBottom: 5}}
          onClick={() => onCardClick(activity)}
          >
            <CardMedia
              component="img"
              height="100"
              image={activity?.img}
              alt={activity?.title}
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
      </div>
    </Grid>
  );
};

export default ActivityGrid;
