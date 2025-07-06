const Vendor = ({img, business_name, onClick, isSelected}) => {
  console.log(img)
    return(
        <>
        <div onClick={onClick} style={{ backgroundColor: "white", width: "120px", height: "150px", cursor: "pointer", borderRadius: "10px", boxShadow: isSelected ?  "0 0 10px orange" : "0 0 3px orange" , border: isSelected ? "3px solid orange" : "",  padding: "4px"}}> 
       
          <img style={{width: "120px", height: "120px", borderRadius: "50%"}} src={img} alt="vendor_img" />
      
          <div style={titleContainer}> 
           
            <h4 style={title}>{business_name}</h4>
          
          </div>
        </div>  
        </>
    )
}

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