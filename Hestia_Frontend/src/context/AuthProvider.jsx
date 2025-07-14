import { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import AuthContext from './AuthContext'
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isMember, setIsMember] = useState(() => {
    return localStorage.getItem('isMember') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  // Load user from token on page load


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded)
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const memberPasscodeValidationClick = async (passcode) => {
    try {
      const res = await axios.post('/api/validate',  {passcode} );
      console.log("ran")
      if (res?.data?.valid) {
        setIsMember(true);
        setUserRole(res.data.role)

        localStorage.setItem('isMember', 'true');
        localStorage.setItem('userRole', res.data.role);
        console.log("User role:", res.data.role); // 'member' or 'admin'
      }
    } catch (err) {
      console.error('Validation error', err);
      alert('Something went wrong.');
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isMember');
    localStorage.removeItem('userRole');

    setIsMember(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isMember, userRole, memberPasscodeValidationClick }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
