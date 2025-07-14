import FlagIcon from '@mui/icons-material/Flag';
import {useEffect, useState} from "react"
import axios from 'axios';

const GoalBar = () =>{
    const [pointsEarned, setPointsEarned] = useState(0);

    useEffect(() => {
        const fetchPoints = async () => {
          try {
            const res = await axios.get("/api/points/getAll");
            console.log(res.data);
            setPointsEarned(res.data)
          } catch (error) {
            console.log("No points received", error);
          }
        };
    
        fetchPoints();

        const interval = setInterval(fetchPoints, 10000);

        return () => clearInterval(interval);
      }, [])

    const goal =  1000
    let percent = Math.min((pointsEarned / goal) * 100, 100);

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
    
    const progress =  {
        width: `${percent}%`,
        height: '100%',
        backgroundColor: '#ff2400',
        transition: 'width 0.3s ease',
    }

 return(
    <div style={container}>
      <div style={{margin: "1em"}}>
         <h3 style={textStyle}><FlagIcon/>  Goal to Scholarship Giveaway!</h3>
        <div id="bar" style={bar}>
        <div style={progress}>
        </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <h5 style={{...textStyle}}> {pointsEarned} / {goal} points earned</h5>
        </div>
      </div>
       
    </div>
 )
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