import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLogedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void | string>;
  signup: (name: string, email: string, password: string) => Promise<void | string>;
  logout: () => Promise<void | string>;
};

const AuthContext = createContext<UserAuth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    // Fetch the authentication status
    const authStatus = async () => {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLogedIn(true);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
    };
    authStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLogedIn(true);
        // Avoid reloading the page if possible
        // Use state updates to reflect changes
      }
      //console.log(data);
      return data
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password);
      if (data && data.message) {
        return data.message;
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = async () => {
    try {
      const userlogout = await logoutUser();
      if (userlogout && userlogout.message) {
        setUser(null);
        setIsLogedIn(false);
        // Avoid reloading the page if possible
        // Use state updates to reflect changes
        return userlogout.message;
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    isLogedIn,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
