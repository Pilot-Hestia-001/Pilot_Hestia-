import { useEffect, useState } from "react";
import axios from "axios";

const Coupon = ({discount, first_name, last_name, reward_id, vendor_id, code} ) => {

    const [vendor, setVendor] = useState(null)
    const [reward, setReward] = useState(null)
    const [totalCostPoints, setTotalCostPoints] = useState(null)
    const [totalCostUsd, setTotelCostUsd] = useState(null);
    console.log("Vendor_id:" + vendor_id)
    useEffect(() => {
        const fetchVendor = async () => {
          
          try {
            const res = await axios.get(`/api/vendor/id/${vendor_id}`);
            setVendor(res?.data)
          } catch (error) {
            console.log("No vendor found", error);
          }
        };
        fetchVendor();
    }, [])

    console.log("code:" + code)
    
    useEffect(() => {
        const fetchReward= async () => {
          
          try {
            const res = await axios.get(`/api/rewards/id/${reward_id}`);
            setReward(res?.data)
            const cost = res?.data.cost;

            const discountNum = discount
            const finalPrice =  (cost * (1 - discountNum/100)) / 100
            const emberPrice =  cost - (finalPrice * 100)

            setTotelCostUsd("$" + finalPrice)
            setTotalCostPoints(emberPrice)

          } catch (error) {
            console.log("No reward found", error.message);
          }
        };
        fetchReward();
    }, [])

 
      
   

  return(
    <div style={{...couponContainer, display:"flex", flexDirection:"row"}}>
        <div id="left-side" style={{...flex, width:"50%"}}>
            <h1>{discount}%</h1>

            <div style={{ ...flex, ...flexAlign, padding: 0}}>
                <h4 style={text}>Embers spent: </h4>
                <p style={text}>{totalCostPoints} Embers</p>
            </div>  

             

            <div style={{ ...flex, ...flexAlign, padding: 0}}>
                <h4 style={text}>Remaining USD:</h4>
                <p style={text}>{totalCostUsd}</p>
            </div>  

        </div>

        <div id="right-side" style={{...flex, width:"50%", gap: "0.5em"}}>
            <div style={{ ...flex, ...flexAlign}}>
                <h4 style={text}>Owner of Discount:</h4>
                <p style={text}>{first_name} {last_name}</p>
            </div>

            <div style={{ ...flex, ...flexAlign}} >
                <h4 style={text}>Item:</h4>
                <p style={text}>{reward?.title}</p>
            </div>

            <div style={{ ...flex, ...flexAlign}} >
                <h4 style={text}>Vendor:</h4>
                <p style={text}>{vendor?.business_name}</p>
            </div>

            <div>
                <h2 style={text}>Code:</h2>
                <h3 style={{...text, textAlign:"center", backgroundColor:"lightgrey" }}>{code}</h3>
            </div>
        </div>
    </div>
  )
}

const couponContainer = {
    width: "90%",
    border: "3px, dotted, red",
    padding: "1em"
}

const flex = {
  display:"flex", 
  flexDirection:"column", 
}

const flexAlign ={
 justifyContent:"flex-start", 
 alignItems:"flex-start",
 
}

const text = {
    margin: 0,
    padding: 0,
    textAlign: 'left',
    fontSize:17
}

export default Coupon