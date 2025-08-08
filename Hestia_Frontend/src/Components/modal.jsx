import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormatAlignJustify, Height } from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  color: "black",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
}
  const [passcode, setPasscode] = useState("")
  const { memberPasscodeValidationClick } = useContext(AuthContext)
  let role = localStorage.getItem("role")
  const [error, setError] = useState('');

    const handleSubmit = async () => {
    setError('');
    try {
        await memberPasscodeValidationClick(passcode);
        handleClose();
    } catch {
        setError('Invalid passcode. Please try again.');
    }
    };



  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600,}}>Unlock</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{  marginBottom: "10px"}} id="modal-modal-title" variant="h6" component="h2">
            Enter Passcode
          </Typography>
            
          <TextField onChange={(e) => setPasscode(e.target.value) } id="outlined-basic" label="passcode" variant="outlined" />

          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"12px", fontWeight: 600,}} >Submit</Button>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
                {error}
            </Typography>
            )}
        </Box>
      </Modal>
    </div>
  );
}