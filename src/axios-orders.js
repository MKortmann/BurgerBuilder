import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-2-6c057.firebaseio.com/"
});

export default instance;
