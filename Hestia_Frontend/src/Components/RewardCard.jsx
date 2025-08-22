import { Height } from "@mui/icons-material"
import { alignItems, display, flexDirection, justifyContent, lineHeight, padding, textAlign } from "@mui/system"
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const RewardCard = ({rewardId, rewardImg, rewardTitle, rewardPrice}) => {
    return(
        <div style={container}>
            <img  style={{width:"70%", height: "70%", margin: 0}} src={rewardImg} alt={`${rewardTitle} image`}/>
          
            <h4 style={text}>{rewardTitle}</h4>
            <h4 style={{...text, display: "flex", alignItems: "center", gap: "6px"}}>
                {<LocalFireDepartmentIcon/>}{rewardPrice} Embers
            </h4>
          
        </div>
    )
}

const container = {
    width :"100%",
    Height: "100%",
    padding: "10px",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}

const text = {
    color: "#FF5F00",
    margin: 0,
    fontSize: "15px",
    lineHeight: 1,
}
export default RewardCard