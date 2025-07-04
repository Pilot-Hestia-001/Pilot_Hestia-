import axios from 'axios';
import Box from '@mui/material/Box'
import handleNavigate from "../Utils/handleNavigate"
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import { useState } from "react"
import handleRegister from '../Utils/handleRegister';


const Register = () => {
   
    const [first_name, setFirst_name] =  useState([])
    const [last_name, setLast_name] =  useState([])
    const [email, setEmail] =  useState([])
    const [password, setPassword] =  useState([])
    const [error, setError] = useState([])

    const formData = {
        "first_name" : first_name,
        "last_name" : last_name,
        "email" : email,
        "password" : password,
    }

    const createUser = async () => {
        setError('');
        
        try {
            const data = await handleRegister(formData);
            localStorage.setItem('token', data.token);
            
            setEmail("")
            setPassword("")
            setFirst_name("")
            setLast_name("")
      
            handleNavigate("/")
          } catch (err) {
            console.error('Registration failed', err);
            setError(err.response?.data?.message || 'Registration failed');
          }
       
    }


return(
    <div style={containerStyle1}>
        <div>
            <h1>
              Register an Account
            </h1>
            <center>
            <h3>
            Welcome to the Block Party!
            </h3>
            </center>
        </div>

        <div style={containerStyle2}>
            <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
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
                    onClick={() => createUser()}>
                    Submit
                </Button>

                <Button 
                    size="small"
                    onClick={() => handleNavigate("/login")}>
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
display: "flex",
gap: '50px',
flexDirection: 'column',
justifyContent: "center",
alignItems: "center",
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
boxShadow: '0 0 10px rgba(0,0,0,0.1)',
width: '300px',
}

export default Register