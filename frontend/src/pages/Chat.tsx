
import { Box, Avatar, Typography, Button,IconButton } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import red from "@mui/material/colors/red"
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { sendChatRequest, getAllChats,deleteAllChats } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Chat() {

  type Message = {
    role: "user" | "assistent",
    content: string
  }
  const auth = useAuth()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [chatMessages, setChatMessage] = useState<Message[]>([])
  const navigate = useNavigate()
  const handleSubmit = async () => {
      const content = inputRef?.current?.value as string
       if (inputRef && inputRef?.current) {
          inputRef.current.value = ""
       }
      const newMesaage : Message = {role: "user", content: content} 
      setChatMessage((prev)=> [...prev, newMesaage])  
      const newChats = await sendChatRequest(content)
      setChatMessage([...newChats.chats ])   
  }
  const deleteHandler = useCallback(async () => {
    if (auth?.isLogedIn && auth.user) {
        const userChats = await getAllChats()
        if (userChats.chats == "") {
          toast.success("Chats Already Deleted",{id: "deleted"})
          return
        }
       toast.loading("Deleting",{id: "deleted"})
       try {
        const response = await deleteAllChats()
        if (response) {
           toast.success("Chats Deleted Successfully", {id: "deleted"})
           const userChats = await getAllChats();
           setChatMessage([...userChats.chats])
        }
       
       } catch (error) {
         console.log(error);
         toast.error("Something Went wrong", {id: "deleted"})
       }
    }else{
      toast.error("Please SignUp or Login", {id: "deleted"})
    }     
 },[auth])

  useLayoutEffect(() => {
    (async () => {

      if (auth?.isLogedIn && auth.user) {
        const userChats = await getAllChats()
        if (userChats.chats == "") {
          return
        }
        toast.loading("Loading Chats", { id: "loadchats" });
        try {
          const userChats = await getAllChats();
          setChatMessage([...userChats.chats])
          toast.success("Successfully Loaded Chats", { id: "loadchats" });
        } catch (error) {
          console.log(error);
          toast.error("Loading Failed", { id: "loadchats" });
        }
      }

    })()
  }, [auth])
  const containerRef = useRef <HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Temporarily set scroll behavior to 'auto'
      const originalScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = 'auto';

      // Scroll to the bottom
      container.scrollTop = container.scrollHeight;

      // Revert scroll behavior to original (if needed)
      container.style.scrollBehavior = originalScrollBehavior;
    }
  }, [chatMessages]);
  
  useEffect(()=> {
    if (!auth?.isLogedIn && !auth?.user) {
      navigate("/login")
    }
  },[auth, navigate])
  return (
    // Parent Box

    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        mt: 10,
        gap: 3,
      }}
    >

      <Box
        sx={{ display: { md: "flex", sm: "none", xs: "none" }, flex: 0.2, flexDirection: "column", marginTop: "20px" }}
      >

        <Box
          sx={{
            display: "flex",
            width: "320px",
            height: "60vh",
            bgcolor: "#001616 ",
            borderRadius: 5,
            flexDirection: "column",
            max: 3,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)'
          }}
        >
          <Avatar sx={{
            mx: "auto",
            my: 1,
            bgcolor: "transparent",
            color: 'white',
            fontWeight: 700,
            fontSize: "30px",
            padding: "5px",
            marginTop: "30px"
          }}
          >
            <img
              src="Logo.webp"
              alt="openai"
              width={"50px"}
              height={"50px"}
              //className="image-inverted"
              style={{ marginTop: "-10px" }}
            />

          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              my: "2px",
              fontFamily: "work sans",
              margin: "0px 20px",
              marginTop: "5px",
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "500"
            }}
          >
            {auth?.user?.name}
          </Typography>
          <Typography
            sx={{
              max: "auto",
              fontFamily: "work sans",
              my: 1,
              p: 1,
              textAlign: "justify",
              fontSize: "17px",
              padding: "10px 20px",
              wordSpacing: "-2px"
            }}
          >

            Welcome! I'm here to help with questions on various topics like knowledge, business, advice, and education. For your safety, please don't share personal information. How can I assist you today?
          </Typography>

          <Button
            onClick={deleteHandler}
            sx={{
              width: "225px",
              my: "20px",
              color: "black",
              fontWeight: "700",
              fontSize: "15px",
              padding: "3px 20px",
              borderRadius: 1.5,
              mx: "auto",
              bgcolor: "#00FFFC",
              ":hover": {
                bgcolor: red.A400
              }
            }}
          >
            Clear Conversation
          </Button>

        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: { md: 0.8, xs: 1, sm: 1 },
          width: "",
          height: "",
          marginTop: "5px",
          alignItems: "center"
        }}
      >

        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            width: "400px",
            mb: 2,
            marginTop: "-100px",
            marginLeft:"40px",
            height: "",
          }}
        >
          <div className="Meta-Logo-text-typography-div" /*style={{ display: "flex" , marginTop: "-10px"}}*/>
            <img className = "meta-logo"src="MetaLogo.webp" alt="" /*style={{ width: "50px", marginRight: "15px"}}*/ />
            <span className = "Meta-LLaMA-3"/*style={{fontSize:"25px"}}*/>Meta LLaMA-3</span>
          </div>
        </Typography>

          <Box
            className = "chat-display-box"
            ref={containerRef}
            sx={{
              //width: "88%",
              //height: "55vh",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              mx: "auto",
              overflowY: "auto",
              //padding: "10px",
              //marginTop: "20px",
              alignContent: "start"
          
            }}
          >

            {chatMessages.map((chat, index) =>
            (<ChatItem
              content={chat.content} role={chat.role as "user" | "assistent"} key={index} />)
            )}

          </Box>

          <div 
              className="chat-input-field-div"
              style={{
              // width: "90%",
              // display: "flex",
              // marginTop: "20px",  
           }}
          >
            <input  
            className="chat-input-field"
            type="text"
            ref={inputRef}
            style={{
              backgroundColor: "#023333",
              padding:"19px",
              marginTop: "20px",
              //width: "93.7%",
              borderRadius: "15px",
              //marginLeft: "10px",
              outline: "none",
              border: "none",
              color: "white",
              //fontSize: "20px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)'

              }}
              
            />
            <IconButton
             onClick={handleSubmit}
             sx={{
              ml:"auto",
              color: "white",
              fontSize: "45px",
              marginTop: "18px",
              marginLeft: "10px",
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
              bgcolor: "#001616",
              

             }}
            >
              <IoMdSend/>
            </IconButton>
         </div>

      </Box>
    </Box>
  )
}

export default Chat
