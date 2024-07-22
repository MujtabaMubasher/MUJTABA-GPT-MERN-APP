import { TypeAnimation } from 'react-type-animation'

function TypeAnimations() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your OWN AI",
        1000,
        "Built With Meta Llama-3",
        2000,
        "Your Own Customized AI Assistant",
        1500,
      ]}
/*       style={{
        fontSize: "55px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        fontFamily: "Roboto Slab",
      }} */
      repeat={Infinity}
      className = "type-animation"
    /> 
  )
}

export default TypeAnimations
