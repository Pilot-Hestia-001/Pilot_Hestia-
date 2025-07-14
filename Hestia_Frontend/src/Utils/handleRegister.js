import axios from 'axios';


const handleRegister = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
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