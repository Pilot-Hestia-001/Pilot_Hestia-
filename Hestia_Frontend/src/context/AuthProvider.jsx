import { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import AuthContext from './AuthContext'
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isMember, setIsMember] = useState(() => {
    return localStorage.getItem('isMember') === 'true';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
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
      const res = await axios.post(`${API_URL}/api/validate`,  {passcode} );
      console.log("ran")
      if (res?.data?.valid) {

        if(res.data.role === "member"){
          setIsMember(true);
          localStorage.setItem('isMember', 'true');
        }

        if(res.data.role === "admin"){
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        }
        
        setUserRole(res.data.role)
        localStorage.setItem('userRole', res.data.role);
        console.log("User role:", res.data.role); 
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
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userRole');
    localStorage.removeItem("role")

    setIsMember(false);
    setIsAdmin(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isMember, isAdmin, userRole, memberPasscodeValidationClick }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
