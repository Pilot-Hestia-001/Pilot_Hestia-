import axios from 'axios';


const handleRegister = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      return res.data
      
      // Redirect or update auth context
    } catch (err) {
      console.error('register failed', err);
      return err
    }
  };

  export default handleRegister;