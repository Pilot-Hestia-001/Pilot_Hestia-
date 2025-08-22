import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import { useState, useContext } from "react"
import handleLogin from '../Utils/handleLogin';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Login = () => {
const navigate = useNavigate();
const [emailError, setEmailError] = useState(false);
const [emailErrorMessage, setEmailErrorMessage] = useState('');
const [passwordError, setPasswordError] = useState(false);
const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] =  useState([])
const [password, setPassword] =  useState([])
const [error, setError] = useState([])
const { login } = useContext(AuthContext)

const formData = {
    "email" : email,
    "password" : password,
}

const loginUser = async(formData) => {
    setError('');
   const valid = validateInputs()

   if(valid){  
     try {
        const data = await handleLogin(formData);
        localStorage.setItem("role", "user")

        setEmail("")
        setPassword("")
        login(data?.token)
        if(data)navigate("/")
    } catch (err) {
        console.error('login failed', err);
        setError('Incorrect email or password');
    }}
}

const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

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
                        error={emailError}
                        helperText={emailErrorMessage} 
                        label="your@email.com" 
                        variant="outlined" 
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        value={email}
                        color={emailError ? 'error' : 'primary'}
                    />
                <br/>
                    <TextField
                        id="outlined-password-input"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        color={passwordError ? 'error' : 'primary'}
                        slotProps={{
                            input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                      {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                             }
                      }}
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