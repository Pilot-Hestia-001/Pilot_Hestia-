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
        width: "350px",
        height: "20px",
        borderRadius: "20px",
        borderWidth: "2px",
        borderStyle: 'solid',
        borderColor: "white",
        boxShadow: "0 0 5px orange",
        overflow: "hidden"
    }
    
    const progress =  {
        width: `${percent}%`,
        height: '100%',
        backgroundColor: 'orange',
        transition: 'width 0.3s ease',
       
    }

 return(
    <>
        <h3 style={{margin : 0 }}><FlagIcon/>  Goal to Scholarship Giveaway</h3>
        <div id="bar" style={bar}>
        <div style={progress}>
        </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <h5 style={{ margin: 0 }}> {pointsEarned} / {goal} points earned</h5>
        </div>
    </>
 )
}



export default GoalBar;