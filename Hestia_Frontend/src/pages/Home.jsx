import GoalBar from "../Components/GoalBar";
import HamburgerMenu from "../Components/Menu";
import VendorCard from "../Components/VendorCard"
import RewardCarousel from "../Components/RewardCarousel";
import { useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import VendorSelectContext from "../context/VendorSelectContext";
import headerBackground from "../Photos/HeaderBackground.jpeg"
import axios from "axios"
import Button from '@mui/material/Button';
import "../CSS/VendorCard.css";
import ActivityCard from "../Components/ActivityCard";
import NonUserMenu from "../Components/NonUserMenu"
const API_URL = import.meta.env.VITE_API_URL;


const Home = () => {
   const navigate = useNavigate();
   const [vendors, setVendors] = useState([]);
   const [activities, setActivities] = useState([])
   const {selectedVendorId, setSelectedVendorId, handleVendorClick} = useContext(VendorSelectContext)
   const [logged, setLogged] = useState(localStorage.getItem("loggedIn"))
   

   useEffect(() => {
       
       if(logged){

       const fetchVendors = async () => {
         try {
           const res = await axios.get(`${API_URL}/api/vendor/all`);
            
            if(res.data) {
              const vendorList = res.data;
              setVendors(vendorList);
              setSelectedVendorId((prevId) => prevId || vendorList[0]?.id);
            }

         } catch (error) {
           console.log("No vendors received", error);
         }
       };

        fetchVendors();
      }
       
     }, [])

     useEffect(() => {

      if(logged){
      const fetchActivities = async () => {
        try{
          const res = await axios.get(`${API_URL}/api/activities/retrieve`)
          const activityList = res?.data
          setActivities(activityList)
          console.log(activities)
        } catch(e) {
          console.log("couldn't fetch activities")
        }
      }

      fetchActivities();
      }
     }, [])

   const containerClass =
   "flex-container" + (vendors.length === 3 ? " three-items" : "");

   return( 
      <div id="superContainer" style={containerStyle1}>

          { logged ?
             <HamburgerMenu></HamburgerMenu>
            :
            <NonUserMenu></NonUserMenu>
            }

        
          <div style={containerStyle2}>
               
            <div style={heroContentStyle}>
               <h2 style={headerStyle}>Earn Points. Get Rewards. Power Your Community.</h2>
               <h5 style={subHeaderStyle}>Join activities, scan QR codes, and redeem discounts at local vendors.</h5>

          { logged ?
              <>
                
                <Button onClick={() => navigate('/profile')} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600, }}>Profile</Button>
                <h5 style={subHeaderStyle} >Check out your profile!</h5>
              </>
            :
              <>
                 <Button onClick={() => navigate('/register')} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600, }}>Register</Button>
                 <h5 style={subHeaderStyle} >Register Your Account!</h5>
              </>
            }
              
            </div>

            
          </div>

            <div style={{ width: "90%",marginTop: "1em"}}>
               <GoalBar />
            </div>


          <div>
          <div style={{width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1 style={{...headerStyle2, fontSize: "30px"}}>Meet the Vendors...</h1>
          </div>

        <div className={containerClass}>
        {vendors.map((vendor) => (
         <VendorCard 
            key={vendor?.id} 
            img={vendor?.img} 
            business_name={vendor?.business_name}
            onClick={() => handleVendorClick(vendor?.id)}
            isSelected={selectedVendorId === vendor?.id}
         />
         ))}
        </div>

        <div style={{width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1 style={{...headerStyle2, fontSize: "20px"}}>And Their Rewards!</h1>
          </div>

        <div style={{padding: "10px"}}>
           <RewardCarousel id = {selectedVendorId} />
        </div>
        <br />
        </div>

        <div style={{width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1 style={{...headerStyle2, fontSize: "30px"}}>See what's happening!</h1>
          </div>

        <div style={{width:"100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "10px"}}>
        {activities.map((activity, index) => (
         <ActivityCard
            key={activity?.id} 
            title={activity?.title}
            description={activity?.description}
            cost={activity?.cost}
            img={activity?.img} 
            num={index + 1}  
         />
         ))}
        </div>
      </div>
   )
  }

  const containerStyle1 = {
     position: "relative",
     width: "100%",
     overflowX: "hidden",
     display: "flex",
    //  backgroundImage: "linear-gradient(to bottom, white 0%, white 40%, orange 100%)",
     color: "black",
     flexDirection: 'column',
     alignItems: "center",
     margin: 0
   };

  const headerStyle = {
    margin: 0, 
    fontSize: 30, 
    lineHeight: 1,
    color: "white",
    textShadow: `
    -1px -1px 0 #FF5F00,  
     1px -1px 0 #FF5F00,
    -1px  1px 0 #FF5F00,
     1px  1px 0 #FF5F00
  `,
  }

  const headerStyle2 = {
    color: "#FF5F00",
  }

  const subHeaderStyle = {
    margin: 0, 
    fontSize: 17,
    lineHeight: 1,
    color: "white",
    textShadow: `
    -1px -1px 0 #FF5F00,  
     1px -1px 0 #FF5F00,
    -1px  1px 0 #FF5F00,
     1px  1px 0 #FF5F00
  `,
  }

   const containerStyle2 = {
      position: "relative",
      margin: "0 auto",
      display: "flex",
      color: "White",
      padding: "10px",
      gap: '15em',
      flexDirection: 'column',
      backgroundColor: "white", // fallback color
      backgroundImage: `url(${headerBackground})`, // ✅ Your image path here
      backgroundSize: "cover", // scale image to fill container
      backgroundPosition: "center", // center the imag
      alignItems: "center",
    };

    const heroContentStyle = {
      marginTop: "2em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "8px",
      padding: "10px",
    };
   
  
  export default Home
  //Should Introduce the app
  //The page should have the goal
  //The page should show the vendors 
  //A few of the rewards
  //The page should show a list of Activitys