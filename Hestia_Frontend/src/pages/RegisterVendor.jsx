import axios from 'axios';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import handleRegisterVendor from "../Utils/handleRegisterVendor"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BorderColor } from '@mui/icons-material';


const RegisterVendor = () => {

    const navigate = useNavigate();
   
    const [business_name, setBusiness_name] = useState("")
    const [first_name, setFirst_name] =  useState("")
    const [last_name, setLast_name] =  useState("")
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")
    const [error, setError] = useState("")

    const formData = {
        "business_name" : business_name,
        "first_name" : first_name,
        "last_name" : last_name,
        "email" : email,
        "password" : password,
    }

    const createVendor = async () => {
        setError('');
        
        try {
            const data = await handleRegisterVendor(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem("role", "vendor")
            setBusiness_name("")
            setEmail("")
            setPassword("")
            setFirst_name("")
            setLast_name("")
            console.log("data: "+ data)
            if(data)navigate("/vendor/store")
          } catch (err) {
            console.error('Registration failed', err);
            setError(err.response?.data?.message);
          }
    }

return(
    <div style={containerStyle1}>
        <div>
            <h1 style={{...headerStyle, fontSize: "30px", margin: 0}}>
                Register Your Business
            </h1>
            <center>
            <h3 style={{...headerStyle,margin: 0}}>
                Welcome to the Block Party!
            </h3>
            </center>
        </div>

        <div style={containerStyle2}>
            <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
            <TextField 
                    id="outlined-basic" 
                    label="Business Name" 
                    variant="outlined" 
                    onChange={(e) => setBusiness_name(e.target.value)}
                    value={business_name}
                />
            <br/>
            <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                />
            <br/>
            <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                />
            <br/>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            <br/>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
             <br/>
                <Button 
                    variant="contained"
                    sx={{color:"white", backgroundColor: '#ff2400'}}
                    onClick={() => createVendor()}>
                    Submit
                </Button>

                <Button 
                    size="small"
                    sx={{color:"#ff2400"}}
                    onClick={() => navigate("/vendor/login")}>
                    Log in
                </Button>
              
                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </p>
                )}
            </Box>
        </div>
    </div>
)
}

    const containerStyle1 = {
        position: "relative",
        width: "100vw",
        height: "100vh",
        margin: "0 auto",
        color: "white",
        display: "flex",
        gap: '50px',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5F00",
    };

    const containerStyle2 = {
        position: "relative",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const box = {
        display: 'flex',
        flexDirection: 'column', 
        gap: '5px',              
        padding: '32px',
        background: '#fff',
        borderRadius: '8px',
        borderWidth: "3px",
        borderColor: "#ff2400",
        width: '300px',
    }

    const headerStyle = {
        textShadow: `
        -1px -1px 0 #ff2400,  
        1px -1px 0 #ff2400,
        -1px  1px 0 #ff2400,
        1px  1px 0 #ff2400
    `,
    }

export default RegisterVendor