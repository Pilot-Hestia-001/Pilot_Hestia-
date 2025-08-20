
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import BasicSelect from './Select';
import { useState, useEffect} from 'react';
import { useAnimatedNumber } from "../Utils/animatePoints";
import { useNavigate } from 'react-router-dom';
import Coupon from './Coupon'
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  color: "black",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
};

const ItemPurchaseModal = ({id, img, rewardTitle, quantity, cost, usdPrice, vendor_id }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [points, setPoints] = useState(null)
    const [totalCostPoints, setTotalCostPoints] = useState(null)
    const [totalCostUsd, setTotelCostUsd] = useState(`$${usdPrice}`);
    const [selectedSize, setSelectedSize] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [code, setCode] = useState(null)
    const [order_number, setOrderNum] = useState(null)
    const [paid, setPaid] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setPaid(false)
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
      setSelectedSize(null)
      setTotalCostPoints(null)
      setTotelCostUsd(`$${usdPrice}`)
  }

  const token = localStorage.getItem("token");

  const finalPoints = totalCostPoints ? points - totalCostPoints : points;
  const animatedPoints = useAnimatedNumber(finalPoints);


  useEffect(() => {
    const fetchUser = async () => {
      try{
        const res = await axios.get(`${API_URL}/api/user/me`,{ 
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(res?.data){
            setUser(res?.data)
        }
      } catch(e) {
        console.log("couldn't fetch user", e)
      }
    }

    fetchUser();
   }, [])

  useEffect(() => {
    const fetchActivities = async () => {
      try{
        const res = await axios.get(`${API_URL}/api/points/`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
         });
        const points = res?.data
        setPoints(points)
       
      } catch(e) {
        console.log("couldn't fetch points")
      }
    }

    fetchActivities();
   }, [])
    
  
    const [error, setError] = useState('');
  
      const handleSubmit = async () => {
        
          let reward_id = id
          let size = selectedSize
          let cost = totalCostPoints
         
          console.log(discount)
         try{
            let res = await axios.put(`${API_URL}/api/rewards/purchase`, {reward_id, size, cost, discount } , {
              headers: {
                Authorization: `Bearer ${token}`
              },
            });
            setPaid(true)
            setCode(res?.data.code)
            setOrderNum(res?.data.order_number)
            console.log(res?.data)
         } catch(e){
            console.log("error ocurred", e)
         }
      };

      const handleChange = (size) => {
        setSelectedSize(size)
      }

      const handleClick = (val) => {
          const discountNum = Number(val)
          const finalPrice =  (cost * (1 - discountNum/100)) / 100
          const emberPrice =  cost - (finalPrice * 100)
          setDiscount(discountNum)
          setTotelCostUsd("$" + finalPrice)
          setTotalCostPoints(emberPrice)
      }

    return (
      <div>
        <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600,}}>View</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
           
            { !paid ? (
              <>
              <div id="full-containter" style={{width:"100%", display:"flex", flexDirection: "row", gap:"3em",}}>
                <div id="left-container" style={{...flexCol, justifyContent:"start"}}>
                    <img src={img} alt="" style={{maxWidth:150}} />

                     <div style={{...flexCol, justifyContent:"center"}}>
                        
                     <p style={title}>{rewardTitle}</p>

                     <p>Quantity: {quantity}</p>
                     <BasicSelect handleChange={handleChange}/>
                     </div>
                </div>
                <div id="right-container" style={{...flexCol, width:"100%"}}>
                    <div style={{ marginTop: "auto"}}>
                <Box sx={{ width: "100%", ...flexCol }}>
                <Typography sx={{ width: "100%" , marginLeft: "auto", textAlign: "center", fontSize: 25, marginBottom: "10px"}} id="modal-modal-title" variant="h8" component="h2">
                  Purchase a Discount!
                </Typography>
                    <Grid container rowSpacing={2} columnSpacing={{ xs:12, sm: 8, md: 8 }}>
                        <Grid size={3}>
                            <div>
                                <Button 
                                disabled={!selectedSize}
                                variant="contained"
                                name="10"
                                sx={button}
                                onClick={(event) => handleClick(event.target.name)}
                                >10%</Button>
                            </div>
                            
                        </Grid>
                        <Grid size={3}>
                             <div>
                                <Button 
                                disabled={!selectedSize}
                                variant="contained"
                                name="20"
                                sx={button}
                                onClick={(event) => handleClick(event.target.name)}
                                >20%</Button>
                            </div>
                            
                        </Grid>
                        <Grid size={3}>
                            <div>
                                <Button 
                                disabled={!selectedSize}
                                variant="contained"
                                name="50"
                                sx={button}
                                onClick={(event) => handleClick(event.target.name)}
                                >50%</Button>
                            </div>
                            
                        </Grid>
                        <Grid size={3}>
                            <div>
                             <Button 
                                disabled={!selectedSize}
                                variant="contained"
                                name="100" 
                                sx={button}
                                onClick={(event) => handleClick(event.target.name)}
                                >100%
                            </Button>
                            </div>
                            
                        </Grid>
                    </Grid>   
                </Box>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                    <h1 style={{...title, color: animatedPoints <= 0 ? "red": "black"}}>Ember Balance: {animatedPoints}</h1>
                    <h1 style={title}>USD Cost: {totalCostUsd} </h1>
                    <h1 style={title}>Embers Cost: {totalCostPoints}</h1>
                </div>
                </div>
            </div>
              
     
            <Button disabled={!discount} onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"2em", fontWeight: 600,}}> Pay {totalCostPoints}</Button>
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                  {error}
              </Typography>
              )}

            </>
            ):(
              <>
              <div style={{...flexCol, textAlign: "center"}}>
                <h3>Your Discount Has Been Purchased!</h3>
                <Coupon
                  order_number={order_number}
                  discount={discount}
                  first_name={user?.first_name}
                  last_name={user?.last_name}
                  reward_id={id}
                  title={rewardTitle}
                  vendor_id={vendor_id}
                  code={code}
                />
                <Button onClick={() => navigate('/profile')} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600, }}>Profile</Button>
                <p1>Please head to your profile to see all purchased rewards!</p1>
              </div>
              </>
             )}
          </Box>
        </Modal>
      </div>
    );
  }
const button = {
    backgroundColor:'#ff2400', 
    color: 'white',
    marginTop:"10px", 
    fontWeight: 600,
}
  const title = {
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    lineHeight: "1.1",
    fontSize:"15px", 
    fontWeight:"bold",
  
  }

  const flexCol = {
    display:"flex", flexDirection: "column"
  }

  export default ItemPurchaseModal;