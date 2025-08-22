import VendorMenu from "../Components/VendorMenu"
import RewardCode from "../Components/RewardCode"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import socket from "../Utils/socket"
import {jwtDecode} from "jwt-decode"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const API_URL = import.meta.env.VITE_API_URL;

const PurchasedRewards = () => {
    const [open, setOpen] = useState(false);
    const [rewards, setReward] = useState([])
    const [reciept, setReciept] =  useState(null)
    const seenIds = useRef(new Set());
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) return;
  
      let decoded;

      try {
        decoded = jwtDecode(token);
      } catch (e) {
        console.error("Invalid token", e);
        return;
      }
  
      const vendorId = decoded?.id;
  
      if (!vendorId) {
        console.warn("Vendor ID missing in token");
        return;
      }

      const handleConnect = () => {
        socket.emit("register_vendor", { vendorId });
      };
      
      socket.on("connect", handleConnect);

      socket.on("registered_vendor", ({vendorId}) =>{
      console.log("connected", vendorId)
      
      })

      socket.on("new_coupon", (coupon) => {
        if (seenIds.current.has(coupon?.order_number)) return;
        seenIds.current.add(coupon?.order_number);
        console.log("live coupon:", coupon)
        setReward(prev => [...prev, coupon]);
      });

      socket.on('join_receipt_room', ({ room }) => {
        const data = {
          room: room,
          role: "vendor"
        }
        socket.emit('request_join_receipt_room', data);
      });

      socket.on("show_receipt", (reciept) => {
        setReciept(reciept)
        console.log(reciept)
      }) 
  
      // Cleanup
      return () => {
        socket.off("connect", handleConnect);
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

    useEffect(() => {
      if (!token || reciept !== null) return;
      
        const fetchData = async () => {
          try {
            const couponsRes = await axios.get(`${API_URL}/api/rewards/vendor/coupon`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setReward(couponsRes?.data);
            console.log("coupons", couponsRes?.data)
          } catch (e) {
            console.log("Error fetching profile data:", e);
          }
        };
      
        fetchData();
      }, [token, reciept]);

   return(
    <div style={container}>
    <VendorMenu />
    <h1 style={{color:"black", textAlign:'center', fontSize: 32}}>Discounted Rewards</h1>
     
     <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>

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
            <div style={{ marginTop: 0, color: "black" }}>
            <h2 style={{ marginTop: 0, color: "black" }}>Receipt</h2>
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
            rewards?.filter((reward) => reward.status === "pending") 
            .map((reward, idx) => (
                <RewardCode 
                    key={idx}
                    order_number={reward?.order_number}
                    first_name={reward?.first_name}
                    last_name={reward?.last_name}
                    title={reward?.reward_title}
                    size={reward?.size}
                    discount={reward?.discount}
                    cost={reward?.cost}
                />
            ))
        }

     </div>



    </div>
   )
}

const container = {
    width: "100vw",
}
export default PurchasedRewards