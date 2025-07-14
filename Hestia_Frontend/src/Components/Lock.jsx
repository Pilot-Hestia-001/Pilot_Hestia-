import HamburgerMenu from "../Components/Menu";
import LockIcon from '@mui/icons-material/Lock';
import BasicModal from "../Components/modal";
import Button from '@mui/material/Button';


const Lock = () => {
    return(
    <div style={containerStyle}>
    <div style={{"position": "absolute", "top": "5px", "left" : "10px"}}>
         <HamburgerMenu></HamburgerMenu>
      </div>

      <h1 style={{fontSize: "20px"}}>This page is for members only</h1>
      <LockIcon fontSize="large" sx={{ marginTop:"10px"}}></LockIcon>
      <BasicModal></BasicModal>
      
 </div>
    )
}

const containerStyle = { 
    minHeight: '100vh', // full viewport height
    width: '100%',
    display: 'flex',
    color: "white",
    flexDirection: 'column', // stack children vertically
    alignItems: 'center', // horizontal centering
    justifyContent: 'center', // or 'center' for vertical centering
    padding: '10px',
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, rgba(255,127,50,0.95), rgba(230,92,0,0.9))'

}

export default Lock;