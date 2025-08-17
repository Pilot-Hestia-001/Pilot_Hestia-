import FlagIcon from '@mui/icons-material/Flag';
import {useEffect, useState, useContext} from "react"
import axios from 'axios';
import Button from '@mui/material/Button';
import TotalPointsContext from "../context/TotalPointsContext";
import RaffleModal from "./RaffleModal"

const GoalBar = () =>{
    const {context} = useContext(TotalPointsContext)
    const goal = 150000
    let percent = Math.min((context.totalPoints / goal) * 100, 100);

    useEffect(() => {
      if(percent >= 100){
            context.setIsGoalReached(true)
          }
    }, [percent, context]);

  const progress =  {
    width: `${percent}%`,
    height: '100%',
    backgroundColor: '#ff2400',
    transition: 'width 0.3s ease',
  }

 return(
    <div style={container}>
      <div style={{margin: "1em"}}>
         <h3 style={textStyle}><FlagIcon/> Goal to Scholarship Giveaway!</h3>
        <div id="bar" style={bar}>
        <div style={progress}>
        </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <h5 style={{...textStyle}}> {context.totalPoints} / {goal} points earned</h5>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RaffleModal 
          disabled={context.isGoalReached} 
          />


        </div>
      </div>
       
    </div>
 )
}

const bar =  {
  display: "box",
  width: "100%",
  height: "20px",
  borderRadius: "20px",
  borderWidth: "2px",
  borderStyle: 'solid',
  borderColor: "white",
  boxShadow: "0 0 5px orange",
  overflow: "hidden",
}


const container = {
  backgroundColor: "white",
  border: "1px solid rgba(255, 4, 4, 0.3)",
  borderRadius: "16px",
  padding: "5px",
  width: "100%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const textStyle = {
  margin : 0,
  color: "#FF5F00",
}


export default GoalBar;