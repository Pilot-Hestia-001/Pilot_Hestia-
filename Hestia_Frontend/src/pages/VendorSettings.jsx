import { useEffect, useState } from "react"
import VendorMenu from "../Components/VendorMenu"
import RewardCarousel from "../Components/RewardCarousel"
import VendorCard from "../Components/VendorCard"
import { Grid, Card, CardMedia, Typography, CardContent} from "@mui/material"
import ButtonSizes from "../Components/ButtonSizes"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

const VendorStorePage = () => {

 const [vendor, setVendor] = useState(null)
 const [rewardList, setRewardList] = useState(null)

  useEffect(() => {
        const fetchVendor = async() => {
            const token = localStorage.getItem('token')

            try{
             const res = await axios.get(`${API_URL}/api/vendor/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
             })
             setVendor(res?.data)
             console.log(res?.data)
            } catch {  
                console.error("Unable to get vendor")
                return 
            }
        }

        fetchVendor()

  }, [])

  useEffect(() => {
    const fetchRewards = async() => {
          try{
            if(vendor?.id){
                const res = await axios.get(`${API_URL}/api/rewards/${vendor?.id}`)
                setRewardList(res?.data)
            }
             console.log(vendor?.id)
        } catch(e) {
            console.error("Could't get rewards")
        }
    }
     fetchRewards()
}, [vendor?.id])

  const onUpload = async(previewImg) => {
    let uploadedImageUrl = "";

        console.log("this is the preview: " + previewImg)
       
        try{
            const formData = new FormData();
            formData.append('image', previewImg);

            const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            
            uploadedImageUrl = uploadRes?.data?.imageUrl;

            if (!uploadedImageUrl) {
            throw new Error("No image URL returned from server");
            }

            console.log("Uploaded Image URL:", uploadedImageUrl);

        } catch(e){
            console.error("Upload failed", e);
            return
        }
        
       
        try{
            const imgData = {
                img: uploadedImageUrl, 
              };
              console.log(imgData)
            const res = await axios.put(`${API_URL}/api/vendor/${vendor.id}/image`, imgData)

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to set image');
              }
            alert("Image set!");
        } catch(e){
            console.error("Error occured while setting image")
        }
  }

 const containerClass = "flex-container";



 return (
    <div style={container}>
        <VendorMenu />
        <h2 style={{...flex, color: "black", textAlign: "center"}}>Click to set an image for your business</h2>

        <div className={containerClass}>
        
         <VendorCard 
            img={vendor?.img} 
            business_name={vendor?.business_name}
            onUpload={onUpload}
         />
        </div>

        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Grid container spacing={3} style={{ marginTop: "2em", maxWidth: "90%" }}>
            {rewardList?.map((reward, index) => (
             <Grid item xs={12} sm={6} md={4} key={index}>
                 <Card
                    sx={{
                    display: "flex",               // Make the card a flex container
                    flexDirection: "row",          // Row layout
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1em",
                    borderRadius: 3,
                    boxShadow: "0 0 5px #FF5F00",
                    minHeight: 120,                // Keep it compact
                    gap: 2                         // Space between image & buttons
                    }}
                >
                 {/* Reward Image */}
            <CardMedia
                component="img"
                image={reward?.img}
                alt={reward?.title}
                sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 2
                    }}
                   />

                      {/* Reward Info + Buttons */}
        <CardContent
          sx={{
            flex: 1,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {reward?.title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Quantity: {reward?.quantity}
          </Typography>

          {/* Size Buttons */}
          <ButtonSizes id={reward?.id} />
        </CardContent>
      </Card>
    </Grid>
  ))}
  </Grid>
  </div>
    </div>
 )
}

const container = {
    width: "100vw",
}

const flex = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export default VendorStorePage