import { useState, useEffect } from "react";


const PrivacyPolicy = () => {
    const [text, setText] = useState("");
  
    useEffect(() => {
      fetch("/Legal/PrivacyPolicy.txt")
        .then((res) => res.text())
        .then((data) => setText(data));
    }, []);
  
    return (
      <div style={{ whiteSpace: "pre-wrap", padding: "20px" }}>
        {text}
      </div>
    );
  };

export default PrivacyPolicy