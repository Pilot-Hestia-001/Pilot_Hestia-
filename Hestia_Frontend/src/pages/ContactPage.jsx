import HamburgerMenu from "../Components/Menu";
import { useState } from "react";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from  '@mui/material/Button'
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ContactPage = () => {
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [firstName, setFirstName] =  useState("")
    const [lastName, setLastName] =  useState("")
    const [email, setEmail] =  useState("")
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState("");

    const [formError, setFormError] = useState("");

  const validateEmail = (email) => {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const submitContact = async({ firstName, lastName, email, message }) => {
    let valid = true;

    // Reset previous errors
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setMessageError(false);
    setFormError("");

    // Validate fields
    if (!firstName.trim()) {
      setFirstNameError(true);
      setFirstNameErrorMessage("First name is required");
      valid = false;
    }

    if (!lastName.trim()) {
      setLastNameError(true);
      setLastNameErrorMessage("Last name is required");
      valid = false;
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage("Valid email is required");
      valid = false;
    }

    if (!message.trim()) {
      setMessageError(true);
      setMessageErrorMessage("Message cannot be empty");
      valid = false;
    }

    if (!valid) return;

    // Submit form (replace with your API call)
    try {
        const res = await axios.post(`${API_URL}/api/contact`, {
          firstName,
          lastName,
          email,
          message
        });
        
        if (res.data.success) {
          alert('Message sent!');
          setFirstName('');
          setLastName('');
          setEmail('');
          setMessage('');
        }
      } catch (e) {
        console.error("Failed to send message", e);
        alert('Failed to send message.');
      }
  };


    return( 
        <div id="superContainer" style={containerStyle1}>
            <HamburgerMenu></HamburgerMenu>

            <h1>Contact Us!</h1>

            <div style={containerStyle2}>
            <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
                
                <TextField 
                    id="first-name"
                    label="First Name"
                    variant="outlined" 
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    fullWidth
                    error={firstNameError}
                    helperText={firstNameError ? firstNameErrorMessage : ""}
                    sx={{ mb: 2 }}
                />

                <TextField 
                    id="last-name"
                    label="Last Name"
                    variant="outlined" 
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    fullWidth
                    error={lastNameError}
                    helperText={lastNameError ? lastNameErrorMessage : ""}
                    sx={{ mb: 2 }}
                />

                <TextField 
                    id="email"
                    label="Email"
                    variant="outlined" 
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    value={email}
                    fullWidth
                    error={emailError}
                    helperText={emailError ? emailErrorMessage : ""}
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    fullWidth
                    error={messageError}
                    helperText={messageError ? messageErrorMessage : ""}
                    sx={{ mb: 2 }}
                />

                <Button 
                    variant="contained"
                    sx={{color:"white", backgroundColor: '#ff2400', mb: 1}}
                    onClick={() => submitContact({ firstName, lastName, email, message })}>
                    Submit
                </Button>

                {formError && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {formError}
                    </p>
                )}
            </Box>
        </div>

        </div>
    )
}
export default ContactPage

const containerStyle1 = {
    position: "relative",
    width: "100%",
    overflowX: "hidden",
    display: "flex",
    color: "black",
    flexDirection: 'column',
    alignItems: "center",
    margin: 0
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