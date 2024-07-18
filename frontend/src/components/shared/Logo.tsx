import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link to={"/"}>
        <img 
        src="Logo.webp" 
        alt="openai"
        width={"50px"}
        height={"50px"}
        //className="image-inverted"
        style={{marginTop: "-10px"}}
        />
      </Link>{" "}
     <Typography
      sx={{
        display: {md:"block", sm:"none", xs:"none"},
        mr:"auto",
        fontWeight: "800",
        textShadow: "2px 2px 20px #000",
      }}
     >
      <span style={{fontSize: "30px", marginLeft: "8px"}}>MUJTABA</span><span style={{fontSize: "20px"}}>-GPT</span> 
     </Typography>
      
    </div>
  );
}

export default Logo;
