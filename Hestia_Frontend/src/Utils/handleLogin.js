import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const handleLogin = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      return res.data
    } catch (err) {
        console.error('Login failed', err);
        throw err
    }
  };

  export default handleLogin;