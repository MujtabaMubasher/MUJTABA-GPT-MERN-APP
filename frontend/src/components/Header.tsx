import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavBtnLink from './shared/NavBtnLink';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
function Header() {
  const auth = useAuth();
  const location = useLocation()
  // e.g., "/chat"
  const pathname = location.pathname
  // e.g., "chat"
  const extractedPath = pathname.substring(1);
  async function logoutHandler() {
     //toast.loading("Logging Out",{id: "logout"})
    try {
      
      console.log(auth?.isLogedIn);
      console.log(auth?.user);
       const message = await auth?.logout()
       console.log(auth?.isLogedIn);
       console.log(auth?.user);
       if (message) {
         toast.success(message,{id: "logout"})
       }
    } catch (error) {
      console.log(error);
      toast.error("Somethig went Wrong", {id: "logout"})
    }
    
  }
  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
        marginTop: "30px"
      }}
    >
      <Toolbar className='header' sx={{ display: "flex" }}>
        <Logo />
        <div className='btn-div'>
          {auth?.isLogedIn ? (
            <>
              {
                extractedPath === "chat" ? (
                <>
                  <NavBtnLink
                    bg="#00fffc"
                    to="/"
                    text="Home"
                    textColor="black"
                  />
                </>
                ) : (
                <>
                  <NavBtnLink
                    bg="#00fffc"
                    to="/chat"
                    text="Go to Chat"
                    textColor="black"
                  />
                </>
                )
              }

              <NavBtnLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="Logut"
                onClick={logoutHandler}
              />
            </>
          ) : (
            <>
              <NavBtnLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />

              <NavBtnLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header
