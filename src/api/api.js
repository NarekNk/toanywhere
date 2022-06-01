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
  authMe(uid, sid) {
    const date = new Date();
    const minutes = -date.getTimezoneOffset();
    const body = JSON.stringify({
      locale: "RU",
      time_zone: "GMT+3",
      minutes_from_gmt: minutes,
    });
    return instance.post(`auth?uid=${uid}&sid=${sid}`, body);
  },
};

export const excursionsAPI = {};
