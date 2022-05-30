import axios from "axios";

const instance = axios.create({
  baseURL: "https://st.2aw.io:8081/",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
});

export const getCode = (email) => {
  instance(`registration?email=${email}`).then((res) => {
    if (res.status !== 200) {
      console.log(
        "Статус запроса не 200, значит что то пошло не так в отправке кода на почту!"
      );
    }
  });
};

export const sendCode = (email, code) => {
  instance(`/registration?email=${email}`, {
    method: "POST",
    body: JSON.stringify({ vcode: Number(code) }),
  }).then((res) => {
    //   if(res.status == "ok")
    console.log(res);
  });
};
