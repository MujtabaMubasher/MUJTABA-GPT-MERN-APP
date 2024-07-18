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
         sx={{ 
                display: "flex", 
                p: 2, 
                bgcolor: "", 
                my: 2, 
                gap: 2, 
                borderRadius: 5,
                width: "97%" 
          }}>
            <Avatar 
                sx={{ 
                    ml: "0", 
                    bgcolor: "transparent", 
                    marginTop: "-10px"
                }}>
               <img src="Logo.webp" alt="Bot" width={"40px"} />
            </Avatar>
            <Box>
              {
               !codeBlock && (
               <Typography 
                  fontSize={"20px"} 
                  width={"100%"} 
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
                    style={coldarkDark}
                    language="javascript"
                    customStyle={{maxWidth: "908px"}}
                  >
                     {block}
                  </SyntaxHighlighter>
                 ) : 
                 (
                  <Typography sx={{ fontSize: "20px" , width: "auto"}}>{block}</Typography> 
                 )
                )  
              }
            </Box>
      </Box>
    ) : 
    (
      <Box 
          sx={{ 
                display: "flex", 
                p: 2, 
                bgcolor: "#012a2b",
                my: 2, 
                gap: 2,
                borderRadius: 3 ,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
                width: "auto"
            }}>
            <Avatar sx={{ ml: "0", bgcolor: "#001616", fontSize: "23px",marginTop: "-5px"}}>
              {auth?.user?.name ? auth.user.name[0] : 'U'}
            </Avatar>
            <Box>
              <Typography fontSize={"20px"} width={"auto"}>{content}</Typography>
            </Box>
      </Box>
    )
  );
}

export default ChatItem;