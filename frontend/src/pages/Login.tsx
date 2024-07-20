import { Box, Typography, Button } from "@mui/material";
import Input from "../components/shared/Input";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
//import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(()=>{
    if (auth?.isLogedIn && auth.user) {
      navigate("/chat")
    }
  },[auth,navigate])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email.trim() === "" || password.trim() === "") {
      alert("Both Email and Password are required");

      return;
    }
    //console.log(email,password);
   try {
      if (auth) {
        const message = await auth?.login(email, password);
        console.log(message);
        if (message) {
          toast.success(message, { id: "signup" })
        }
      }
    } catch (error) {
      //console.log(error);
        if (error) {
           let message = ""
          if (error.response && error.response.data) {
              message = error.response.data;
          } else {
              message = "An unexpected error occurred";
          }
          toast.error(message, { id: "Login" });
        }
    }
  };
  return (
    <Box 
     width={"100%"} 
     height={"100%"} 
     display="flex" flex={1}
    >
      <Box 
       padding={8} 
       display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img 
         src="webLogin.webp" 
         alt="Robot" 
         style={{ width: "550px", height: "650px" , marginLeft: "50px"}} 
        />
      </Box>

      <Box 
       display={"flex"}
       flex={{xs:1,md:0.5}}
       justifyContent={"center"}
       alignItems={"center"}
       padding={10}
       ml={"auto"}
       mt={7}
       marginRight={"30px"}
      >
       <form 
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000 ",
            borderRadius: "10px",
            border: "none",
            background: "#001616",
            height: "450px"
          }}
       >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"

            }}
          >

            <Typography
              variant="h4"
              textAlign= "center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <Input 
              type = "email" 
              name="email" 
              label = "Email"
            />
            <Input 
              type = "password" 
              name="password" 
              label = "Password"
            />
            <Button
              type="submit"
              sx = {{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                ":hover":{
                  bgcolor:"white",
                  color: "black"
                },
              
              }}
              endIcon={<IoIosLogIn />}
             >
              Login
            </Button>
          </Box>

        </form>
      </Box>
    </Box>
  );
}

export default Login;
