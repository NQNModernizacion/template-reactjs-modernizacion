import { toast } from 'react-toastify';

import { toastOptions } from '../../config/toast';

import { axios } from "../../utils/axios";
import { setSession } from "../../utils/sessionStorage";

window.addEventListener("popstate", function (event) {
  window.history.pushState(null, document.title, window.location.href);
});

export const handleLogin = async (e, actions, body, nav) => {
  e.preventDefault();

  actions.setLoading(true);

  const response = await axios().post("internal_login", body);
  console.log(response);
  const { data, error } = response.data;

  if (data) {
    data.expires_in += new Date().getTime();
    setSession(data);
    const userData = await axios().get("get_user_info");
    actions.setUser(userData.data.data);
    nav(`/`);
  }

  if (error) {
    /* Guardamos en los errores del contexto y lo mostramos con un popup */
    toast.error(error, toastOptions)
    actions.setLoading(false);
  }
};
