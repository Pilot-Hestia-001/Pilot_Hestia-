import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import { useState } from "react"
import handleLogin from '../Utils/handleLogin';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from "../Components/Menu";

const Login = () => {
const navigate = useNavigate();

const [email, setEmail] =  useState([])
const [password, setPassword] =  useState([])
const [error, setError] = useState([])

const formData = {
    "email" : email,
    "password" : password,
}

const loginUser = async(formData) => {
    setError('');
        
    try {
        const data = await handleLogin(formData);
        localStorage.setItem('token', data.token);
        
        setEmail("")
        setPassword("")
        if(data)navigate("/home")
      } catch (err) {
        console.error('login failed', err);
        setError(err.message || 'Log in failed');
      }
}

    return(
        <div style={containerStyle1}>
               <div>
                    <h1 style={{...headerStyle, fontSize: "30px", margin: 0}}>
                        Log In to Your Account
                    </h1>

                    <center>
                        <h3 style={{...headerStyle, margin: 0}}>
                            Enter the Block Party
                        </h3>
                     </center>
               </div>
                

            <div style={containerStyle2}>
                <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
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
                        onClick={() => loginUser(formData)}>
                        Submit
                    </Button>

                    <Button 
                        size="small"
                        sx={{color:"#ff2400"}}
                        onClick={() => navigate("/register")}>
                        Register
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
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderWidth: "3px",
    borderColor: "#ff2400",
    width: '300px',
  }


const headerStyle = {
    color: "white",
    textShadow: `
    -1px -1px 0 #ff2400,  
     1px -1px 0 #ff2400,
    -1px  1px 0 #ff2400,
     1px  1px 0 #ff2400
  `,
  }
   
   export default Login 