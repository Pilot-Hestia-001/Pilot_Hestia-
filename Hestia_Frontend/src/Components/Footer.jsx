import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Button } from "@mui/material";
import FooterModal from "./footerModal";

const Footer = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const handleOpen = (type) => {
        setModalType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalType(null);
    };


    return(
        <footer style={footerContainer}>
            <div style={{
                    display: "flex", 
                    flexDirection:"column",
                    alignItems:"center", 
                    justifyContent:"center", 
                    marginBottom: 0}}>

                <div style={{
                        display: "flex", 
                        flexDirection:"row",
                        alignItems:"center", 
                        justifyContent:"center", 
                        marginBottom: 0,
                        padding:0,
                        gap: 8}}>
                    <Button onClick={() => navigate('/contact')}
                            sx={{
                                textTransform: "none",
                                color: "white",
                                fontWeight: 600,
                                backgroundColor: "transparent",
                                textDecoration: "underline",  
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                            }}
                        >Contact Us</Button>

                    <span style={{ fontSize: "1.2rem"}}>•</span>
                    <Button onClick={() => handleOpen("ToS")}   
                        sx={{
                            textTransform: "none",
                            color: "white",
                            fontWeight: 600,
                            backgroundColor: "transparent",
                            textDecoration: "underline",  
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                            }}>
                        Terms of Service
                    </Button>
                    <span style={{ fontSize: "1.2rem"}}>•</span>
                    <Button onClick={() => handleOpen("PP")} 
                        sx={{
                            textTransform: "none",
                            color: "white",
                            fontWeight: 600,
                            backgroundColor: "transparent",
                            textDecoration: "underline",  
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                            }}>
                        Privacy Policy
                    </Button>

                    <FooterModal open={open} handleClose={handleClose} type={modalType} />
                
                </div>
                <p style={{fontSize:14}}> ©2025, Project HESTIA. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

const footerContainer = {
    width: "100%",
    padding: 20,
    backgroundColor: "#ff2400",
    color: "white",
    marginTop: 50
}

const button = {
    background: "none", 
    border: "none", 
    padding: 0, 
    margin: 0,
    cursor: "pointer", 
    textDecoration: "underline", 
}

export default Footer 