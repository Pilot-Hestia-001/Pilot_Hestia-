import React, { useRef, useState, useEffect } from 'react';

const Vendor = ({img, business_name, onUpload, isSelected, onClick}) => {
  const role = localStorage.getItem('role')
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(img || null);

  useEffect(() => {
    if (img) {
      setPreview(img);
    }
  }, [img]);

  const handleClick = () => {
    if (role === 'vendor' && fileInputRef.current) {
      fileInputRef.current.click(); // Opens the file dialog
    } else if(onClick) {
      onClick();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onUpload(file); // Pass file back to parent (for Cloudinary upload)
    }
  };
 
  return (
    <div
      style={{
        boxShadow: isSelected ? '0 0 10px #FF5F00' : '0 0 3px #FF5F00',
        border: isSelected ? '3px solid #FF5F00' : 'none',
        cursor: role === 'vendor' ? 'pointer' : 'default',
        borderRadius: "10px",
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 130,
      }}
      onClick={handleClick}
    >
      {role === 'vendor' && !preview ? (
        <div
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            backgroundColor: 'lightgray',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}
        >
          +
        </div>
      ) : (
        <img
          style={{ width: '110px', height: '110px', borderRadius: '50%' }}
          src={preview}
          alt="vendor_img"
        />
      )}

      <div style={{ ...titleContainer, marginTop: 5 }}>
        <h4 style={{ color: isSelected ? '#FF5F00' : 'grey' }}>{business_name}</h4>
      </div>

      {/* Hidden file input */}
      {role === 'vendor' && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}
    </div>
  );
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
  padding: 0,
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