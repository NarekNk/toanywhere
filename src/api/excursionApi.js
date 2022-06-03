import axios from "axios";

const instance = axios.create({
  baseURL: "https://st.2aw.io:8081/",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
});

const excursionAPI = {
  join(uid, sid, ex_tid) {
    return instance.patch(
      `excursions?uid=${uid}&sid=${sid}&ex_tid=${ex_tid}&attach_me=1`
    );
  },

  getExcursion(uid, sid, ex_tid) {
    return instance.get(`/excursions?uid=${uid}&sid=${sid}&by_tid=${ex_tid}`);
  },

  patchExcursionStart(uid, sid, ex_tid) {
    return instance.patch(
      `/excursions?uid=${uid}&sid=${sid}&ex_tid=${ex_tid}&status=grp_start_by_user`
    );
  },
};

export default excursionAPI;
