import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const storeToken = token => {
    setToken(token);
    return localStorage.setItem('token', token);
  };

  let isloggedIn = !!token;

  const logOut = () => {
    setToken('');
    setUser(null);
    return localStorage.removeItem('token');
  };

  useEffect(() => {
    axios
      .get(
        `https://coder-squad-task-management-server.onrender.com/api/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        setUser(res.data);
      });
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        logOut,
        isloggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
