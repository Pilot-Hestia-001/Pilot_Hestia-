
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ActivityGrid from "./ActivityGrid"
import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  color: "black",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const PayemntModal = ({user, handleUserRefresh}) => {
    const [activities, setActivities] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
  }

  useEffect(() => {
    const fetchActivities = async () => {
      try{
        const res = await axios.get(`${API_URL}/api/activities/retrieve`)
        const activityList = res?.data
        setActivities(activityList)
       
      } catch(e) {
        console.log("couldn't fetch activities")
      }
    }

    fetchActivities();
   }, [])
    
  
    const [error, setError] = useState('');
  
      const handleSubmit = async () => {

         const data = {
            "user_id" : user?.id,
            "activity_id" : selectedActivity?.id
         }
        
         try{
            const res = axios.post(`${API_URL}/api/activities/complete`, data )
            handleUserRefresh()
            handleClose()
         } catch(e){
            console.log("error ocurred", e)
         }

      };

      const handleCardClick = (activity) => {
        
        setSelectedActivity(activity); // Save selected activity
      };
  
    return (
      <div>
        <Button disabled={!user} onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600,}}>Pay</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{  marginBottom: "10px"}} id="modal-modal-title" variant="h6" component="h2">
              Which Activity?
            </Typography>
              
            <ActivityGrid 
                activities={activities} 
                onCardClick={handleCardClick}
                isSelected={selectedActivity?.id}
            />

            <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"12px", fontWeight: 600,}}> Pay {selectedActivity?.points}</Button>
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                  {error}
              </Typography>
              )}
          </Box>
        </Modal>
      </div>
    );
  }

  export default PayemntModal;