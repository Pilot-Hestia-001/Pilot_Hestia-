import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import Tos from "./Tos";
import PrivacyPolicy from "./PrivacyPolicy";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "black",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const FooterModal = ({ open, handleClose, type }) => {
  const renderContent = () => {
    if (type === "ToS") return <Tos />;
    if (type === "PP") return <PrivacyPolicy />;
    return null;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight:"bold" }}>
          {type === "ToS" ? "Terms of Service" : "Privacy Policy"}
        </Typography>
        <div style={{
        maxHeight: 400, // set scrollable height
        overflowY: "auto",
        padding: 1,
        }}>
             {renderContent()}
        </div>
       
        <Button
          onClick={handleClose}
          sx={{
            mt: 2,
            backgroundColor: "#ff2400",
            color: "white",
            fontWeight: 600,
          }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FooterModal;
