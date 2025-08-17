import Lock from "../Components/Lock"
import AuthContext from '../context/AuthContext';
import TotalPointsContext from "../context/TotalPointsContext"
import HamburgerMenu from "../Components/Menu";
import Button from '@mui/material/Button';
import { useContext, useState } from "react";
import socket from "../Utils/socket"
import RaffleModal from "../Components/RaffleModal"

const AdminPage = () => {
    const {isAdmin} = useContext(AuthContext)
    const {context} = useContext(TotalPointsContext)
    

 return(
    <>
    {
        isAdmin ?
         
         <div style={containerStyle1}>
            <HamburgerMenu />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RaffleModal 
                disabled={context.isGoalReached} 
                />
             </div>
        </div>
           
         :
         <div>
             <Lock />
         </div>
      }
      </>
 )
}

const containerStyle1 = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
    margin: "0 auto",
    display: "flex",
    color: "black",
    flexDirection: 'column',
    alignItems: "center",
    gap: "2em"
  };
 

export default AdminPage