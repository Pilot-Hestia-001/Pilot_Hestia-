import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


const handleRegister = async (formData) => {
    try {
      console.log(API_URL)
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      const data = res.data;

      localStorage.setItem('token', data.token);

      return data
      
      // Redirect or update auth context
    } catch (err) {
      console.error('register failed', err);
      throw err
    }
  };

  export default handleRegister;