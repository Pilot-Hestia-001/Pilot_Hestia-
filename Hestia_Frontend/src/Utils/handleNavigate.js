import { useNavigate } from "react-router-dom";



const handleRegister = (endpoint) => {
    const navigate = useNavigate();
    navigate(endpoint)
}

export default handleRegister;