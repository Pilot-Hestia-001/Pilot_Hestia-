import axios from 'axios';

const handleLogin = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      return res.data
    } catch (err) {
        console.error('Login failed', err);
        setError(err.response?.data?.message || 'Login failed');
    }

  };

  export default handleLogin;