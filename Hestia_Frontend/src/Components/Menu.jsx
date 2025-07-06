import * as React from 'react';
import Button from '@mui/material/Button';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import HotelClassOutlinedIcon from '@mui/icons-material/HotelClassOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const HamburgerMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (link) => {
      setAnchorEl(null);
      navigate(link);
    };
    
    const logout = async(link) => {
        try {
          const res = await axios.post("/api/auth/logout");
          if(!res) console.error("couldn't log out")
          console.log(res)
        
          navigate(link);
        } catch(error){
          console.log(error)
        }
    }
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
         {<DehazeIcon sx={{ color: 'black' }} />}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
         <MenuItem onClick={() => handleClose("/profile")}> <PersonOutlineOutlinedIcon fontSize='small'/>&ensp;Profile</MenuItem>
         <MenuItem onClick={() => handleClose("/")}><HomeOutlinedIcon fontSize='small'/>&ensp;Home</MenuItem>
         <MenuItem onClick={() => handleClose("/rewards")}> <HotelClassOutlinedIcon fontSize='small'/>&ensp;Rewards</MenuItem>
         <MenuItem onClick={() => handleClose("/vendorList")}> <HandshakeOutlinedIcon fontSize='small'/>&ensp;Member</MenuItem>
         <MenuItem onClick={() => logout("/login")} style={{"color" : "red"}}>Logout</MenuItem>
        </Menu>
      </div>
    );
}

export default HamburgerMenu;