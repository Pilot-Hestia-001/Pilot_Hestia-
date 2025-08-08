import HamburgerMenu from "../Components/Menu";
import { useEffect, useState, useContext} from "react";
import VendorSelectContext from "../context/VendorSelectContext";
import VendorCard from "../Components/VendorCard"
import RewardGrid from "../Components/RewardGrid";
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

const RewardsPage = () => {
   const [vendors, setVendors] = useState([]);
   const [selectedReward, setSelectedReward] = useState(null);
   const {selectedVendorId, setSelectedVendorId, handleVendorClick} = useContext(VendorSelectContext)

   const containerClass =
   "flex-container" + (vendors.length === 3 ? " three-items" : "");

   useEffect(() => {
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
     }, [])

     const handleCardClick = (reward) => {
      console.log("Reward selected:", reward);
      setSelectedReward(reward); // Save selected activity
    };


 return(
    <>
        <div style={flex}>
            <HamburgerMenu></HamburgerMenu>
            <div>

               <div style={{width: "100%" , display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <h1 style={{...headerStyle2, fontSize: "30px"}}>Purchase Rewards!</h1>
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

             <div style={{ ...flex, margin:0, padding: "1em"}}>
               <RewardGrid  
                  handleCardClick={handleCardClick} 
                  isSelected={selectedReward?.id}
                  id={selectedVendorId}
                  />
             </div>
           </div>
         </div>
    </>
 )
}

const headerStyle2 = {
   color: "#FF5F00",
 }

 const flex = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}
export default RewardsPage;