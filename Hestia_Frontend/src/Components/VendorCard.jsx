const Vendor = ({img, business_name, onClick, isSelected}) => {
  
    return(
        <>
        <div onClick={onClick} style={{...cardStyle, boxShadow: isSelected ? "0 0 10px #FF5F00" : "0 0 3px #FF5F00", border: isSelected ? "3px solid #FF5F00" : "none",}}>
          <img style={{width: "110px", height: "110px", borderRadius: "50%"}} src={img} alt="vendor_img" />
      
          <div style={titleContainer}> 
           
            <h4 style={{...title, color: isSelected ? "#FF5F00" : "grey"}}>{business_name}</h4>
          
          </div>
        </div>  
        </>
    )
}
const cardStyle = {
  backgroundColor: "white",
  width: "120px",
  height: "150px",
  cursor: "pointer",
  borderRadius: "10px",
  padding: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const titleContainer = {
  width: "120px",
  height: "30px",
  color: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  textAlign: "center",   // Ensures horizontal centering of wrapped lines     
  textOverflow: "ellipsis",
}

const title = {
  margin: 0,
  fontSize: "clamp(10px, 4vw, 14px)", // auto-adjusts size
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  lineHeight: "1.1",
}

export default Vendor