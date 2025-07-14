import { useEffect, useState} from "react";
import axios from "axios";

const Points = () => {

  const [points, setPoints] = useState(0)

  const token = localStorage.getItem("token");

  useEffect(()=> {
    const getPoints = async() => {
        try{
             const res = await axios.get(`/api/points/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
             });
            
            setPoints(res.data)
        
        } catch(e){
            console.error("couldn't get points")
        }
    }

    getPoints()
  }, [])

  return(
    <>
    <div style={{margin: 0}}>
      <h3 style={{fontSize: "13px", color:"white", margin: 0}}>{points} Embers</h3>
    </div>   
    </>
  )
}
export default Points;