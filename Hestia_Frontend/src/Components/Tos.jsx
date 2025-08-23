import { useState, useEffect } from "react";

const Tos = () => {
    const [text, setText] = useState("");
  
    useEffect(() => {
      fetch("/Legal/Tos.txt")
        .then((res) => res.text())
        .then((data) => setText(data));
    }, []);
  
    return (
      <div style={{ whiteSpace: "pre-wrap", padding: "5px" }}>
        {text}
      </div>
    );
  }

export default Tos