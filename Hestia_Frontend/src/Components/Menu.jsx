import * as React from 'react';
import Button from '@mui/material/Button';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import HotelClassOutlinedIcon from '@mui/icons-material/HotelClassOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import axios from 'axios';
import Points from "../Components/points"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;


const HamburgerMenu = () => {
    const { logout } = useContext(AuthContext)
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
    
    const handleLogout = async(link) => {
        try {
          const res = await axios.post(`${API_URL}/api/auth/logout`);
          if(!res) console.error("couldn't log out")
          logout()
          axios.defaults.headers.common['Authorization'] = '';
          navigate(link);
        } catch(error){
          console.log(error)
        }
    }
  
    return (
      <div id="nav" style={stickyBarStyle}>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
          {<DehazeIcon sx={{ color: 'white' }} />}
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
          <MenuItem onClick={() => handleClose("/member")}> <HandshakeOutlinedIcon fontSize='small'/>&ensp;Member</MenuItem>
          <MenuItem onClick={() => handleClose("/admin")}> <AdminPanelSettingsOutlinedIcon fontSize='small'/>&ensp;Admin</MenuItem>
          <MenuItem onClick={() => handleLogout("/login")} style={{"color" : "red"}}>Logout</MenuItem>
          </Menu>
        </div>
          <div>
          <Points></Points>
          </div>
        
      </div>
    );
}

const stickyBarStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: "#ff2400",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  justifyContent: "space-between", 
  padding: "10px",
  paddingRight: "25px",
};

export default HamburgerMenu;