import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const handleRegisterVendor = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/vendor/register`, formData);
      const data = res.data;

      localStorage.setItem('token', data.token);

      return data
      
      // Redirect or update auth context
    } catch (err) {
      console.error('register failed', err);
      throw err
    }
  };

  export default handleRegisterVendor;