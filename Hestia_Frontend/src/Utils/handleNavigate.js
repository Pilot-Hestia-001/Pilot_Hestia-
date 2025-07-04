import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleRegister = (endpoint) => {
    navigate(endpoint)
}

export default handleRegister;