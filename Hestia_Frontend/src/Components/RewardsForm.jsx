import { useState } from "react"
import Box from '@mui/material/Box'
import Button from  '@mui/material/Button'
import TextField from '@mui/material/TextField';
import axios from "axios";

const RewardForm = () => {
    const [businessName, setBusinessName] =  useState("")
    const [title, setTitle] =  useState("")
    const [description, setDescription] =  useState("")
    const [cost, setCost] =  useState("")
    const [quantity, setQuantity] = useState("")
    const [UsdPrice, setUsdPrice] = useState("")
    const [image, setImage] =  useState("")
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState("")

   

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
          setPreviewUrl(URL.createObjectURL(file)); // show preview
         
        }
      };

      const handleSubmit = async () => {
        if (!title || !description || !cost || !quantity || !UsdPrice || !image) {
          setError("All fields including image are required.");
          return;
        }
        setError("");

        let id = "";

        try{
            const name = businessName
            const encodedName = encodeURIComponent(name);
            console.log(name)
            const vendorRes = await axios.get(`/api/vendor/find/${encodedName}`)
            console.log("Vendor data:", vendorRes.data);
            id = vendorRes.data.id;

        } catch {
            console.error("Unable to get vendor")
            return 
        }


        let uploadedImageUrl = "";

        console.log("this is the preview: " + previewUrl)

        try{
            const formData = new FormData();
            formData.append('image', image);

            const uploadRes = await axios.post('/api/upload', formData, {
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
           
            const rewardData = {
                vendor_id: id,
                title,
                description,
                cost,
                quantity, 
                UsdPrice,
                img: uploadedImageUrl, 
              };
              console.log(rewardData)
            const res = await axios.post('/api/rewards/create', rewardData)
            if (!res.ok) throw new Error('Failed to submit reward');
            alert("Reward submitted!");
        } catch(e){
            console.error("Error occured while creating rewards")
        }
        setBusinessName("");
        setTitle("");
        setDescription("");
        setImage("");
        setCost("");
        setQuantity("");
        setUsdPrice("");
    }

    return(
        <>
          <div style={containerStyle1}>
            <Box component="section" sx={{ p: 2, border: 1, borderRadius: 2  }} style={box}>
            <TextField 
                    id="outlined-basic" 
                    label="Business Name" 
                    variant="outlined" 
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={businessName}
                />
            <br/>
            <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            <br/>
            <TextField 
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            <br/>
                <TextField 
                    id="outlined-basic" 
                    label="cost" 
                    variant="outlined" 
                    onChange={(e) => setCost(e.target.value)}
                    value={cost}
                />
            <br/>
                <TextField 
                        id="outlined-basic" 
                        label="quantity" 
                        variant="outlined" 
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
            <br/>
                <TextField 
                        id="outlined-basic" 
                        label="UsdPrice" 
                        variant="outlined" 
                        onChange={(e) => setUsdPrice(e.target.value)}
                        value={UsdPrice}
                    />
            <br/>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            <br />
                {previewUrl && (
                <img src={previewUrl} alt="Preview" style={{ width: "100%", marginTop: "10px" }} />
                )}

                <Button 
                    variant="contained"
                    sx={{color:"white", backgroundColor: '#ff2400'}}
                    onClick={()=> handleSubmit()}
                    >
                    Submit
                </Button>
             <br/>
                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </p>
                )}
            </Box>
        </div>
        </>
    )
}

const containerStyle1 = {
    position: "relative",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    };

const box = {
    display: 'flex',
    flexDirection: 'column', 
    gap: '5px',              
    padding: '32px',
    background: '#fff',
    borderRadius: '8px',
    borderWidth: "3px",
    borderColor: "#ff2400",
    width: '300px',
    }
    

export default RewardForm