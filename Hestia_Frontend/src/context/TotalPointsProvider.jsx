import TotalPointsContext from "./TotalPointsContext"
import axios from "axios"
import { useState, useEffect } from "react";
import socket from "../Utils/socket"


const TotalPointsProvider = ({children}) => {
    const [totalPoints, setTotalPoints] = useState(0)
    const [isGoalReached, setIsGoalReached] = useState(false)

       useEffect(() => {
        const fetchPoints = async () => {
          try {
            const res = await axios.get("/api/points/getAll");
            setTotalPoints(res?.data)
            console.log(res?.data)
          } catch (error) {
            console.log("No points received", error);
          }
        };
    
        fetchPoints();
     
      socket.on('update_total_points', ({ updatedPoints }) => {
        console.log("Updated total points:", updatedPoints);
        setTotalPoints(updatedPoints); 
      });

      return () => {
        socket.off("update_total_points");
      };
    }, [])

    const context = {
      totalPoints,
      setTotalPoints,
      isGoalReached,
      setIsGoalReached
    }

    return(
        <TotalPointsContext.Provider value={{context}} >
          {children}
        </TotalPointsContext.Provider>
    )
}

export default TotalPointsProvider;