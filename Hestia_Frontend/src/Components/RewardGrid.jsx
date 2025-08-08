import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ItemPurchaseModal from "./ItemPurchaseModal"
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const RewardGrid = ({ id }) => {

    const [rewardList, setRewardList] = useState([]);
    console.log(id)
    useEffect(() => {
        const fetchRewards = async() => {
              try{
                const res = await axios.get(`${API_URL}/api/rewards/${id}`)
                setRewardList(res?.data)
                console.log(rewardList[0])
            } catch(e) {
                console.error("Could't get rewards")
            }
        }
        if (id) fetchRewards()
    }, [id])

  return (
    <Grid container spacing={4} justifyContent="center">
      {rewardList.map((reward, index) => (
       
        <Grid sx={flex} item xs="auto" sm={6} md={6} key={index} >
          <Card 
          sx={{ ...flex, padding: ".5em",  width: 150, height: 230 , borderRadius: 3, cursor: 'pointer', boxShadow:  "0 0 3px #FF5F00"}}
          >
            <CardMedia
              component="img"
              height="100" 
              image={reward?.img}
              alt={reward?.title}
            />
            <CardContent sx={{...flex, paddingTop: "1em", gap:3}}>
              <Typography variant="h6" sx={title} component="div">
                {reward?.title}
              </Typography>

              <ItemPurchaseModal
                id={reward.id}
                img={reward?.img}
                rewardTitle={reward?.title}
                quantity={reward?.quantity}
                cost={reward?.cost}
                size={reward?.size}
                usdPrice={reward?.UsdPrice}
                vendor_id={id}
              />
            </CardContent>
          </Card>
        </Grid>

      ))}
    </Grid>
  );
};

const flex = {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const title = {
  margin: 0,
  fontSize: "", // auto-adjusts size
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  lineHeight: "1.1",
  fontSize:"15px", 
  fontWeight:"bold"
}

export default RewardGrid;