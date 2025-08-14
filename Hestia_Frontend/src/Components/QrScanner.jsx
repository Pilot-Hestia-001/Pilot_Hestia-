import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PaymentModal from './paymentModal'
import QrScannerLib from 'react-qr-scanner';
import { useState, useRef } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const QrScanner = () => {
  const [data, setData] = useState('No result');
  const [user, setUser] = useState(null)
  const [scanningState, setScanning] = useState(false);
  const hasScanned = useRef(false);
  

const handleScan = async(result) => {
   
    if (!result || hasScanned.current) return;

    const qr_code = result?.text;

    if (qr_code) {
 
        try{
            const res = await axios.post(`${API_URL}/api/user/scan`, {qr_code});
            if(res?.data) {
            hasScanned.current = true; 
            setScanning(false); 
            setUser(res?.data.user)
            console.log("User found:", res.data);
            }
            return
        } catch(e){
            console.error("Couldn't find user");
            return
        }
    }
  }

  // const handleStartScan = () => {
  //   if(scanningState === false){
  //       setScanning(true)
  //       setUser(null);
  //       if(hasScanned.current === true)hasScanned.current = false
   
  //   }
  //   if(scanningState === true){
  //       setScanning(false);
  //       hasScanned.current = true
  //   }

  //   console.log("Scanner toggled", hasScanned);
  // };

  const handleStartScan = () => {
    setUser(null);
    hasScanned.current = false;
    setScanning(prev => !prev);
    console.log("Scanner toggled", hasScanned);
  };


  const handleUserRefresh = () => {
    setUser(null)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        component="section"
        sx={{ border: 1, borderRadius: 2 }}
        style={{ ...box, backgroundColor: scanningState ? "transparent" : "grey" }}
      >
        {scanningState ? (
          <QrScannerLib
            delay={300}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            onError={(err) => console.error("QR Scan error", err)}
            onScan={(result) => {
              if (result && !hasScanned.current) {
                handleScan(result);
              }
            }}
            constraints={{video: { facingMode: 'environment' }}}
          />
        ) : (
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', px: 2 }}>
            Tap below to activate your camera and scan a user’s QR code.
          </Typography>
        )}
      </Box>

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1em" }}>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: scanningState ? "orange" : "#ff2400" }}
          onClick={handleStartScan}
        >
          {scanningState ? "Stop Scanner" : "Activate Scanner"}
        </Button>

        <PaymentModal user={user} handleUserRefresh={handleUserRefresh} />
      </div>

      {user && (
        <div style={{ marginTop: 16 }}>
          <Typography variant="h6">
            User Found: {user?.first_name} {user?.last_name}
          </Typography>
        </div>
      )}
    </div>
  );
};

const box = {
    display: 'flex',
    flexDirection: 'column', 
    gap: '5px',              
    background: '#fff',
    borderRadius: '8px',
    borderWidth: "3px",
    borderColor: "#ff2400",
    color: "white",
    width: '90vw',
    maxWidth: '400px',
    aspectRatio: '1',
    }

export default QrScanner