import HamburgerMenu from "../Components/Menu";
import Coupon from "../Components/Coupon";
import { useState, useEffect  } from "react"
import axios from "axios"
import { Receipt } from "@mui/icons-material";
import {jwtDecode} from "jwt-decode"
import socket from "../Utils/socket"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const API_URL = import.meta.env.VITE_API_URL;


const ProfilePage= () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState([])
  const [reciept, setReciept] =  useState(null)
  const token = localStorage.getItem("token");
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);
  
        const couponsRes = await axios.get(`${API_URL}/api/rewards/coupon`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCoupons(couponsRes.data);
      } catch (e) {
        console.log("Error fetching profile data:", e);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      console.error("Invalid token", e);
      return;
    }

    const userId = decoded?.id;

    if (!userId) {
      console.warn("User ID missing in token");
      return;
    }

    const handleConnect = () => {
      socket.emit("register_user", { userId });
      console.log("connected")
    };
    
    socket.on("connect", handleConnect);

    socket.on("registered_user", ({userId}) =>{
      console.log(`User ${userId} has joined`)
    })

    socket.on('join_receipt_room', ({ room }) => {
      const data = {
        room: room,
        role: "user"
      }
      console.log(data.room, data.role)
      socket.emit('request_join_receipt_room', data);
    });

    socket.on("show_receipt",(reciept) => {
      setReciept(reciept)
      console.log(reciept)
    }) 

    if(reciept) console.log(reciept)

      return () => {
        socket.off("connect", handleConnect);
        socket.off("registered_user");
        socket.off("join_receipt_room");
        socket.off("show_receipt");
      };
  }, [token]);

  useEffect(() => {
    if (reciept) {
      console.log("Receipt received:", reciept);
      setOpen(true);
    }
  }, [reciept]);

  const handleClose = () => {
    setOpen(false);
    setReciept(null);
  };

  return(<>
   <div style={{...flex, color: "black"}}>
      <HamburgerMenu></HamburgerMenu>
      <h1 style={{color : "black", fontSize: "35px"}}> Profile </h1>

      <div style={qrContainer}>
        <img style={{width:"100%"}} src={user?.qr_url} alt="" />
      </div>

        <Modal
          open={!!reciept}
          onClose={() =>  handleClose}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              width: 300
            }}
          >
            <div style={{color: "black"}}>
            <h2 style={{ marginTop: 0}}>Receipt</h2>
            <p><strong>Order:</strong> {reciept?.order_number}</p>
            <p><strong>Customer:</strong> {reciept?.user_name}</p>
            <p><strong>Vendor Business:</strong> {reciept?.business_name}</p>
            <p><strong>Vendor Name:</strong> {reciept?.vendor_name}</p>
            <p><strong>Title:</strong> {reciept?.reward_title}</p>
            <p><strong>Embers Spent:</strong> {reciept?.spent}</p>
            <p><strong>Remaining Price</strong> {reciept?.remaining_USD}</p>
            <button onClick={() => setReciept(null)}>Close</button>
            </div>
         </Box>
        </Modal>

      {  
         coupons?.length > 0 ? (
        <>
        <div style={flex}>
            <h2 style={{textAlign: "center"}}>Purchased Rewards</h2>

        <div style={{width:"100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "10px"}}>
          {coupons
          .filter((coupon) => {
            return coupon?.status === "pending"
          })
          .map((coupon, index) => (
          <Coupon
              key={coupon?.id} 
              order_number={coupon?.order_number}
              discount={coupon?.discount}
              first_name={user?.first_name}
              last_name={user?.last_name}
              reward_id={coupon?.reward_id}
              vendor_id={coupon?.vendor_id} 
              code={coupon?.code}  
          />
          ))}
        </div>
        </div>
      </>
      ) : (
        <div style={{color: "black"}}>
        <center>
          <h3>No Coupons Have Been Purchased Yet</h3>
        </center>
        </div>
      )}
    </div>
  </>)
}
const flex = {
  width:"100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const qrContainer = {
  width: 250,
  height: 250,
  border: "2px, solid, red",
  borderRadius: "5px",
}
export default ProfilePage