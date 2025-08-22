import React, { useState } from "react";
import { Button, Grid, Box, Typography, Modal } from "@mui/material";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ButtonSizes = ({ id }) => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];
  const [openSize, setOpenSize] = useState(null); // tracks which size modal is open

  const handleOpen = (size) => setOpenSize(size);
  const handleClose = () => setOpenSize(null);
  
  const handleSubmit = async (size) => {
    try {
      const formData = {
        reward_id: id,
        sizeKey: size,
        value: false, // Example: marking the size as unavailable
      };
      const res = await axios.put(`${API_URL}/api/rewards/update/size`, formData);
      console.log("Updated size:", res.data);
      handleClose();
    } catch (e) {
      console.error("Error updating size", e);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    color: "black",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 8, md: 8 }}>
      {sizes.map((size) => (
        <Grid key={size} item xs={4}> {/* 3 per row */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff2400",
              color: "white",
              marginTop: "10px",
              fontWeight: 600,
            }}
            onClick={() => handleOpen(size)}
          >
            {size.toUpperCase()}
          </Button>

          {/* Modal for confirmation */}
          <Modal open={openSize === size} onClose={handleClose}>
            <Box sx={style}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "1em", color: "black" }}
              >
                Are you sure you want to disable {size.toUpperCase()}?
              </Typography>
              <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
                <Button
                  onClick={() => handleSubmit(size)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff2400",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
        </Grid>
      ))}
    </Grid>
  );
};

export default ButtonSizes;