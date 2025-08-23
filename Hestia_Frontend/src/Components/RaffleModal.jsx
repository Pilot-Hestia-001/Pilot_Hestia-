import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Wheel } from 'react-custom-roulette'
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from "axios"
import socket from "../Utils/socket"
const API_URL = import.meta.env.VITE_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  color: "black",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 8
};


export default function RaffleModal({disabled}) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [participants, setParticipants] = useState([])
  const [inRaffleRoom, setInRaffleRoom] = useState(false)
  const [mustSpin, setMustSpin] = useState(false);
  const [winner, setWinner] = useState("")
  const [prizeNumber, setPrizeNumber] = useState(null);
  const {isAdmin} = useContext(AuthContext)
  const [data, setData] = useState([])
 
  const handleOpen = async() => {
    try {
      const token = localStorage.getItem("token");
      const userRes = await axios.get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedUser = userRes?.data;
      setUser(fetchedUser);
       
      // Now that we have the user, join the raffle room
      const name = `${fetchedUser?.first_name} ${fetchedUser?.last_name}`;
      const user_id = fetchedUser?.id;
      const role = isAdmin ? "admin" : "user"
      socket.emit("join_raffle_room", { user_id, name, role });
  
      setOpen(true); // open modal after everything is ready
    } catch (e) {
      console.log("Error fetching profile data:", e);
    }
  }

  const handleClose = () => {
    if (user?.id) {
      socket.emit("leave_raffle_room", { user_id: user.id });
    }
    setOpen(false);
  }

  useEffect(() => {
    const handleRaffleParticipants = ( raffleParticipants ) => {
      setParticipants(raffleParticipants);
      const dataArr = raffleParticipants?.map(obj => ({ option: obj.name }))
      console.log(dataArr)
      setData(dataArr)
    };
  
    socket.on("raffle_participants", ({raffleParticipants}) =>{
      handleRaffleParticipants(raffleParticipants)
    });

    socket.on("raffle_winner", ({winner, winnerIdx}) => {
      if (participants?.length <= 1) {
        setWinner(winner);
        setPrizeNumber(0); 
      } else {
        setWinner(winner);
        if(prizeNumber === null) setPrizeNumber(winnerIdx);
        setMustSpin(true);
      }
    });
  
    return () => {
      socket.off("raffle_participants", handleRaffleParticipants);
    };
  }, []);

  useEffect(() => {
    console.log("Number of participants:", participants.length);
   
  }, [participants]);
 
    
  if(prizeNumber) console.log(prizeNumber)

  const startRaffle =() =>{
    socket.emit("start_raffle")
    if(winner)setWinner("")
    if(prizeNumber)setPrizeNumber(null);
  }
  
  return (
    <div>
      <Button 
      onClick={handleOpen} 
      variant="contained" 
      disabled={!disabled}
      sx={{ backgroundColor: '#ff2400', 
            color: 'white', 
            marginTop:"10px", 
            fontWeight: 600,}}>Enter Raffle</Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center"}}>
                
                {
                  winner ?
                <>
                <h1 style={{textAlign: "center"}}>Raffle Winner!</h1>
                <h1 style={{textAlign: "center"}}>{winner}</h1>
                </>

                :

                <>

                <h1 style={{textAlign: "center"}}>Raffle Participants:</h1>
                <h1 style={{textAlign: "center"}}>{participants?.length}</h1>
                <h2 style={{textAlign: "center"}}>Raffle starting soon...</h2>

                </> 
                  
                }
            
               {
                isAdmin&&(
                  <Button 
                  onClick={startRaffle} 
                  variant="contained" 
                  sx={{   backgroundColor: '#ff2400', 
                          color: 'white', 
                          marginTop:"10px",
                          fontWeight: 600,}}>Start Raffle</Button>
                )

              }
              </div>
        </Box>
      </Modal>
    </div>
  );
}