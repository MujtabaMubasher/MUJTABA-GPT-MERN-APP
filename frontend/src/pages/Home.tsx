import { Box } from "@mui/material"
import TypeAnimations from "../components/typer/TypeAnimations"
import Footer from "../components/footer/Footer"

function Home() {
  // const theme = useTheme();
  // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
       sx={{
         display: "flex",
         width: "950px",
         flexDirection: "column",
         alignItems: "center",
         mx: "auto",
         mt: 3
       }}
      >
        <Box className = 'type-animation-box-Home'>
         <TypeAnimations/>
        </Box>
         <Box
          sx={{
            // width: "100%",
             display: "flex",
            // flexDirection: {md: "row", xs: "none", sm: "none"},
             gap: {md: 60, xs: 0, sm: 0},
            // my:10,
            // alignContent: "center",
            // marginRight: "30px"
          }}
         >
           <img
            className="motion"
            id="motion-image"
            src="botAI.png"
            alt="robot"
            //style={{ width: "225px", margin: "auto", marginTop: "-20px" }}


          />
          <img
            className="rotate"
            id ="rotate-image"
            src="meta.png"
            alt="openai"
            //style={{ width: "140px", margin: "auto",marginTop: "20px"}}
          />
         </Box>
         <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="cht.webp"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: "900px",
              borderRadius: 30,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
              padding: 20,
            }}
          />
        </Box>
        <Footer/>
      </Box>
    </Box>
  )
}

export default Home
