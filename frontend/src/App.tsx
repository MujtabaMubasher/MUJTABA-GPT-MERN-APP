import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Home, Chat, Login, Signup, NotFound } from "./pages";

function App() {
  
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/chat" element = {<Chat/>} />
        <Route path="*" element = {<NotFound/>} />
      </Routes>
    </main>
  );
}

export default App;
