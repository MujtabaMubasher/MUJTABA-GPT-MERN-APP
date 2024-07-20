import { Box, Typography, Button } from "@mui/material";
import Input from "../components/shared/Input";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(()=>{
    if (auth?.isLogedIn && auth.user) {
      navigate("/")
    }
  },[auth,navigate])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (username.trim() === "" ||email.trim() === "" || password.trim() === "") {
      alert("All Fields are Required");
      return;
    }
    //console.log(email,password);
    if (auth) {
      try {
          toast.loading("Creating Account",{ id: "signup" })
           const message = await auth?.signup(username,email, password);
          if (message) {
            toast.success(message, { id: "signup" })
            setTimeout(()=>{
              navigate("/login")
            },1000)
          }else{
            toast.error("Something Went Wrong While Creating an Account")
          }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
           let message = ""
          if (error.response && error.response.data) {
              message = error.response.data.message;
          } else {
              message = "An unexpected error occurred";
          }
          toast.error(message, { id: "signup" });
        }
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
         src="signUp.webp" 
         alt="Robot" 
         style={{ width: "450px", height: "650px" , marginLeft: "70px", marginTop: "-20px"}} 
        />
      </Box>

      <Box 
       display={"flex"}
       flex={{xs:1,md:0.5}}
       justifyContent={"center"}
       alignItems={"center"}
       padding={10}
       ml={"auto"}
       mt={0}
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
            height: "520px"
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
              marginBottom={1.5}
            >
              SignUp
            </Typography>
            <Input 
              type = "text" 
              name="username" 
              label = "Full Name"
            />
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
              Signup
            </Button>
          </Box>

        </form>
      </Box>
    </Box>
  );
}


export default Signup
