import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(content: string){
  if (content.includes("```")) {
    const arrayOfBlock = content.split("```");
    return arrayOfBlock;
  }
}

function isCodeBlock(str: string){
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")

  ) {
    return true
  }
  return false
}
//<Typography fontSize={"20px"}>{content}</Typography>
function ChatItem({ role, content }: { content: string, role: "user" | "assistent" }) {
  const auth = useAuth();
  const codeBlock = extractCodeFromString(content)
  return (
    role === "assistent" ? 
    (
        <Box 
        className = "chatItems-box-from-ChatItems-components"
         sx={{ 
                display: "flex", 
                p: 2, 
                bgcolor: "", 
                my: 2, 
                gap: 2, 
                borderRadius: 5,
                //width: "97%" 
          }}>
            <Avatar 
                sx={{ 
                    ml: "0", 
                    bgcolor: "transparent", 
                    marginTop: "-10px"
                }}>
               <img
               className='assistant-message-images-chatitems' 
               src="Logo.webp" alt="Bot"  />
            </Avatar>
            <Box>
              {
               !codeBlock && (
               <Typography 
                  className='text-typography-chatItems'
                  sx={{
                    fontSize: {
                      xs: '17px', // Small screen
                      sm: '16px', // Medium screen
                      md: '18px', // Larger screen
                      lg: '20px', // Extra large screen
                    },
                    width: "100%",
                    marginTop: {
                      xs: '3px', // Small screen
                      sm: '0px', // Medium screen
                      md: '0px', // Larger screen
                      lg: '0px', // Extra large screen
                    },
                  }}
                  // fontSize={"20px"} 
                  // width={"100%"} 
                  align={"justify"}
               >
                 {content}
                </Typography>)
              }
              {
                codeBlock && 
                codeBlock.length > 0 &&
                codeBlock.map((block)=> 
                 isCodeBlock(block)? (
                  <SyntaxHighlighter
                    className = "syntext-highlighter" 
                    style={coldarkDark}
                    language="javascript"
                    //customStyle={{maxWidth: "908px"}}
                  >
                     {block}
                  </SyntaxHighlighter>
                 ) : 
                 (
                  <Typography 
                    sx={{ 
                      fontSize: {
                        xs: '17px', // Small screen
                        sm: '16px', // Medium screen
                        md: '18px', // Larger screen
                        lg: '20px', // Extra large screen
                      },
                      width: {
                        xs: "97%",
                        md: "100%",
                        lg: "100%",
                      },
                   }}
                   align={"justify"}
                  >
                  {block}</Typography> 
                 )
                )  
              }
            </Box>
      </Box>
    ) : 
    (
      <Box 
        className = "chatItems-box-from-ChatItems-components"
        sx={{ 
          display: "flex", 
          p: 2, 
          bgcolor: "#012a2b",
          my: 2, 
          gap: 2,
          borderRadius: 3 ,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
          //width: "auto"
        }}
      >
        <Avatar sx={{ 
          ml: "0",  
          bgcolor:"#001616",             
          fontSize: {
            xs: '19px', // Small screen
            sm: '16px', // Medium screen
            md: '18px', // Larger screen
            lg: '20px', // Extra large screen
          },
          marginTop: "-5px"}}>
          {auth?.user?.name ? auth.user.name[0] : 'U'}
        </Avatar>
        <Box>
         <Typography 
           className='user-chat'
           sx={{
             width: "auto",
             fontSize: {
              xs: '17px', // Small screen
              sm: '16px', // Medium screen
              md: '18px', // Larger screen
              lg: '20px', // Extra large screen
            },
            marginTop: {
              xs: '3px', // Small screen
              sm: '0px', // Medium screen
              md: '0px', // Larger screen
              lg: '0px', // Extra large screen
            },
           }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    )
  );
}

export default ChatItem;
