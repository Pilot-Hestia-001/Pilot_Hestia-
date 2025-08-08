import * as React from 'react';
import Button from '@mui/material/Button';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import SellIcon from '@mui/icons-material/Sell';
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

const VendorMenu = () => {
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
            onClose={() => handleClose()}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
          <MenuItem onClick={() => handleClose("/vendor/store")}><StoreIcon fontSize='small'/>&ensp;Store</MenuItem>
          <MenuItem onClick={() => handleClose("/vendor/rewards")}> <SellIcon fontSize='small'/>&ensp;Purchased Rewards</MenuItem>
          <MenuItem onClick={() => handleLogout("/vendor/login")} style={{"color" : "red"}}>Logout</MenuItem>
          </Menu>
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
};

export default VendorMenu;