import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser,logoutUser,signupUser } from "../helpers/api-communicator";


type User = {
    name: string,
    email: string
}

type UserAuth = {
    isLogedIn: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise<void >
    signup: (name: string, email: string, password: string) => Promise<void | string>
    logout: () => Promise<void>
}

const AuthContext = createContext<UserAuth|null>(null)

const AuthProvider = ({children}: {children: ReactNode}) => {

  const [user, setUser] = useState<User | null>(null)
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(()=>{
    // fetch if the user's cookies are valid then skip Login

    async function authStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLogedIn(true);
      }
    }
    authStatus();
  },[])
  
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    //console.log(data);
    if (data) {
      setUser({ email: data.email, name: data.username });
      setIsLogedIn(true);
      setTimeout(()=>{
        window.location.reload()
      }, 0)
  }
 }

  const signup = async(username: string, email: string, password: string) =>{
     const data = await signupUser(username,email,password)
     if (data) {
       return data.message
     }
  }


  const logout = async() =>{
    const userlogout = await logoutUser()
    if (userlogout.message) {
       setUser(null)
       setIsLogedIn(false)
       setTimeout(()=>{
        window.location.reload()
       }, 500)
       return userlogout.message
    }
    
  }

  const value = {
    user,
    isLogedIn,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>
     {children}
  </AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext)

export {AuthProvider,useAuth}