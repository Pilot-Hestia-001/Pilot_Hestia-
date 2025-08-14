import axios from 'axios';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import handleRegister from "../Utils/handleRegister"
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { BorderColor } from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';



const Register = () => {
    const navigate = useNavigate();
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [first_name, setFirst_name] =  useState("")
    const [last_name, setLast_name] =  useState("")
    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")
    const [error, setError] = useState("")
    const { login } = useContext(AuthContext)

    const formData = {
        "first_name" : first_name,
        "last_name" : last_name,
        "email" : email,
        "password" : password,
    }
    
    const createUser = async () => {
        setError('');
        const valid = validateInputs()
        
        if(valid){
            try {
                const data = await handleRegister(formData);
                login(data?.token)
                
                setEmail("")
                setPassword("")
                setFirst_name("")
                setLast_name("")
                if(data)navigate("/")
            } catch (err) {
                console.error('Registration failed', err);
                setError(err.response?.data?.message);
            }
        }
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

        if (!first_name) {
            setFirstNameError(true);
            setFirstNameErrorMessage('Please enter your first name.');
            isValid = false;
          } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
          }

          if (!last_name) {
            setLastNameError(true);
            setLastNameErrorMessage('Please enter your last name.');
            isValid = false;
          } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
          }
    
        return isValid;
      };
    


return(
    <div style={containerStyle1}>
        <div>
            <h1 style={{...headerStyle, fontSize: "30px", margin: 0}}>
              Register an Account
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
                    error={firstNameError}
                    helperText={firstNameErrorMessage} 
                    label="First Name" 
                    variant="outlined" 
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                    color={firstNameError ? 'error' : 'primary'}
                />
            <br/>
            <TextField 
                    id="outlined-basic" 
                    error={lastNameError}
                    helperText={lastNameErrorMessage} 
                    label="Last Name" 
                    variant="outlined" 
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                    color={lastNameError ? 'error' : 'primary'}
                />
            <br/>
                <TextField 
                    id="outlined-basic" 
                    error={emailError}
                    helperText={emailErrorMessage} 
                    label="Email" 
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
                    onClick={() => createUser()}>
                    Submit
                </Button>

                <Button 
                    size="small"
                    sx={{color:"#ff2400"}}
                    onClick={() => navigate("/login")}>
                    Log in
                </Button>
              
                {error && (
                    <p style={{ color: 'red' }}>
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

export default Register