import GoalBar from "../Components/GoalBar";
import HamburgerMenu from "../Components/Menu";
import VendorCard from "../Components/VendorCard"
import { useEffect, useState, useContext} from "react";
import VendorSelectContext from "../context/VendorSelectContext";
import axios from "axios"
import "../CSS/VendorCard.css";



const Home = () => {
   const [vendors, setVendors] = useState([]);
   const {selectedVendorId, setSelectedVendorId, handleVendorClick} = useContext(VendorSelectContext)
   console.log(selectedVendorId)
   

   useEffect(() => {
       const fetchVendors = async () => {
         try {
           const res = await axios.get("/api/vendor/all");
           console.log(res.data);
           setVendors(res.data)
           setSelectedVendorId(res.data[0]?.id)

         } catch (error) {
           console.log("No vendors received", error);
         }
       };
   
       fetchVendors();
     }, [])


   const containerClass =
   "flex-container" + (vendors.length === 3 ? " three-items" : "");

   return(
      <>
      <div id = "container" style={containerStyle1}>
   
          <div style={containerStyle2}>
            <div style={{"position": "absolute", "top": "5px", "left" : "10px"}}>
               <HamburgerMenu></HamburgerMenu>
               </div>
               
            <div style={{
                  marginTop: "10%",
                  marginLeft: "10%",
                  display: "flex", 
                  flexDirection: "column",
                  alignItems:"center"
               }}>
               <h2 style={{margin: 0, fontSize: 25}}>Earn Points. Get Rewards. Power Your Community.</h2>
               <h5 style={{margin: 0}}>Join activities, scan QR codes, and redeem discounts at local vendors.</h5>
            </div>

            <div >
               <GoalBar />
            </div>
          </div>
        

        <div className={containerClass}>
        
        {vendors.map((vendor) => (
         <VendorCard 
            key={vendor?.id} 
            img={vendor?.img} 
            business_name={vendor?.business_name}
            onClick={() => handleVendorClick(vendor?.id)}
            isSelected={selectedVendorId === vendor.id}
         />
         ))}
            
        </div>

        <div>

        </div>
      </div>
      </>
   )
  }

  const containerStyle1 = {
     position: "relative",
     width: "100vw",
     height: "100vh",
     margin: "0 auto",
     display: "flex",
     backgroundImage: "linear-gradient(to bottom, white 0%, white 40%, orange 100%)",
     color: "black",
     gap: '30px',
     flexDirection: 'column',
     alignItems: "center",
   };

   const containerStyle2 = {
      position: "relative",
      margin: "0 auto",
      display: "flex",
      color: "black",
      gap: '30px',
      flexDirection: 'column',
      backgroundColor: "white", // fallback color
      alignItems: "center",
    };
   
  
  export default Home
  //Should Introduce the app
  //The page should have the goal
  //The page should show the vendors 
  //A few of the rewards
  //The page should show a list of Activitys