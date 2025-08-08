import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import socket from '../Utils/socket'
const API_URL = import.meta.env.VITE_API_URL;

const RewardCode = ({order_number, first_name, last_name, title, size, discount, cost}) => {
    const [passcode, setPasscode] = useState(null)
    const price =  (cost * (1 - discount/100)) / 100

    const handleSubmit = async() => {

        try{
            const res = await axios.put(`${API_URL}/api/rewards/redeem`, {code: passcode})
            console.log(res?.message)
        } catch(e) {
            console.log("error:", e.message)
        }
    }

    return(
        <div style={container}>
            <div style={flexAlign}> 
                <h3 style={orderText}>Order: #{String(order_number).padStart(3, '0')}</h3>

                <div style={flex}>
                    <h3 style={text}>Name:</h3>
                    <p style={text}>{first_name} {last_name}</p>
                </div>

                <div style={flex}>
                    <h3 style={text}>Item:</h3>
                    <p style={text}>{title}</p>
                </div>

                <div>
                    <div style={flex}>
                        <h3 style={text}>Discounted Price:</h3>
                        <p style={text}>${price}</p>
                    </div>

                    <div style={flex}>
                        <h3 style={text}>Size: </h3>
                        <p style={text}>{size?.toUpperCase()}</p>
                    </div>
                </div>
            </div>

            

            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <TextField 
                    onChange={(e) => setPasscode(e.target.value) } 
                    id="outlined-basic" 
                    label="code" 
                    variant="outlined" 
                    />

                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{ backgroundColor: '#ff2400', 
                        color: 'white',
                        marginTop:"12px", 
                        fontWeight: 600,}}
                    >Submit</Button>
            </div>

            
         </div>
    )
}

const container = {
    width: 250,
    borderRadius: "5px",
    color: "black",
    padding: 15,
    border: '3px solid #FF5F00',
    radius: "15px",
    marginBottom: "1rem"
}

const flex = {
  display:"flex", 
  flexDirection:"row", 
  gap:"2px"
}

const flexAlign = {
    justifyContent:"flex-start", 
    alignItems:"flex-start",
    fontSize: 25,
    marginTop: 0,
    marginBottom: 10,
    padding: 0
   }

const text = {
    margin: 0,
    padding: 0,
    textAlign: 'left',
    fontSize:17
   }
const orderText = {
    marginTop: 0,
    marginBottom: 5,
    padding: 0,
    textAlign: 'center',
    fontSize:20

   }

const numFlex = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2rem"
}

export default RewardCode