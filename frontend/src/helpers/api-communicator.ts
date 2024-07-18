import axios from "axios";

axios.defaults.baseURL =
  "http://localhost:5173//api/v1";
axios.defaults.withCredentials = true;

const loginUser = async (email: string, password: string) => {
  //console.log("Sending login request");
  const res = await axios.post("/user/login", { email, password });

  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

const signupUser = async (username: string, email: string, password: string) => {
  //console.log("Sending login request");
  const res = await axios.post("/user/signup", {username, email, password });
  console.log(res);
  

  if (res.status !== 200) {
    throw new Error("Unable to SignUp");
  }
  const data = await res.data;
  return data;
};

const checkAuthStatus = async() => {
  const res = await axios.get("/user/auth-status")
  if (res.status !== 200) {
     throw new Error("Unable to Authenticate");
  }
  const data = await res.data
  return data;
}

const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", {message});
  if (res.status !== 200) {
    throw new Error("Unable Send AI Chat Response");
  }
  const data = await res.data;
  return data;
};

const getAllChats = async () => {
  const res = await axios.get("/chats/get-all-chats");
  if (res.status !== 200) {
    throw new Error("Unable Send User Chat");
  }
  const data = await res.data;
  return data;
};

const deleteAllChats = async () => {
  const res = await axios.delete("/chats/delete");
  if (res.status !== 200) {
    throw new Error("Unable Delete User Chat");
  }
  const data = await res.data;
  return data;
};
const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable Logout");
  }
  const data = await res.data;
  return data;
};


export { loginUser,signupUser, checkAuthStatus, sendChatRequest,getAllChats, deleteAllChats,logoutUser };
