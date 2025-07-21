import HamburgerMenu from "../Components/Menu";
import Coupon from "../Components/Coupon";
import { useState, useEffect  } from "react"
import axios from "axios"

const ProfilePage= () => {

  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState(null)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);
  
        const couponsRes = await axios.get("/api/rewards/coupon", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCoupons(couponsRes.data);
        console.log("coupons", couponsRes.data)
      } catch (e) {
        console.log("Error fetching profile data:", e);
      }
    };
  
    fetchData();
  }, []);

  return(<>
   <div style={{...flex, color: "black"}}>
      <HamburgerMenu></HamburgerMenu>
      <h1 style={{color : "black", fontSize: "35px"}}> Profile </h1>

      <div style={qrContainer}>
        <img style={{width:"100%"}} src={user?.qr_url} alt="" />
      </div>
      {  
         coupons ? (
        <>
        <div style={flex}>
            <h2 style={{textAlign: "center"}}>Purchased Rewards</h2>

        <div style={{width:"100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: "10px"}}>
          {coupons.map((coupon, index) => (
          <Coupon
              key={coupon?.id} 
              discount={coupon?.discount}
              first_name={user?.first_name}
              last_name={user?.last_name}
              reward_id={coupon?.reward_id}
              vendor_id={coupon?.vendor_id} 
              code={coupon?.code}  
          />
          ))}
        </div>
        </div>
     

      </>

      ) : (
    <>
    <h3></h3>
    </>
      )}
      

    </div>
  </>)
}
const flex = {
  width:"100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const qrContainer = {
  width: 250,
  height: 250,
  border: "2px, solid, red",
  borderRadius: "5px",
}
export default ProfilePage