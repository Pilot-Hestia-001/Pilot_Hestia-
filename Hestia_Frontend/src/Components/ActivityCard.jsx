import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ActivityCard = ({title, description, cost, img, num}) => {
    const isEven = num % 2 === 0;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.1 });
  
    const fadeIn = {
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 20,
      transition: { duration: 0.6, ease: "easeOut" },
    };

    return(
        <>
         <motion.div id="hello" ref={ref} animate={fadeIn}>
         { isEven?
        <div className="container" style={{...container}}>
            
           <img src={img} alt={title} style={imgStyle} />

          <div style={contentStyle}>
            <h3 style={{margin: 0}}>{title}</h3>
            <p style={{margin: 0}}>{description}</p>
          </div>

        </div>
        :
        <div style={{...container}}>
           
          <div style={contentStyle}>
            <h3 style={{margin: 0}}>{title}</h3>
            <p style={{margin: 0}}>{description}</p>
          </div>
          
          <img src={img} alt={title} style={imgStyle} />
        </div>
        }
        </motion.div>
        </>
    )
};

const container = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    height: "150px",
    padding: "10px",
    margin: 0,
    color: "white",
    backgroundColor: "#FF5F00",
    borderWidth: "2px",
    borderRadius: "5px",
    borderColor: "#ff2400",
    borderStyle: "solid",
    gap: "10px"
}

  const imgStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const contentStyle = {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    
  };

export default ActivityCard