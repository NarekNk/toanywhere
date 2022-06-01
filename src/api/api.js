import axios from "axios";

const instance = axios.create({
  baseURL: "https://st.2aw.io:8081/",
});

export const authAPI = {
  getCode(email) {
    return instance(`registration?email=${email}`);
  },
  sendCode(email, code) {
    const body = JSON.stringify({ vcode: Number(code) });
    return instance.post(`registration?email=${email}`, body);
  },
};
