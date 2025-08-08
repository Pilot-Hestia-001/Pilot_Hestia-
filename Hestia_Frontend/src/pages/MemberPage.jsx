import Lock from "../Components/Lock"
import AuthContext from '../context/AuthContext';
import HamburgerMenu from "../Components/Menu";
import { useContext, useState } from "react";
import QrScanner from "../Components/QrScanner";
import ActivityForm from "../Components/ActivityForm";
import RewardForm from "../Components/RewardsForm";
import Button from '@mui/material/Button';


const MemberPage = () => {

  const {isMember} = useContext(AuthContext)
  const [selectedForm, setSelectedForm] = useState(true)

  const handleSelectedForm = (formType) =>{
   if(formType === "reward"){
      setSelectedForm(false)
   } else{
      setSelectedForm(true)
   }
  }

 return(
   <>
   {
     isMember ?
      
      <div style={containerStyle1}>
         <HamburgerMenu />

         <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Scan</h1>
            
            <div>
               <QrScanner></QrScanner>
            </div>
         </div>

         <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>

         <h1>Create</h1>

         <div style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap:"1em"}}>
               <Button onClick={() => handleSelectedForm("activity")} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:".3em", fontWeight: 600, }}>Activity</Button>
               <p1>or</p1>
               <Button onClick={() => handleSelectedForm("reward")} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:".2em", fontWeight: 600, }}>Reward</Button>
         </div>

         </div>
        {
         selectedForm ?
         <ActivityForm></ActivityForm>
         :
         <RewardForm></RewardForm>
        }

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

export default MemberPage;